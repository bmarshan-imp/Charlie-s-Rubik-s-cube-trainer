// Stage 1 — Know Your Cube
// Teaches cube anatomy, face names, color scheme, and move notation.

const stage1 = {
  id: 1,
  title: 'Know Your Cube',
  subtitle: 'Learn the pieces, faces, and how to talk about moves',
  color: '#7C4DFF',
  lessons: [

    // ── Lesson 1-1: The Six Faces ─────────────────────────────────
    {
      id: '1-1',
      title: 'The Six Faces',
      coachIntro: {
        coach: 'feliks',
        text: "Hey Charlie! I'm Feliks. Before we solve anything, let's learn the names of each side of the cube. It's like learning the map before the adventure!",
      },
      steps: [
        {
          diagram: { type: 'net', state: 'solved' },
          text: "A Rubik's cube has **six faces**. Each face has a name based on where it is when you hold the cube in front of you.\n\nYou can tell which face is which by the **colour in the middle** — that never changes!",
        },
        {
          diagram: {
            type: 'face',
            colors: ['W','W','W','W','W','W','W','W','W'],
            labels: ['','','','','Top','','','',''],
          },
          text: "**Top** — the face on top.\n\nOn a standard cube, [White] is on top.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['Y','Y','Y','Y','Y','Y','Y','Y','Y'],
            labels: ['','','','','Bottom','','','',''],
          },
          text: "**Bottom** — the face underneath.\n\n[Yellow] lives down here.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['R','R','R','R','R','R','R','R','R'],
            labels: ['','','','','Front','','','',''],
          },
          text: "**Front** — the face looking at you.\n\n[Red] is our front face.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['O','O','O','O','O','O','O','O','O'],
            labels: ['','','','','Back','','','',''],
          },
          text: "**Back** — the face away from you.\n\n[Orange] hides in the back.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['B','B','B','B','B','B','B','B','B'],
            labels: ['','','','','Left','','','',''],
          },
          text: "**Left** — the face on your left hand.\n\n[Blue] is on the left.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['G','G','G','G','G','G','G','G','G'],
            labels: ['','','','','Right','','','',''],
          },
          text: "**Right** — the face on your right hand.\n\n[Green] is on the right.",
        },
        {
          text: "**Quick memory trick:**\nHold the cube with [White] on top and [Red] facing you.\n\nNow the faces always match their colour:\n**Top** = [White], **Bottom** = [Yellow]\n**Front** = [Red], **Back** = [Orange]\n**Left** = [Blue], **Right** = [Green]",
        },
      ],
      checkIn: {
        text: "Can you hold your cube with [White] on top and [Red] facing you? Name all six faces!",
      },
      celebration: "You know all six faces! That's the first step to solving the whole cube!",
    },

    // ── Lesson 1-2: Pieces of the Puzzle ──────────────────────────
    {
      id: '1-2',
      title: 'Pieces of the Puzzle',
      coachIntro: {
        coach: 'max',
        text: "Hi Charlie! I'm Max. Did you know the cube has three different types of pieces? Let me show you — once you see them, you can't unsee them!",
      },
      steps: [
        {
          diagram: { type: 'isometric' },
          text: "Look at your cube closely. There are exactly **26 small pieces** that move (the center of the cube is hidden inside).\n\nThese pieces come in three types.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','X','X','X','W','X','X','X','X'],
            highlights: [4],
          },
          text: "**Center pieces** — right in the middle of each face.\n\nThere are **6 centers** (one per face). They have **one** colored sticker.\n\n**Centers never move!** They tell you what color that face will be when it's solved.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','R','X','R','X','R','X','R','X'],
            highlights: [1, 3, 5, 7],
          },
          text: "**Edge pieces** — in the middle of each edge.\n\nThere are **12 edges**. Each edge has **two** colored stickers.\n\nEdges live between two centers.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['R','X','R','X','X','X','R','X','R'],
            highlights: [0, 2, 6, 8],
          },
          text: "**Corner pieces** — on the corners!\n\nThere are **8 corners**. Each corner has **three** colored stickers.\n\nCorners touch three faces at once.",
        },
        {
          text: "**Why does this matter?**\n\nA center can only ever be a center. An edge can only ever be an edge. A corner can only ever be a corner.\n\nYou can't turn an edge into a corner — they're different shapes inside the cube!",
        },
        {
          text: "**Here's the big secret:**\n\nSince centers never move, they tell you the goal.\n\nIf the [White] center is on top, then the whole top face needs to be [White] when solved.\n\nEvery piece has a **home** — solving means getting every piece back home!",
        },
      ],
      checkIn: {
        text: "Pick up your cube. Can you find a **center**, an **edge**, and a **corner**? How many stickers does each one have?",
      },
      celebration: "You can see the three piece types! That's how every cuber thinks about the puzzle.",
    },

    // ── Lesson 1-3: Move Notation ─────────────────────────────────
    {
      id: '1-3',
      title: 'Your First Moves',
      coachIntro: {
        coach: 'feliks',
        text: "Now for the fun part — making moves! Every move just means: grab one side and turn it. The red arrows in the pictures show you which way to turn. Let me show you!",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', moves: ['R'], size: 130 },
          text: "**Right — follow the arrow!**\n\nHold your cube with [White] on top and [Red] facing you.\n\nGrab the [Green] side (your right hand) and push the top of it **away from you**.\n\nThe coloured square in the middle shows you which face to turn. The red arrow shows which way!",
        },
        {
          diagram: { type: 'moveArrow', moves: ["R'"], size: 130 },
          text: "**Right Undo — the arrow flips!**\n\nSee the little hook \u21A9 in the label? That means **go the other way**.\n\nGrab the [Green] side again and pull the top **toward you** this time.\n\nDo {Right} then {Right \u21A9} — everything goes back! They undo each other.",
        },
        {
          diagram: { type: 'moveArrow', moves: ['R', "R'"], size: 110 },
          text: "**The big idea:**\n\nEvery move has a **do** and an **undo**.\n\nNo hook = follow the arrow.\nHook \u21A9 = go the other way.\n\nTry {Right} then {Right \u21A9} a few times. See how they cancel out?",
        },
        {
          diagram: { type: 'moveArrow', moves: ['U'], size: 130 },
          text: "**Top — spin the top!**\n\nLook at the [White] centre square in the picture. Grab that top layer and spin it so the front row moves to the **left**.\n\nFollow the red arrow!",
        },
        {
          diagram: { type: 'moveArrow', moves: ["U'"], size: 130 },
          text: "**Top Undo**\n\nSame top layer, but spin it the **other way** — front row moves to the right.\n\n{Top} then {Top \u21A9} puts it all back.",
        },
        {
          diagram: { type: 'moveArrow', moves: ['F'], size: 130 },
          text: "**Front — twist the face looking at you!**\n\nSee the [Red] centre? Grab that front face and turn it like a steering wheel — top goes to the right.\n\nThe curvy arrow shows the spin direction!",
        },
        {
          diagram: { type: 'moveArrow', moves: ["F'"], size: 130 },
          text: "**Front Undo**\n\nSame front face, but steer the other way — top goes left.\n\n{Front} then {Front \u21A9} cancels out, just like the others!",
        },
        {
          diagram: { type: 'moveArrow', moves: ['L', "L'", 'D', "D'", 'B', "B'"], size: 90 },
          text: "**The other three sides work the same way!**\n\nThe coloured square in the middle tells you which face. The arrow tells you which way. The \u21A9 version always goes the opposite way.\n\nYou don't need to memorise letters — just **look at the colour and follow the arrows**!",
        },
        {
          diagram: { type: 'moveArrow', moves: ['R', 'U', "R'", "U'"], size: 110 },
          text: "**Your first combo!**\n\nDo these four moves **left to right**, one at a time. Look at each colour and follow each arrow!\n\nThis combo is super important — you'll use it a LOT later!",
          moves: ['R', 'U', "R'", "U'"],
        },
      ],
      checkIn: {
        text: "Try doing {Right} {Top} {Right \u21A9} {Top \u21A9} six times in a row. Follow the arrows each time. Your cube should return to the start! (It's like magic.)",
      },
      celebration: "You can read and do cube moves now! Look at the colour, follow the arrow!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nCan Charlie name the six faces and show you a {Right} move and a {Right \u21A9} move?\n\nIf yes, they're ready for Stage 2!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Stage 1 done! You know the cube inside and out. Next up — we start solving! We'll build the white cross first.",
  },
};
