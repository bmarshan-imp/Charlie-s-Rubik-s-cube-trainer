// Stage 5 — Yellow Cross
// Orient the yellow edges to form a cross on top.

const stage5 = {
  id: 5,
  title: 'Yellow Cross',
  subtitle: 'Make a yellow plus sign on top',
  color: '#FFD600',
  lessons: [

    // ── Lesson 5-1: What We See on Top ────────────────────────────
    {
      id: '5-1',
      title: 'Reading the Top',
      coachIntro: {
        coach: 'feliks',
        text: "Now we work on the yellow face! First, we need a yellow cross on top — just like we did with white, but using an algorithm instead of intuition.",
      },
      steps: [
        {
          text: "Hold your cube with [Yellow] on top.\n\nLook at **only the yellow stickers** on the top face. Ignore the corners for now — just look at the **center and four edges**.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','X','X','X','Y','X','X','X','X'],
          },
          text: "**You might see just a dot** — only the yellow center, no yellow edges on top.\n\nThis is the starting point if none of the edges have yellow facing up.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','X','X','Y','Y','X','X','Y','X'],
            highlights: [3, 7],
          },
          text: "**Or an L-shape** — the center plus two yellow edges that make an L.\n\nIf you see this, make sure the L is in the **back-left** corner (turn {U} to position it).",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','X','X','Y','Y','Y','X','X','X'],
            highlights: [3, 5],
          },
          text: "**Or a line** — the center plus two yellow edges in a straight line.\n\nMake sure the line goes **left-right** (horizontal), not front-back.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','Y','X','Y','Y','Y','X','Y','X'],
            highlights: [1, 3, 5, 7],
          },
          text: "**Or the cross!** — If you already have the yellow cross, skip ahead to Stage 6!\n\nMost likely you have a dot, L, or line. Let's fix that.",
        },
      ],
      checkIn: {
        text: "Look at your yellow top face. Do you see a dot, an L, a line, or already a cross?",
      },
      celebration: "You can read the top pattern! That tells you exactly what to do next.",
    },

    // ── Lesson 5-2: The Yellow Cross Algorithm ────────────────────
    {
      id: '5-2',
      title: 'The Cross Algorithm',
      coachIntro: {
        coach: 'max',
        text: "There's one algorithm that does all the work here. You just apply it the right number of times depending on what you see — dot, L, or line.",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', moves: ['F', 'R', 'U', "R'", "U'", "F'"], size: 90 },
          text: "**The algorithm:**\n\nSay it in rhythm: **Front, Right, Up, Right-back, Up-back, Front-back.**\n\nNotice the trigger hiding inside!",
          moves: ['F', 'R', 'U', "R'", "U'", "F'"],
        },
        {
          text: "**If you see a DOT:**\n\nDo the algorithm once → you get an **L**\nDo it again (with L in back-left) → you get a **line**\nDo it again (with line horizontal) → you get the **cross!**\n\nDot → L → Line → Cross (3 times total)",
        },
        {
          text: "**If you see an L:**\n\nTurn {U} so the L is in the **back-left** corner.\n\nDo the algorithm once → **line**\nDo it again (line horizontal) → **cross!**\n\n(2 times total)",
        },
        {
          text: "**If you see a LINE:**\n\nTurn {U} so the line goes **left-right** (horizontal).\n\nDo the algorithm once → **cross!**\n\n(1 time)",
        },
        {
          text: "**Important!** Make sure you position the pattern correctly before each use:\n\n• **L** → back-left corner\n• **Line** → horizontal (left-right)\n\nIf you don't position it right, you'll go backwards instead of forwards!",
        },
      ],
      checkIn: {
        text: "Make the yellow cross! Use {F} {R} {U} {R'} {U'} {F'} — remember to position the L or line correctly each time.",
      },
      celebration: "Yellow cross achieved! The top has a beautiful yellow plus sign!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nDoes Charlie's cube have a yellow plus sign on top? (The corners don't need to be yellow yet — just the four edges and center.)\n\nIf yes, they're ready for Stage 6!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Yellow cross — check! Next we'll make the entire yellow face solid. We're getting so close!",
  },
};
