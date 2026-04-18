// Stage 1 (2x2) — Meet the Pocket Cube
// Teaches the differences between a 2x2 and a 3x3, and reviews notation.

const stage1_2x2 = {
  id: 1,
  title: 'Meet the 2x2',
  subtitle: "Learn what's different about the Pocket Cube",
  color: '#7C4DFF',
  cubeSize: 2,
  lessons: [

    // ── Lesson 1-1: The Pocket Cube ──────────────────────────────
    {
      id: '2x2-1-1',
      title: 'The Pocket Cube',
      coachIntro: {
        coach: 'feliks',
        text: "Hey Charlie! A 2x2 cube is sometimes called the Pocket Cube. It looks tiny, but it's a real puzzle. The best part — everything you learned on the big cube will help you here!",
      },
      steps: [
        {
          diagram: { type: 'isometric', cubeSize: 2 },
          text: "This is a **2x2 cube**. Every face only has **four** stickers instead of nine.\n\nIt's like someone shrunk the big cube down to just its corners!",
        },
        {
          diagram: {
            type: 'face',
            cubeSize: 2,
            colors: ['W','W','W','W'],
            highlights: [0, 1, 2, 3],
          },
          text: "**Only corner pieces.**\n\nEvery single piece on a 2x2 is a **corner** — 8 of them in total.\n\nEach corner has **three** coloured stickers, just like on the big cube.",
        },
        {
          text: "**No centres, no edges.**\n\nOn a 3x3 there are centres (that never move) and edges (between corners). A 2x2 has **neither**.\n\nThat's why it feels simpler — fewer pieces to worry about!",
        },
        {
          text: "**But wait — no centres means no anchor!**\n\nOn a 3x3 the centre tells you the colour of each face. On a 2x2 you have to figure it out from the corners themselves.\n\nDon't worry — we'll learn a trick. Just pick one corner and let it decide the colour scheme!",
        },
      ],
      checkIn: {
        text: "Pick up your 2x2 cube. Can you count all 8 corners? How many stickers does each corner have?",
      },
      celebration: "You know what makes the 2x2 special! Tiny cube, big fun.",
    },

    // ── Lesson 1-2: Same Colours, Same Faces ─────────────────────
    {
      id: '2x2-1-2',
      title: 'Same Colours, Same Faces',
      coachIntro: {
        coach: 'feliks',
        text: "The colour scheme on a 2x2 is just like the big cube. [White] opposite [Yellow], [Red] opposite [Orange], [Blue] opposite [Green]. Old friends!",
      },
      steps: [
        {
          diagram: { type: 'net', cubeSize: 2, state: 'solved' },
          text: "A **solved 2x2** looks just like a solved 3x3 — each face is one solid colour.\n\nThe standard scheme is:\n**Top** = [White], **Bottom** = [Yellow]\n**Front** = [Red], **Back** = [Orange]\n**Left** = [Green], **Right** = [Blue]",
        },
        {
          text: "**Opposite colours:**\n\n[White] is always across from [Yellow].\n[Red] is always across from [Orange].\n[Blue] is always across from [Green].\n\nLook at any single corner — the three colours on it are always from three **different** opposite pairs!",
        },
        {
          text: "**The white-red-blue corner** is on the front-top-right.\nThe **white-red-green corner** is on the front-top-left.\n\nEach corner has one unique combination of three colours. There are exactly **8** combinations — one for each corner slot!",
        },
      ],
      checkIn: {
        text: "Can you find the corner that has [White], [Red], and [Blue] on it? Where on the cube should that corner live when the puzzle is solved?",
      },
      celebration: "You know the 2x2 colour map! Every corner has a home.",
    },

    // ── Lesson 1-3: The Moves Are the Same ───────────────────────
    {
      id: '2x2-1-3',
      title: 'The Moves Are the Same',
      coachIntro: {
        coach: 'feliks',
        text: "Great news, Charlie — the moves work exactly like on the big cube! {Right}, {Top}, {Front} and their undo-versions behave the same way. Let's warm up.",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R'], size: 130 },
          text: "**Right** — grab the [Blue] side and push the top away from you.\n\nThe whole right side flips, just like on the big cube. Easy!",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ["R'"], size: 130 },
          text: "**Right Undo** (the little \u21A9)\n\nGrab the same side and pull the top **toward you** this time.\n\n{Right} then {Right \u21A9} always cancels out.",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['U'], size: 130 },
          text: "**Top** — spin the top layer so the front row goes **left**.\n\nJust a half-layer turn — easy to do with one finger!",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ["U'"], size: 130 },
          text: "**Top Undo** — spin the top the other way (front row goes right).",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['F'], size: 130 },
          text: "**Front** — turn the [Red] face like a steering wheel, top goes to the right.",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ["F'"], size: 130 },
          text: "**Front Undo** — turn the [Red] face the other way, top goes left.",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R', 'U', "R'", "U'"], size: 100 },
          text: "**Remember the Right-Hand Trigger?**\n\n{Right} {Top} {Right \u21A9} {Top \u21A9}\n\nIt works on the 2x2 too. We'll use it a lot!",
          moves: ['R', 'U', "R'", "U'"],
        },
      ],
      checkIn: {
        text: "Try the right-hand trigger {R} {U} {R'} {U'} six times on your 2x2. Your cube should come right back to the start!",
      },
      celebration: "Your 3x3 moves all work on the 2x2. You're already halfway to solving it!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nCan Charlie hold the 2x2 correctly ([White] on top, [Red] in front), point out a corner, and show you a {Right} move?\n\nIf yes, they're ready for Stage 2!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Nice work! The 2x2 speaks the same language as the big cube. Next up — we solve the entire white side. Only three more corners after the first one!",
  },
};
