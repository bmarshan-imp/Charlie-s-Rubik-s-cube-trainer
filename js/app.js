/**
 * Charlie's Cube Trainer — Main App Logic
 * Handles navigation, rendering, progress tracking, and UI state.
 */

// Dependencies (STAGES, COLORS, SOLVED_CUBE, renderFace, renderNet, renderIsometric, makeState)
// are loaded via script tags before this file.

// ─── State ───────────────────────────────────────────────────────
const STORAGE_KEY = 'charlie_cube_progress';

let state = loadProgress();

function defaultProgress() {
  return {
    currentStage: 0,
    currentLesson: 0,
    currentStep: -1, // -1 = coach intro (if any), 0+ = step index
    completedLessons: [],
    adultCheckIns: {},
    lastVisit: new Date().toISOString(),
  };
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all fields exist (in case we add new ones)
      return { ...defaultProgress(), ...parsed };
    }
  } catch (e) { /* ignore */ }
  return defaultProgress();
}

function saveProgress() {
  state.lastVisit = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

function resetProgress() {
  state = defaultProgress();
  saveProgress();
}

function isLessonCompleted(lessonId) {
  return state.completedLessons.includes(lessonId);
}

function completeLesson(lessonId) {
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId);
    saveProgress();
  }
}

function isStageUnlocked(stageIndex) {
  if (stageIndex === 0) return true;
  // A stage is unlocked if all lessons in the previous stage are completed
  const prevStage = STAGES[stageIndex - 1];
  if (!prevStage) return false;
  return prevStage.lessons.every(l => isLessonCompleted(l.id));
}

function isAdultCheckInDone(stageId) {
  return !!state.adultCheckIns[stageId];
}

// ─── Screen Management ───────────────────────────────────────────
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
    screen.scrollTop = 0;
  }
}

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// ─── Welcome Screen ──────────────────────────────────────────────
function initWelcome() {
  // Show continue button if there's saved progress
  const btnContinue = document.getElementById('btn-continue');
  const hasProgress = state.completedLessons.length > 0;
  btnContinue.style.display = hasProgress ? 'block' : 'none';

  // Render a little cube on the welcome screen
  const cubeArt = document.getElementById('welcome-cube-art');
  if (cubeArt) {
    cubeArt.innerHTML = renderIsometric(
      SOLVED_CUBE.U, SOLVED_CUBE.F, SOLVED_CUBE.R,
      { size: 90 }
    );
  }
}

// ─── Stage Map ───────────────────────────────────────────────────
function renderStageMap() {
  const container = document.getElementById('stage-map-path');
  container.innerHTML = '';

  STAGES.forEach((stage, idx) => {
    const unlocked = isStageUnlocked(idx);
    const allDone = stage.lessons.every(l => isLessonCompleted(l.id));
    const isCurrent = unlocked && !allDone;

    const card = document.createElement('div');
    card.className = 'stage-card' +
      (allDone ? ' completed' : '') +
      (isCurrent ? ' current' : '') +
      (!unlocked ? ' locked' : '');
    card.style.setProperty('--stage-color', stage.color);

    const completedCount = stage.lessons.filter(l => isLessonCompleted(l.id)).length;

    card.innerHTML = `
      <div class="stage-card-number">${stage.id}</div>
      <div class="stage-card-info">
        <div class="stage-card-title">${stage.title}</div>
        <div class="stage-card-subtitle">${stage.subtitle || ''}</div>
        <div class="stage-card-progress">${completedCount} / ${stage.lessons.length} lessons done</div>
      </div>
      <div class="stage-card-status">
        ${allDone ? '<span class="stage-done-check">&#10003;</span>' : ''}
        ${!unlocked ? '<span class="stage-lock">&#128274;</span>' : ''}
      </div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => openStage(idx));
      // Show individual lessons
      const lessonList = document.createElement('div');
      lessonList.className = 'stage-lessons';
      stage.lessons.forEach((lesson, lIdx) => {
        const done = isLessonCompleted(lesson.id);
        const lessonBtn = document.createElement('button');
        lessonBtn.className = 'lesson-dot' + (done ? ' completed' : '');
        lessonBtn.textContent = lesson.title;
        lessonBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openLesson(idx, lIdx);
        });
        lessonList.appendChild(lessonBtn);
      });
      card.appendChild(lessonList);
    }

    container.appendChild(card);
  });
}

function openStage(stageIdx) {
  const stage = STAGES[stageIdx];
  // Find the first incomplete lesson, or the first lesson
  let lessonIdx = stage.lessons.findIndex(l => !isLessonCompleted(l.id));
  if (lessonIdx === -1) lessonIdx = 0;
  openLesson(stageIdx, lessonIdx);
}

// ─── Lesson View ─────────────────────────────────────────────────
function openLesson(stageIdx, lessonIdx) {
  state.currentStage = stageIdx;
  state.currentLesson = lessonIdx;
  state.currentStep = -1; // Start at coach intro
  saveProgress();

  const stage = STAGES[stageIdx];
  const lesson = stage.lessons[lessonIdx];

  // Update header
  document.getElementById('lesson-stage-name').textContent = `Stage ${stage.id}: ${stage.title}`;
  document.getElementById('lesson-title').textContent = lesson.title;

  // Set stage color
  document.getElementById('lesson-view').style.setProperty('--stage-color', stage.color);

  showScreen('lesson-view');

  // If there's a coach intro, show it first; otherwise go to step 0
  if (lesson.coachIntro) {
    showCoachIntro(lesson.coachIntro);
  } else {
    state.currentStep = 0;
    renderStep();
  }
}

function showCoachIntro(intro) {
  const coachIntroEl = document.getElementById('coach-intro');
  const contentEl = document.getElementById('lesson-content');
  const navEl = document.getElementById('lesson-nav');
  const checkInEl = document.getElementById('check-in-box');
  const adultEl = document.getElementById('adult-check-in');

  contentEl.style.display = 'none';
  navEl.style.display = 'none';
  checkInEl.style.display = 'none';
  adultEl.style.display = 'none';
  coachIntroEl.style.display = 'flex';

  const avatar = document.getElementById('coach-intro-avatar');
  const name = document.getElementById('coach-intro-name');
  const text = document.getElementById('coach-intro-text');

  if (intro.coach === 'max') {
    avatar.className = 'coach-avatar coach-max-avatar';
    avatar.textContent = 'M';
    name.textContent = 'Max Park says:';
  } else {
    avatar.className = 'coach-avatar coach-feliks-avatar';
    avatar.textContent = 'F';
    name.textContent = 'Feliks Zemdegs says:';
  }
  text.textContent = intro.text;

  updateProgressBar();
}

function renderStep() {
  const stage = STAGES[state.currentStage];
  const lesson = stage.lessons[state.currentLesson];
  const stepIdx = state.currentStep;
  const totalSteps = lesson.steps.length;

  // Hide coach intro, show content
  document.getElementById('coach-intro').style.display = 'none';
  document.getElementById('lesson-content').style.display = 'block';
  document.getElementById('lesson-nav').style.display = 'flex';
  document.getElementById('check-in-box').style.display = 'none';
  document.getElementById('adult-check-in').style.display = 'none';

  // Are we past all steps? Show check-in or celebration
  if (stepIdx >= totalSteps) {
    showLessonEnd(stage, lesson);
    return;
  }

  const step = lesson.steps[stepIdx];

  // Update step counter
  document.getElementById('step-counter').textContent = `${stepIdx + 1} / ${totalSteps}`;

  // Update progress bar
  updateProgressBar();

  // Render diagram
  const diagramEl = document.getElementById('step-diagram');
  diagramEl.innerHTML = '';
  if (step.diagram) {
    diagramEl.innerHTML = renderDiagram(step.diagram);
    diagramEl.style.display = 'block';
  } else {
    diagramEl.style.display = 'none';
  }

  // Render text
  const textEl = document.getElementById('step-text');
  textEl.innerHTML = formatStepText(step.text);

  // Render move badges
  const movesEl = document.getElementById('step-moves');
  if (step.moves && step.moves.length > 0) {
    movesEl.style.display = 'flex';
    movesEl.innerHTML = step.moves.map(m =>
      `<span class="move-badge">${m}</span>`
    ).join('');
  } else {
    movesEl.style.display = 'none';
  }

  // Update nav buttons
  const prevBtn = document.getElementById('btn-prev-step');
  prevBtn.style.visibility = (stepIdx > 0 || lesson.coachIntro) ? 'visible' : 'hidden';

  const nextBtn = document.getElementById('btn-next-step');
  if (stepIdx === totalSteps - 1) {
    // Check if there's a check-in or adult check-in coming
    if (lesson.checkIn || isLastLessonInStage(state.currentStage, state.currentLesson)) {
      nextBtn.textContent = 'Check!';
    } else {
      nextBtn.textContent = 'Done!';
    }
  } else {
    nextBtn.innerHTML = 'Next <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';
  }

  // Scroll to top
  document.getElementById('lesson-view').scrollTop = 0;
}

function isLastLessonInStage(stageIdx, lessonIdx) {
  return lessonIdx === STAGES[stageIdx].lessons.length - 1;
}

function showLessonEnd(stage, lesson) {
  const contentEl = document.getElementById('lesson-content');
  const navEl = document.getElementById('lesson-nav');

  contentEl.style.display = 'none';

  // Show self check-in if present
  if (lesson.checkIn) {
    const checkInEl = document.getElementById('check-in-box');
    document.getElementById('check-in-text').innerHTML = formatStepText(lesson.checkIn.text);
    checkInEl.style.display = 'block';
  }

  // If this is the last lesson in the stage AND there's an adult check-in
  if (isLastLessonInStage(state.currentStage, state.currentLesson) && stage.adultCheckIn) {
    const adultEl = document.getElementById('adult-check-in');
    document.getElementById('adult-check-in-text').innerHTML = formatStepText(stage.adultCheckIn.text);
    adultEl.style.display = 'block';
    navEl.style.display = 'none';
  } else {
    navEl.style.display = 'flex';
    // Just show a "complete" button
    document.getElementById('btn-next-step').textContent = lesson.celebration ? 'Celebrate!' : 'Done!';
    document.getElementById('btn-prev-step').style.visibility = 'visible';
  }

  // Update step counter
  document.getElementById('step-counter').textContent = 'Done!';
  updateProgressBar();
}

function completeLessonAndCelebrate() {
  const stage = STAGES[state.currentStage];
  const lesson = stage.lessons[state.currentLesson];

  completeLesson(lesson.id);

  // Show celebration modal
  const celebTitle = document.getElementById('celebration-title');
  const celebText = document.getElementById('celebration-text');
  celebTitle.textContent = 'Great Job!';
  celebText.textContent = lesson.celebration || 'You finished this lesson!';

  // Coach outro if finishing a stage
  const celebCoach = document.getElementById('celebration-coach');
  if (isLastLessonInStage(state.currentStage, state.currentLesson) && stage.coachOutro) {
    const outro = stage.coachOutro;
    celebCoach.style.display = 'flex';
    const avatar = document.getElementById('celebration-coach-avatar');
    const coachName = document.getElementById('celebration-coach-name');
    const coachText = document.getElementById('celebration-coach-text');

    if (outro.coach === 'max') {
      avatar.className = 'coach-avatar coach-max-avatar';
      avatar.textContent = 'M';
      coachName.textContent = 'Max Park says:';
    } else {
      avatar.className = 'coach-avatar coach-feliks-avatar';
      avatar.textContent = 'F';
      coachName.textContent = 'Feliks Zemdegs says:';
    }
    coachText.textContent = outro.text;
  } else {
    celebCoach.style.display = 'none';
  }

  // Spawn confetti
  spawnConfetti();

  showModal('celebration-modal');
}

function updateProgressBar() {
  const stage = STAGES[state.currentStage];
  const lesson = stage.lessons[state.currentLesson];
  const total = lesson.steps.length;
  const current = Math.max(0, state.currentStep);
  const pct = total > 0 ? ((current + 1) / (total + 1)) * 100 : 0;
  document.getElementById('lesson-progress-fill').style.width = pct + '%';
}

// ─── Diagram Rendering ──────────────────────────────────────────
function renderDiagram(diag) {
  if (!diag || diag.type === 'none') return '';

  try {
    if (diag.type === 'net') {
      if (diag.state === 'solved') {
        return renderNet(SOLVED_CUBE, { size: 60, highlights: diag.highlights || {} });
      } else if (diag.state === 'custom' && diag.faces) {
        // Build full cube state, filling missing faces from solved
        const faces = {};
        for (const f of ['U', 'D', 'F', 'B', 'L', 'R']) {
          faces[f] = diag.faces[f] || SOLVED_CUBE[f];
        }
        return renderNet(faces, { size: 60, highlights: diag.highlights || {} });
      }
    }

    if (diag.type === 'face') {
      const colors = (diag.colors || []).map(c => COLORS[c] || c);
      return renderFace(colors, {
        size: 150,
        highlights: diag.highlights || [],
        labels: diag.labels || [],
      });
    }

    if (diag.type === 'moveArrow') {
      const moves = diag.moves || [];
      return '<div class="move-arrow-row">' +
        moves.map(m => renderMoveArrow(m, diag.size || 110)).join('') +
        '</div>';
    }

    if (diag.type === 'isometric') {
      const top = (diag.top || SOLVED_CUBE.U).map(c => COLORS[c] || c);
      const front = (diag.front || SOLVED_CUBE.F).map(c => COLORS[c] || c);
      const right = (diag.right || SOLVED_CUBE.R).map(c => COLORS[c] || c);
      return renderIsometric(top, front, right, {
        size: 90,
        highlights: diag.highlights || {},
      });
    }
  } catch (e) {
    console.warn('Diagram render error:', e);
  }

  return '';
}

// ─── Text Formatting ─────────────────────────────────────────────
function formatStepText(text) {
  if (!text) return '';
  // Convert **bold** to <strong>
  let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Convert color references like [White] to colored badges
  html = html.replace(/\[(White|Yellow|Red|Orange|Blue|Green)\]/g, (_, color) => {
    return `<span class="cube-color cube-color-${color.toLowerCase()}">${color}</span>`;
  });
  // Convert move references like {Right Up} to move badges
  html = html.replace(/\{(.+?)\}/g, (_, move) => {
    return `<span class="move-badge">${move}</span>`;
  });
  // Convert newlines to <br>
  html = html.replace(/\n/g, '<br>');
  return html;
}

// ─── Confetti ────────────────────────────────────────────────────
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#FF6B6B', '#FFD93D', '#4ECDC4', '#6C63FF', '#FF6B9D', '#FFA500', '#009B48'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(piece);
  }
}

// ─── Navigation Handlers ─────────────────────────────────────────
function goNextStep() {
  const stage = STAGES[state.currentStage];
  const lesson = stage.lessons[state.currentLesson];

  if (state.currentStep >= lesson.steps.length) {
    // We're at the end — complete and celebrate
    completeLessonAndCelebrate();
    return;
  }

  state.currentStep++;
  saveProgress();
  renderStep();
}

function goPrevStep() {
  if (state.currentStep > 0) {
    state.currentStep--;
    saveProgress();
    renderStep();
  } else if (state.currentStep === 0) {
    const lesson = STAGES[state.currentStage].lessons[state.currentLesson];
    if (lesson.coachIntro) {
      state.currentStep = -1;
      showCoachIntro(lesson.coachIntro);
    }
  }
}

function goAfterCelebration() {
  hideModal('celebration-modal');

  const stage = STAGES[state.currentStage];
  const nextLessonIdx = state.currentLesson + 1;

  if (nextLessonIdx < stage.lessons.length) {
    // Next lesson in same stage
    openLesson(state.currentStage, nextLessonIdx);
  } else {
    // Stage complete — go back to map
    showScreen('stage-map');
    renderStageMap();
  }
}

function goAdultConfirmed() {
  state.adultCheckIns[STAGES[state.currentStage].id] = true;
  saveProgress();
  // Complete the lesson and celebrate
  completeLessonAndCelebrate();
}

// ─── Settings ────────────────────────────────────────────────────
function setFontSize(size) {
  document.documentElement.style.setProperty('--base-font-size', size + 'px');
  // Update active button
  document.querySelectorAll('.size-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.size) === size);
  });
  try {
    localStorage.setItem('charlie_font_size', size);
  } catch (e) { /* ignore */ }
}

function loadFontSize() {
  try {
    const saved = localStorage.getItem('charlie_font_size');
    if (saved) setFontSize(parseInt(saved));
  } catch (e) { /* ignore */ }
}

// ─── Init ────────────────────────────────────────────────────────
function init() {
  loadFontSize();
  initWelcome();

  // Welcome screen buttons
  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('stage-map');
    renderStageMap();
  });
  document.getElementById('btn-continue').addEventListener('click', () => {
    showScreen('stage-map');
    renderStageMap();
  });

  // Home button
  document.getElementById('btn-home').addEventListener('click', () => {
    showScreen('welcome-screen');
    initWelcome();
  });

  // Back to map
  document.getElementById('btn-back-to-map').addEventListener('click', () => {
    showScreen('stage-map');
    renderStageMap();
  });

  // Lesson navigation
  document.getElementById('btn-next-step').addEventListener('click', goNextStep);
  document.getElementById('btn-prev-step').addEventListener('click', goPrevStep);

  // Coach intro OK
  document.getElementById('btn-coach-intro-ok').addEventListener('click', () => {
    state.currentStep = 0;
    saveProgress();
    renderStep();
  });

  // Adult check-in confirmed
  document.getElementById('btn-adult-confirmed').addEventListener('click', goAdultConfirmed);

  // Celebration continue
  document.getElementById('btn-celebration-continue').addEventListener('click', goAfterCelebration);

  // Settings
  document.getElementById('btn-settings-open').addEventListener('click', () => showModal('settings-panel'));
  document.getElementById('btn-settings-open-2').addEventListener('click', () => showModal('settings-panel'));
  document.getElementById('btn-settings-close').addEventListener('click', () => hideModal('settings-panel'));
  document.getElementById('btn-reset-progress').addEventListener('click', () => {
    if (confirm('Are you sure? This will erase all your progress!')) {
      resetProgress();
      hideModal('settings-panel');
      showScreen('welcome-screen');
      initWelcome();
    }
  });

  // Font size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => setFontSize(parseInt(btn.dataset.size)));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lesson-view').classList.contains('active')) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrevStep();
      }
    }
  });

  // Click outside modal to close settings
  document.getElementById('settings-panel').addEventListener('click', (e) => {
    if (e.target.id === 'settings-panel') hideModal('settings-panel');
  });
}

document.addEventListener('DOMContentLoaded', init);
