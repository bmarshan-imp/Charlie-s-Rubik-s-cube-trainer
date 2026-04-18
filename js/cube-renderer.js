// cube-renderer.js — SVG rendering for Rubik's cube diagrams
// Pure ES module, no dependencies.

// ---------------------------------------------------------------------------
// Color constants
// ---------------------------------------------------------------------------

const COLORS = {
  W: '#FFFFFF',  // white
  Y: '#FFD500',  // yellow
  R: '#B71234',  // red
  O: '#FF5800',  // orange
  B: '#0046AD',  // blue
  G: '#009B48',  // green
  X: '#808080',  // gray (don't care / any color)
};

const COLOR_NAMES = {
  W: 'White',
  Y: 'Yellow',
  R: 'Red',
  O: 'Orange',
  B: 'Blue',
  G: 'Green',
  X: 'Any',
};

// ---------------------------------------------------------------------------
// Solved cube state (standard color scheme)
// White top, Yellow bottom, Red front, Orange back, Green left, Blue right
// ---------------------------------------------------------------------------

const SOLVED_CUBE = {
  U: ['W','W','W','W','W','W','W','W','W'],
  D: ['Y','Y','Y','Y','Y','Y','Y','Y','Y'],
  F: ['R','R','R','R','R','R','R','R','R'],
  B: ['O','O','O','O','O','O','O','O','O'],
  L: ['G','G','G','G','G','G','G','G','G'],
  R: ['B','B','B','B','B','B','B','B','B'],
};

/**
 * Create a cube state starting from solved, with selective overrides.
 * Null entries in an override array keep the solved colour.
 */
function makeState(overrides = {}) {
  const st = {};
  for (const f of ['U','D','F','B','L','R']) {
    st[f] = [...SOLVED_CUBE[f]];
  }
  for (const face of Object.keys(overrides)) {
    if (!st[face]) continue;
    const arr = overrides[face];
    if (!Array.isArray(arr)) continue;
    for (let i = 0; i < 9; i++) {
      if (i < arr.length && arr[i] != null) {
        st[face][i] = arr[i];
      }
    }
  }
  return st;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Resolve a color value -- accept single-letter code or pass through hex/CSS color. */
function resolveColor(c) {
  if (COLORS[c]) return COLORS[c];
  return c;
}

/** Deep-clone a cube state object. */
function cloneCube(state) {
  const out = {};
  for (const f of Object.keys(state)) {
    out[f] = state[f].slice();
  }
  return out;
}

/**
 * Rotate the 9 stickers of a face 90 degrees clockwise.
 * Index mapping:
 *   0 1 2      6 3 0
 *   3 4 5  ->  7 4 1
 *   6 7 8      8 5 2
 */
function rotateFaceCW(arr) {
  return [arr[6], arr[3], arr[0],
          arr[7], arr[4], arr[1],
          arr[8], arr[5], arr[2]];
}

/** Rotate 90 degrees counter-clockwise (= 3x CW). */
function rotateFaceCCW(arr) {
  return [arr[2], arr[5], arr[8],
          arr[1], arr[4], arr[7],
          arr[0], arr[3], arr[6]];
}

/**
 * Render a single sticker rectangle.
 */
function stickerRect(x, y, w, h, colorCode, highlight, label) {
  const fill = resolveColor(colorCode);
  const isGray = colorCode === 'X' || fill === COLORS.X;
  const isWhite = fill.toUpperCase() === '#FFFFFF' || fill.toUpperCase() === '#FFF';

  const cls = highlight ? 'cube-sticker cube-sticker-highlight pulse' : 'cube-sticker';
  const strokeColor = highlight ? '#FFD700' : (isWhite ? '#AAAAAA' : '#333333');
  const strokeWidth = highlight ? 3 : 1.5;

  let svg = `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ry="4" ` +
    `fill="${fill}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;

  // Gray "don't care" pattern -- draw small X marks
  if (isGray) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const d = w * 0.22;
    svg += `<line x1="${cx - d}" y1="${cy - d}" x2="${cx + d}" y2="${cy + d}" stroke="#aaa" stroke-width="1.5" stroke-linecap="round"/>`;
    svg += `<line x1="${cx + d}" y1="${cy - d}" x2="${cx - d}" y2="${cy + d}" stroke="#aaa" stroke-width="1.5" stroke-linecap="round"/>`;
  }

  if (label) {
    const tx = x + w / 2;
    const ty = y + h / 2;
    const fontSize = Math.max(8, Math.min(w * 0.35, 14));
    svg += `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="central" ` +
      `font-size="${fontSize}" font-family="Arial, sans-serif" fill="#333" font-weight="bold">${esc(label)}</text>`;
  }

  return svg;
}

// ---------------------------------------------------------------------------
// applyMove -- immutable, returns a new cube state
// ---------------------------------------------------------------------------

function applyMove(cubeState, move) {
  const s = cloneCube(cubeState);

  switch (move) {
    // ---- R (right face clockwise -- looking at right face) ----
    case 'R': {
      s.R = rotateFaceCW(s.R);
      const tmp = [s.F[2], s.F[5], s.F[8]];
      s.F[2] = s.D[2]; s.F[5] = s.D[5]; s.F[8] = s.D[8];
      s.D[2] = s.B[6]; s.D[5] = s.B[3]; s.D[8] = s.B[0];
      s.B[6] = s.U[2]; s.B[3] = s.U[5]; s.B[0] = s.U[8];
      s.U[2] = tmp[0]; s.U[5] = tmp[1]; s.U[8] = tmp[2];
      break;
    }
    case "R'": {
      s.R = rotateFaceCCW(s.R);
      const tmp = [s.F[2], s.F[5], s.F[8]];
      s.F[2] = s.U[2]; s.F[5] = s.U[5]; s.F[8] = s.U[8];
      s.U[2] = s.B[6]; s.U[5] = s.B[3]; s.U[8] = s.B[0];
      s.B[6] = s.D[2]; s.B[3] = s.D[5]; s.B[0] = s.D[8];
      s.D[2] = tmp[0]; s.D[5] = tmp[1]; s.D[8] = tmp[2];
      break;
    }

    // ---- L (left face clockwise -- looking at left face) ----
    case 'L': {
      s.L = rotateFaceCW(s.L);
      const tmp = [s.F[0], s.F[3], s.F[6]];
      s.F[0] = s.U[0]; s.F[3] = s.U[3]; s.F[6] = s.U[6];
      s.U[0] = s.B[8]; s.U[3] = s.B[5]; s.U[6] = s.B[2];
      s.B[8] = s.D[0]; s.B[5] = s.D[3]; s.B[2] = s.D[6];
      s.D[0] = tmp[0]; s.D[3] = tmp[1]; s.D[6] = tmp[2];
      break;
    }
    case "L'": {
      s.L = rotateFaceCCW(s.L);
      const tmp = [s.F[0], s.F[3], s.F[6]];
      s.F[0] = s.D[0]; s.F[3] = s.D[3]; s.F[6] = s.D[6];
      s.D[0] = s.B[8]; s.D[3] = s.B[5]; s.D[6] = s.B[2];
      s.B[8] = s.U[0]; s.B[5] = s.U[3]; s.B[2] = s.U[6];
      s.U[0] = tmp[0]; s.U[3] = tmp[1]; s.U[6] = tmp[2];
      break;
    }

    // ---- U (upper face clockwise -- looking down at top) ----
    case 'U': {
      s.U = rotateFaceCW(s.U);
      const tmp = [s.F[0], s.F[1], s.F[2]];
      s.F[0] = s.R[0]; s.F[1] = s.R[1]; s.F[2] = s.R[2];
      s.R[0] = s.B[0]; s.R[1] = s.B[1]; s.R[2] = s.B[2];
      s.B[0] = s.L[0]; s.B[1] = s.L[1]; s.B[2] = s.L[2];
      s.L[0] = tmp[0]; s.L[1] = tmp[1]; s.L[2] = tmp[2];
      break;
    }
    case "U'": {
      s.U = rotateFaceCCW(s.U);
      const tmp = [s.F[0], s.F[1], s.F[2]];
      s.F[0] = s.L[0]; s.F[1] = s.L[1]; s.F[2] = s.L[2];
      s.L[0] = s.B[0]; s.L[1] = s.B[1]; s.L[2] = s.B[2];
      s.B[0] = s.R[0]; s.B[1] = s.R[1]; s.B[2] = s.R[2];
      s.R[0] = tmp[0]; s.R[1] = tmp[1]; s.R[2] = tmp[2];
      break;
    }

    // ---- D (down face clockwise -- looking at bottom) ----
    case 'D': {
      s.D = rotateFaceCW(s.D);
      const tmp = [s.F[6], s.F[7], s.F[8]];
      s.F[6] = s.L[6]; s.F[7] = s.L[7]; s.F[8] = s.L[8];
      s.L[6] = s.B[6]; s.L[7] = s.B[7]; s.L[8] = s.B[8];
      s.B[6] = s.R[6]; s.B[7] = s.R[7]; s.B[8] = s.R[8];
      s.R[6] = tmp[0]; s.R[7] = tmp[1]; s.R[8] = tmp[2];
      break;
    }
    case "D'": {
      s.D = rotateFaceCCW(s.D);
      const tmp = [s.F[6], s.F[7], s.F[8]];
      s.F[6] = s.R[6]; s.F[7] = s.R[7]; s.F[8] = s.R[8];
      s.R[6] = s.B[6]; s.R[7] = s.B[7]; s.R[8] = s.B[8];
      s.B[6] = s.L[6]; s.B[7] = s.L[7]; s.B[8] = s.L[8];
      s.L[6] = tmp[0]; s.L[7] = tmp[1]; s.L[8] = tmp[2];
      break;
    }

    // ---- F (front face clockwise -- looking at front) ----
    case 'F': {
      s.F = rotateFaceCW(s.F);
      const tmp = [s.U[6], s.U[7], s.U[8]];
      s.U[6] = s.L[8]; s.U[7] = s.L[5]; s.U[8] = s.L[2];
      s.L[2] = s.D[0]; s.L[5] = s.D[1]; s.L[8] = s.D[2];
      s.D[0] = s.R[6]; s.D[1] = s.R[3]; s.D[2] = s.R[0];
      s.R[0] = tmp[0]; s.R[3] = tmp[1]; s.R[6] = tmp[2];
      break;
    }
    case "F'": {
      s.F = rotateFaceCCW(s.F);
      const tmp = [s.U[6], s.U[7], s.U[8]];
      s.U[6] = s.R[0]; s.U[7] = s.R[3]; s.U[8] = s.R[6];
      s.R[0] = s.D[2]; s.R[3] = s.D[1]; s.R[6] = s.D[0];
      s.D[0] = s.L[2]; s.D[1] = s.L[5]; s.D[2] = s.L[8];
      s.L[2] = tmp[2]; s.L[5] = tmp[1]; s.L[8] = tmp[0];
      break;
    }

    // ---- B (back face clockwise -- looking at back face) ----
    case 'B': {
      s.B = rotateFaceCW(s.B);
      const tmp = [s.U[0], s.U[1], s.U[2]];
      s.U[0] = s.R[2]; s.U[1] = s.R[5]; s.U[2] = s.R[8];
      s.R[2] = s.D[8]; s.R[5] = s.D[7]; s.R[8] = s.D[6];
      s.D[8] = s.L[6]; s.D[7] = s.L[3]; s.D[6] = s.L[0];
      s.L[0] = tmp[2]; s.L[3] = tmp[1]; s.L[6] = tmp[0];
      break;
    }
    case "B'": {
      s.B = rotateFaceCCW(s.B);
      const tmp = [s.U[0], s.U[1], s.U[2]];
      s.U[0] = s.L[6]; s.U[1] = s.L[3]; s.U[2] = s.L[0];
      s.L[0] = s.D[6]; s.L[3] = s.D[7]; s.L[6] = s.D[8];
      s.D[6] = s.R[8]; s.D[7] = s.R[5]; s.D[8] = s.R[2];
      s.R[2] = tmp[0]; s.R[5] = tmp[1]; s.R[8] = tmp[2];
      break;
    }

    default:
      console.warn('applyMove: unknown move "' + move + '"');
  }

  return s;
}

// ---------------------------------------------------------------------------
// renderFace
// ---------------------------------------------------------------------------

/**
 * Render a single 3x3 face grid as an SVG string.
 *
 * @param {string[]} colors       - Array of 9 color codes (left-to-right, top-to-bottom).
 * @param {object}   [options]
 * @param {number}   [options.size=150]        - Pixel width/height of the face.
 * @param {number[]} [options.highlights=[]]   - Indices (0-8) to highlight with pulsing border.
 * @param {string}   [options.label='']        - Text label shown below the face.
 * @param {boolean}  [options.showCenter=false] - Show a "C" on the center sticker.
 * @returns {string} Inline SVG markup.
 */
function renderFace(colors, options = {}) {
  const size = options.size || 150;
  const highlights = new Set(options.highlights || []);
  const label = options.label || '';
  const showCenter = !!options.showCenter;
  const gap = 2;
  const cellSize = (size - 4 * gap) / 3;

  let inner = '';
  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = gap + col * (cellSize + gap);
    const y = gap + row * (cellSize + gap);
    const centerLabel = (i === 4 && showCenter) ? 'C' : '';
    inner += stickerRect(x, y, cellSize, cellSize, colors[i], highlights.has(i), centerLabel);
  }

  const labelHeight = label ? 22 : 0;
  const totalHeight = size + labelHeight;

  if (label) {
    inner += `<text class="cube-face-label" x="${size / 2}" y="${size + 16}" text-anchor="middle" ` +
      `font-size="13" font-family="Arial, sans-serif" fill="#555">${esc(label)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${totalHeight}" ` +
    `width="${size}" height="${totalHeight}" role="img">${inner}</svg>`;
}

// ---------------------------------------------------------------------------
// renderNet -- cross-shaped unfolded net
// ---------------------------------------------------------------------------

const FACE_LABELS = {
  U: 'Top', D: 'Bottom', F: 'Front', B: 'Back', L: 'Left', R: 'Right',
};

/**
 * Render the full unfolded cube net (cross pattern).
 *
 *          [U]
 *     [L] [F] [R] [B]
 *          [D]
 *
 * @param {object} faces            - { U, D, F, B, L, R } each array of 9 color codes.
 * @param {object} [options]
 * @param {number} [options.size=120]        - Size of each face.
 * @param {object} [options.highlights={}]   - { F: [0,1,2], U: [6,7,8], ... }
 * @returns {string} Inline SVG markup.
 */
function renderNet(faces, options = {}) {
  const size = options.size || 120;
  const highlightsMap = options.highlights || {};
  const gap = 2;
  const cellSize = (size - 4 * gap) / 3;
  const spacing = 6;
  const labelHeight = 18;

  // Grid positions (col, row) in the cross layout
  const layout = {
    U: { col: 1, row: 0 },
    L: { col: 0, row: 1 },
    F: { col: 1, row: 1 },
    R: { col: 2, row: 1 },
    B: { col: 3, row: 1 },
    D: { col: 1, row: 2 },
  };

  const totalW = 4 * size + 5 * spacing;
  const totalH = 3 * (size + labelHeight) + 4 * spacing;

  let inner = '';

  for (const [faceKey, pos] of Object.entries(layout)) {
    const colors = faces[faceKey];
    if (!colors) continue;
    const faceHighlights = new Set(highlightsMap[faceKey] || []);

    const ox = spacing + pos.col * (size + spacing);
    const oy = spacing + pos.row * (size + labelHeight + spacing);

    // Dark background behind face for definition
    inner += `<rect x="${ox}" y="${oy}" width="${size}" height="${size}" rx="2" ry="2" fill="#222" stroke="none"/>`;

    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = ox + gap + col * (cellSize + gap);
      const y = oy + gap + row * (cellSize + gap);
      inner += stickerRect(x, y, cellSize, cellSize, colors[i], faceHighlights.has(i), '');
    }

    // Label below the face
    const lx = ox + size / 2;
    const ly = oy + size + labelHeight - 4;
    inner += `<text class="cube-face-label" x="${lx}" y="${ly}" text-anchor="middle" ` +
      `font-size="12" font-family="Arial, sans-serif" fill="#555">${esc(FACE_LABELS[faceKey] || faceKey)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" ` +
    `width="${totalW}" height="${totalH}" role="img">${inner}</svg>`;
}

// ---------------------------------------------------------------------------
// renderIsometric -- 3D-looking view (top, front, right)
// ---------------------------------------------------------------------------

/**
 * Render a pseudo-3D isometric view of 3 visible faces.
 *
 * @param {string[]} top    - 9 color codes for the top face.
 * @param {string[]} front  - 9 color codes for the front face.
 * @param {string[]} right  - 9 color codes for the right face.
 * @param {object}   [options]
 * @param {number}   [options.size=200]           - Base face size.
 * @param {object}   [options.highlights={}]      - { top: [], front: [], right: [] } or { U: [], F: [], R: [] }
 * @returns {string} Inline SVG markup.
 */
function renderIsometric(top, front, right, options = {}) {
  const s = options.size || 200;
  const highlightsMap = options.highlights || {};
  const gap = 2;
  const cell = (s - 4 * gap) / 3;

  // Skew amounts for the parallelogram effect
  const skewX = s * 0.5;
  const skewY = s * 0.3;
  const vw = s + skewX + 10;
  const vh = s + skewY + 10;

  // Front face origin (bottom-left area of the SVG)
  const frontOx = 5;
  const frontOy = skewY + 5;
  const rightOx = s + 5;
  const rightOy = skewY + 5;

  let inner = '';

  // -- Front face (no transform) --
  const frontHighlights = new Set(highlightsMap.front || highlightsMap.F || []);
  inner += `<g>`;
  inner += `<rect x="${frontOx}" y="${frontOy}" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const x = frontOx + gap + c * (cell + gap);
      const y = frontOy + gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, front[idx], frontHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  // -- Top face (parallelogram above front) --
  // Transform matrix maps the unit [0..s, 0..s] square so that:
  //   bottom-left aligns with front face top-left
  //   bottom-right aligns with front face top-right
  //   top edge is shifted right by skewX and up by skewY
  const a1 = 1, b1 = 0;
  const c1 = -skewX / s, d1 = skewY / s;
  const e1 = frontOx + skewX, f1 = frontOy - skewY;

  const topHighlights = new Set(highlightsMap.top || highlightsMap.U || []);
  inner += `<g transform="matrix(${a1},${b1},${c1},${d1},${e1},${f1})">`;
  inner += `<rect x="0" y="0" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const x = gap + c * (cell + gap);
      const y = gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, top[idx], topHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  // -- Right face (parallelogram to the right of front) --
  // Transform matrix maps [0..s, 0..s] so that:
  //   left edge aligns with front face right edge
  //   right edge is shifted right by skewX and up by skewY
  const a2 = skewX / s, b2 = -skewY / s;
  const c2 = 0, d2 = 1;
  const e2 = rightOx, f2 = rightOy;

  const rightHighlights = new Set(highlightsMap.right || highlightsMap.R || []);
  inner += `<g transform="matrix(${a2},${b2},${c2},${d2},${e2},${f2})">`;
  inner += `<rect x="0" y="0" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const idx = r * 3 + c;
      const x = gap + c * (cell + gap);
      const y = gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, right[idx], rightHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
    `width="${vw}" height="${vh}" role="img">${inner}</svg>`;
}

// ---------------------------------------------------------------------------
// renderFaceOnly -- single face with colored border + big label
// ---------------------------------------------------------------------------

const FACE_BORDER_COLORS = {
  top: COLORS.W,
  bottom: COLORS.Y,
  front: COLORS.R,
  back: COLORS.O,
  left: COLORS.G,
  right: COLORS.B,
};

/**
 * Simplified view: renders just one face with a colored border indicating
 * which face it is, and a big label. Good for "look at the [Color] face" instructions.
 *
 * @param {string[]} faceColors - 9 color codes.
 * @param {string}   faceName   - 'top'|'front'|'right'|'left'|'back'|'bottom'
 * @param {object}   [options]
 * @param {number}   [options.size=160]
 * @param {number[]} [options.highlights=[]]
 * @param {boolean}  [options.showCenter=false]
 * @returns {string} Inline SVG markup.
 */
function renderFaceOnly(faceColors, faceName, options = {}) {
  const size = options.size || 160;
  const highlights = new Set(options.highlights || []);
  const showCenter = !!options.showCenter;

  const borderColor = FACE_BORDER_COLORS[faceName] || '#888888';
  const borderWidth = 6;
  const padding = borderWidth + 4;
  const innerSize = size - padding * 2;
  const gap = 2;
  const cellSize = (innerSize - 4 * gap) / 3;

  const labelHeight = 30;
  const totalHeight = size + labelHeight;

  let inner = '';

  // For white border on white background, add a thin dark outer line
  if (borderColor === COLORS.W) {
    inner += `<rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="9" ry="9" fill="none" stroke="#ccc" stroke-width="1"/>`;
  }

  // Colored border rect
  inner += `<rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${size - borderWidth}" height="${size - borderWidth}" ` +
    `rx="8" ry="8" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}"/>`;

  // Stickers
  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = padding + gap + col * (cellSize + gap);
    const y = padding + gap + row * (cellSize + gap);
    const centerLabel = (i === 4 && showCenter) ? 'C' : '';
    inner += stickerRect(x, y, cellSize, cellSize, faceColors[i], highlights.has(i), centerLabel);
  }

  // Label
  const displayName = faceName.charAt(0).toUpperCase() + faceName.slice(1);
  inner += `<text class="cube-face-label" x="${size / 2}" y="${size + 22}" text-anchor="middle" ` +
    `font-size="16" font-family="Arial, sans-serif" font-weight="bold" fill="#333">${esc(displayName)} Face</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${totalHeight}" ` +
    `width="${size}" height="${totalHeight}" role="img">${inner}</svg>`;
}

// ---------------------------------------------------------------------------
// renderMoveArrow -- simple arrow diagram showing the direction of a move
// ---------------------------------------------------------------------------

/**
 * Render a visual arrow diagram showing the direction of a move.
 * Designed to be clear for a 10-year-old.
 *
 * @param {string} move - e.g. 'R', "R'", 'U', "U'", 'F', "F'", etc.
 * @param {number} [size=100] - Pixel size of the diagram.
 * @param {Object} [options] - Optional settings.
 * @param {string} [options.orientation] - 'yellowTop' swaps U/D face colors.
 * @returns {string} Inline SVG markup.
 */
function renderMoveArrow(move, size = 100, options = {}) {
  const pad = 8;
  const faceSize = size - pad * 2;
  const cellSize = faceSize / 3;

  // Map move to its face color and friendly name
  const baseMove = move.replace("'", '').replace('2', '');
  const prime = move.includes("'");
  const double = move.includes('2');

  const topColor = options.orientation === 'yellowTop' ? COLORS.Y : COLORS.W;
  const botColor = options.orientation === 'yellowTop' ? COLORS.W : COLORS.Y;
  const FACE_INFO = {
    R: { color: COLORS.B,  name: 'Right' },
    L: { color: COLORS.G,  name: 'Left' },
    U: { color: topColor,  name: 'Top' },
    D: { color: botColor,  name: 'Bottom' },
    F: { color: COLORS.R,  name: 'Front' },
    B: { color: COLORS.O,  name: 'Back' },
  };
  const info = FACE_INFO[baseMove] || { color: '#ccc', name: baseMove };
  const centerColor = info.color;
  const friendlyName = info.name + (prime ? ' \u21A9' : double ? ' ×2' : '');

  // Light 3x3 grid background with colored centre tile
  let grid = '';
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const x = pad + c * cellSize;
      const y = pad + r * cellSize;
      const isCenter = (r === 1 && c === 1);
      const fill = isCenter ? centerColor : '#f0f0f0';
      const stroke = isCenter ? '#666' : '#ccc';
      grid += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="3" ry="3" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
    }
  }

  const arrowColor = '#E63946';
  const arrowWidth = 3;
  const headSize = 8;

  function arrowLine(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;
    const baseX = x2 - ux * headSize;
    const baseY = y2 - uy * headSize;

    return `<line x1="${x1}" y1="${y1}" x2="${baseX}" y2="${baseY}" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>` +
      `<polygon points="${x2},${y2} ${baseX + px * headSize * 0.5},${baseY + py * headSize * 0.5} ${baseX - px * headSize * 0.5},${baseY - py * headSize * 0.5}" fill="${arrowColor}"/>`;
  }

  let arrow = '';
  let highlight = '';
  const hlColor = 'rgba(230,57,70,0.15)';

  switch (baseMove) {
    case 'R': {
      // Right column, CW = upward from front view
      const cx = pad + 2.5 * cellSize;
      const topY = pad + 4;
      const botY = pad + faceSize - 4;
      highlight = `<rect x="${pad + 2 * cellSize}" y="${pad}" width="${cellSize}" height="${faceSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(cx, topY, cx, botY) : arrowLine(cx, botY, cx, topY);
      break;
    }
    case 'L': {
      // Left column, CW looking at left face = downward from front view
      const cx = pad + 0.5 * cellSize;
      const topY = pad + 4;
      const botY = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad}" width="${cellSize}" height="${faceSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(cx, botY, cx, topY) : arrowLine(cx, topY, cx, botY);
      break;
    }
    case 'U': {
      // Top row, CW looking down = right-to-left from front view
      const cy = pad + 0.5 * cellSize;
      const leftX = pad + 4;
      const rightX = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad}" width="${faceSize}" height="${cellSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(leftX, cy, rightX, cy) : arrowLine(rightX, cy, leftX, cy);
      break;
    }
    case 'D': {
      // Bottom row, CW looking at bottom = left-to-right from front view
      const cy = pad + 2.5 * cellSize;
      const leftX = pad + 4;
      const rightX = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad + 2 * cellSize}" width="${faceSize}" height="${cellSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(rightX, cy, leftX, cy) : arrowLine(leftX, cy, rightX, cy);
      break;
    }
    case 'F': {
      // Front face rotates -- show a circular arrow in the center
      const cx = size / 2;
      const cy = size / 2;
      const r = faceSize * 0.32;
      if (!prime) {
        // CW arc
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx - r},${cy} ${cx - r - 5},${cy - 7} ${cx - r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      } else {
        // CCW arc
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx + r},${cy} ${cx + r - 5},${cy - 7} ${cx + r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      }
      break;
    }
    case 'B': {
      // Back face rotates -- from front view appears reversed
      const cx = size / 2;
      const cy = size / 2;
      const r = faceSize * 0.32;
      if (!prime) {
        // B CW (appears CCW from front)
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx + r},${cy} ${cx + r - 5},${cy - 7} ${cx + r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      } else {
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx - r},${cy} ${cx - r - 5},${cy - 7} ${cx - r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      }
      break;
    }
    default:
      break;
  }

  // Friendly label at bottom (e.g. "Right" or "Right ↩")
  const labelFontSize = Math.max(10, Math.min(14, size * 0.11));
  const label = `<text x="${size / 2}" y="${size + 1}" text-anchor="middle" font-size="${labelFontSize}" font-weight="bold" ` +
    `font-family="Arial, sans-serif" fill="#333">${esc(friendlyName)}</text>`;

  const totalHeight = size + 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${totalHeight}" ` +
    `width="${size}" height="${totalHeight}" role="img">${grid}${highlight}${arrow}${label}</svg>`;
}

// ===========================================================================
// 2x2 CUBE RENDERERS
// ===========================================================================

const SOLVED_CUBE_2X2 = {
  U: ['W','W','W','W'],
  D: ['Y','Y','Y','Y'],
  F: ['R','R','R','R'],
  B: ['O','O','O','O'],
  L: ['G','G','G','G'],
  R: ['B','B','B','B'],
};

function makeState2x2(overrides = {}) {
  const st = {};
  for (const f of ['U','D','F','B','L','R']) {
    st[f] = [...SOLVED_CUBE_2X2[f]];
  }
  for (const face of Object.keys(overrides)) {
    if (!st[face]) continue;
    const arr = overrides[face];
    if (!Array.isArray(arr)) continue;
    for (let i = 0; i < 4; i++) {
      if (i < arr.length && arr[i] != null) {
        st[face][i] = arr[i];
      }
    }
  }
  return st;
}

/** Render a single 2x2 face (4 stickers). */
function renderFace2x2(colors, options = {}) {
  const size = options.size || 150;
  const highlights = new Set(options.highlights || []);
  const label = options.label || '';
  const gap = 3;
  const cellSize = (size - 3 * gap) / 2;

  let inner = '';
  for (let i = 0; i < 4; i++) {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = gap + col * (cellSize + gap);
    const y = gap + row * (cellSize + gap);
    inner += stickerRect(x, y, cellSize, cellSize, colors[i], highlights.has(i), '');
  }

  const labelHeight = label ? 22 : 0;
  const totalHeight = size + labelHeight;

  if (label) {
    inner += `<text class="cube-face-label" x="${size / 2}" y="${size + 16}" text-anchor="middle" ` +
      `font-size="13" font-family="Arial, sans-serif" fill="#555">${esc(label)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${totalHeight}" ` +
    `width="${size}" height="${totalHeight}" role="img">${inner}</svg>`;
}

/** Render the full unfolded 2x2 cube net. */
function renderNet2x2(faces, options = {}) {
  const size = options.size || 110;
  const highlightsMap = options.highlights || {};
  const gap = 3;
  const cellSize = (size - 3 * gap) / 2;
  const spacing = 6;
  const labelHeight = 18;

  const layout = {
    U: { col: 1, row: 0 },
    L: { col: 0, row: 1 },
    F: { col: 1, row: 1 },
    R: { col: 2, row: 1 },
    B: { col: 3, row: 1 },
    D: { col: 1, row: 2 },
  };

  const totalW = 4 * size + 5 * spacing;
  const totalH = 3 * (size + labelHeight) + 4 * spacing;

  let inner = '';

  for (const [faceKey, pos] of Object.entries(layout)) {
    const colors = faces[faceKey];
    if (!colors) continue;
    const faceHighlights = new Set(highlightsMap[faceKey] || []);

    const ox = spacing + pos.col * (size + spacing);
    const oy = spacing + pos.row * (size + labelHeight + spacing);

    inner += `<rect x="${ox}" y="${oy}" width="${size}" height="${size}" rx="2" ry="2" fill="#222" stroke="none"/>`;

    for (let i = 0; i < 4; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = ox + gap + col * (cellSize + gap);
      const y = oy + gap + row * (cellSize + gap);
      inner += stickerRect(x, y, cellSize, cellSize, colors[i], faceHighlights.has(i), '');
    }

    const lx = ox + size / 2;
    const ly = oy + size + labelHeight - 4;
    inner += `<text class="cube-face-label" x="${lx}" y="${ly}" text-anchor="middle" ` +
      `font-size="12" font-family="Arial, sans-serif" fill="#555">${esc(FACE_LABELS[faceKey] || faceKey)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" ` +
    `width="${totalW}" height="${totalH}" role="img">${inner}</svg>`;
}

/** Render a pseudo-3D isometric 2x2 cube. */
function renderIsometric2x2(top, front, right, options = {}) {
  const s = options.size || 180;
  const highlightsMap = options.highlights || {};
  const gap = 3;
  const cell = (s - 3 * gap) / 2;

  const skewX = s * 0.5;
  const skewY = s * 0.3;
  const vw = s + skewX + 10;
  const vh = s + skewY + 10;

  const frontOx = 5;
  const frontOy = skewY + 5;
  const rightOx = s + 5;
  const rightOy = skewY + 5;

  let inner = '';

  const frontHighlights = new Set(highlightsMap.front || highlightsMap.F || []);
  inner += `<g>`;
  inner += `<rect x="${frontOx}" y="${frontOy}" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      const x = frontOx + gap + c * (cell + gap);
      const y = frontOy + gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, front[idx], frontHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  const a1 = 1, b1 = 0;
  const c1 = -skewX / s, d1 = skewY / s;
  const e1 = frontOx + skewX, f1 = frontOy - skewY;

  const topHighlights = new Set(highlightsMap.top || highlightsMap.U || []);
  inner += `<g transform="matrix(${a1},${b1},${c1},${d1},${e1},${f1})">`;
  inner += `<rect x="0" y="0" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      const x = gap + c * (cell + gap);
      const y = gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, top[idx], topHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  const a2 = skewX / s, b2 = -skewY / s;
  const c2 = 0, d2 = 1;
  const e2 = rightOx, f2 = rightOy;

  const rightHighlights = new Set(highlightsMap.right || highlightsMap.R || []);
  inner += `<g transform="matrix(${a2},${b2},${c2},${d2},${e2},${f2})">`;
  inner += `<rect x="0" y="0" width="${s}" height="${s}" fill="#222" rx="2"/>`;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      const x = gap + c * (cell + gap);
      const y = gap + r * (cell + gap);
      inner += stickerRect(x, y, cell, cell, right[idx], rightHighlights.has(idx), '');
    }
  }
  inner += `</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" ` +
    `width="${vw}" height="${vh}" role="img">${inner}</svg>`;
}

/** Render a move-arrow diagram on a 2x2 grid background. */
function renderMoveArrow2x2(move, size = 110, options = {}) {
  const pad = 8;
  const faceSize = size - pad * 2;
  const cellSize = faceSize / 2;

  const baseMove = move.replace("'", '').replace('2', '');
  const prime = move.includes("'");
  const double = move.includes('2');

  const topColor = options.orientation === 'yellowTop' ? COLORS.Y : COLORS.W;
  const botColor = options.orientation === 'yellowTop' ? COLORS.W : COLORS.Y;
  const FACE_INFO = {
    R: { color: COLORS.B,  name: 'Right' },
    L: { color: COLORS.G,  name: 'Left' },
    U: { color: topColor,  name: 'Top' },
    D: { color: botColor,  name: 'Bottom' },
    F: { color: COLORS.R,  name: 'Front' },
    B: { color: COLORS.O,  name: 'Back' },
  };
  const info = FACE_INFO[baseMove] || { color: '#ccc', name: baseMove };
  const friendlyName = info.name + (prime ? ' \u21A9' : double ? ' ×2' : '');

  // Build 2x2 grid background (all face color)
  let grid = '';
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      const x = pad + c * cellSize;
      const y = pad + r * cellSize;
      grid += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="3" ry="3" ` +
        `fill="${info.color}" stroke="#666" stroke-width="1"/>`;
    }
  }

  const arrowColor = '#E63946';
  const arrowWidth = 3;
  const headSize = 8;
  const hlColor = 'rgba(230,57,70,0.18)';

  function arrowLine(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;
    const baseX = x2 - ux * headSize;
    const baseY = y2 - uy * headSize;
    return `<line x1="${x1}" y1="${y1}" x2="${baseX}" y2="${baseY}" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>` +
      `<polygon points="${x2},${y2} ${baseX + px * headSize * 0.5},${baseY + py * headSize * 0.5} ${baseX - px * headSize * 0.5},${baseY - py * headSize * 0.5}" fill="${arrowColor}"/>`;
  }

  let arrow = '';
  let highlight = '';

  switch (baseMove) {
    case 'R': {
      const cx = pad + 1.5 * cellSize;
      const topY = pad + 4;
      const botY = pad + faceSize - 4;
      highlight = `<rect x="${pad + cellSize}" y="${pad}" width="${cellSize}" height="${faceSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(cx, topY, cx, botY) : arrowLine(cx, botY, cx, topY);
      break;
    }
    case 'L': {
      const cx = pad + 0.5 * cellSize;
      const topY = pad + 4;
      const botY = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad}" width="${cellSize}" height="${faceSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(cx, botY, cx, topY) : arrowLine(cx, topY, cx, botY);
      break;
    }
    case 'U': {
      const cy = pad + 0.5 * cellSize;
      const leftX = pad + 4;
      const rightX = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad}" width="${faceSize}" height="${cellSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(leftX, cy, rightX, cy) : arrowLine(rightX, cy, leftX, cy);
      break;
    }
    case 'D': {
      const cy = pad + 1.5 * cellSize;
      const leftX = pad + 4;
      const rightX = pad + faceSize - 4;
      highlight = `<rect x="${pad}" y="${pad + cellSize}" width="${faceSize}" height="${cellSize}" fill="${hlColor}" rx="3"/>`;
      arrow = prime ? arrowLine(rightX, cy, leftX, cy) : arrowLine(leftX, cy, rightX, cy);
      break;
    }
    case 'F': {
      const cx = size / 2;
      const cy = size / 2;
      const r = faceSize * 0.32;
      if (!prime) {
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx - r},${cy} ${cx - r - 5},${cy - 7} ${cx - r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      } else {
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx + r},${cy} ${cx + r - 5},${cy - 7} ${cx + r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      }
      break;
    }
    case 'B': {
      const cx = size / 2;
      const cy = size / 2;
      const r = faceSize * 0.32;
      if (!prime) {
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx + r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx + r},${cy} ${cx + r - 5},${cy - 7} ${cx + r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      } else {
        arrow = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - r} ${cy}" fill="none" stroke="${arrowColor}" stroke-width="${arrowWidth}" stroke-linecap="round"/>`;
        arrow += `<polygon points="${cx - r},${cy} ${cx - r - 5},${cy - 7} ${cx - r + 5},${cy - 7}" fill="${arrowColor}"/>`;
      }
      break;
    }
    default:
      break;
  }

  const labelFontSize = Math.max(10, Math.min(14, size * 0.11));
  const label = `<text x="${size / 2}" y="${size + 1}" text-anchor="middle" font-size="${labelFontSize}" font-weight="bold" ` +
    `font-family="Arial, sans-serif" fill="#333">${esc(friendlyName)}</text>`;

  const totalHeight = size + 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${totalHeight}" ` +
    `width="${size}" height="${totalHeight}" role="img">${grid}${highlight}${arrow}${label}</svg>`;
}
