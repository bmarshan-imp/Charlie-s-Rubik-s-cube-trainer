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
          text: "A Rubik's cube has **six faces**. Each face has a name based on where it is when you hold the cube in front of you.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['W','W','W','W','W','W','W','W','W'],
            labels: ['','','','','U','','','',''],
          },
          text: "**Up (U)** — the face on top.\n\nOn a standard cube, [White] is on top.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['Y','Y','Y','Y','Y','Y','Y','Y','Y'],
            labels: ['','','','','D','','','',''],
          },
          text: "**Down (D)** — the face on the bottom.\n\n[Yellow] lives down here.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['R','R','R','R','R','R','R','R','R'],
            labels: ['','','','','F','','','',''],
          },
          text: "**Front (F)** — the face looking at you.\n\n[Red] is our front face.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['O','O','O','O','O','O','O','O','O'],
            labels: ['','','','','B','','','',''],
          },
          text: "**Back (B)** — the face away from you.\n\n[Orange] hides in the back.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['G','G','G','G','G','G','G','G','G'],
            labels: ['','','','','L','','','',''],
          },
          text: "**Left (L)** — the face on your left hand.\n\n[Green] is on the left.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['B','B','B','B','B','B','B','B','B'],
            labels: ['','','','','R','','','',''],
          },
          text: "**Right (R)** — the face on your right hand.\n\n[Blue] is on the right.",
        },
        {
          text: "**Quick memory trick:**\nHold the cube with [White] on top and [Red] facing you.\n\nNow the faces always match:\n**U**p = [White], **D**own = [Yellow]\n**F**ront = [Red], **B**ack = [Orange]\n**L**eft = [Green], **R**ight = [Blue]",
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
        text: "Now for the fun part — making moves! Cubers have a simple language to write down moves. Each move is just one letter. Let me show you!",
      },
      steps: [
        {
          text: "Every move **turns one face 90 degrees clockwise** (like turning a clock hand).\n\nWe name the move after the face:\n\n{R} = turn the **Right** face clockwise\n{U} = turn the **Up** face clockwise\n{F} = turn the **Front** face clockwise",
        },
        {
          text: "**What about the other direction?**\n\nAdd an apostrophe (we say \"prime\"):\n\n{R'} = turn Right face **counter-clockwise**\n{U'} = turn Up face **counter-clockwise**\n{F'} = turn Front face **counter-clockwise**\n\nThink of it as \"undo\" — {R} then {R'} puts everything back!",
        },
        {
          text: "**All six basic moves:**\n\n{R} Right clockwise\n{L} Left clockwise\n{U} Up clockwise\n{D} Down clockwise\n{F} Front clockwise\n{B} Back clockwise\n\nAnd each one has a prime version: {R'} {L'} {U'} {D'} {F'} {B'}",
        },
        {
          text: "**Let's practice!**\n\nHold your cube with [White] on top and [Red] facing you.\n\nDo this move: {R}\n\nTurn the [Blue] (right) face clockwise — the top-right column goes toward you.",
        },
        {
          text: "Now undo it: {R'}\n\nTurn the [Blue] (right) face counter-clockwise. Everything goes back!\n\n**Try it a few times.** {R} then {R'}. See how they cancel out?",
        },
        {
          text: "**Now try:** {U}\n\nTurn the [White] (top) face clockwise. The front row of the top goes to the right.\n\nUndo with: {U'}\n\nThe top row goes back.",
        },
        {
          text: "**One more tip:**\n\nWhen you see moves written together like {R} {U} {R'} {U'}, just do them **one at a time, left to right**.\n\nThis particular sequence is super important — cubers call it a **trigger**. You'll use it a LOT!",
          moves: ['R', "U", "R'", "U'"],
        },
      ],
      checkIn: {
        text: "Try doing {R} {U} {R'} {U'} six times in a row. Your cube should return to the start! (It's like magic.)",
      },
      celebration: "You can read and do cube moves! You're speaking the cuber's language now!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nCan Charlie name the six faces and show you an {R} move and an {R'} move?\n\nIf yes, they're ready for Stage 2!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Stage 1 done! You know the cube inside and out. Next up — we start solving! We'll build the white cross first.",
  },
};
