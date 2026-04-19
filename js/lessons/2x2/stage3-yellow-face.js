// Stage 3 (2x2) — Make the Yellow Face
// Orient the last layer so the entire top face is yellow. Uses Sune only.

const stage3_2x2 = {
  id: 3,
  title: 'Yellow Face',
  subtitle: 'Make the top all yellow with Sune',
  color: '#FF1744',
  cubeSize: 2,
  lessons: [

    // ── Lesson 3-1: Flip and Look ───────────────────────────────
    {
      id: '2x2-3-1',
      title: 'Flip and Look',
      coachIntro: {
        coach: 'feliks',
        text: "Time to work on the last four corners. Flip the cube so the white side you just solved is on the bottom and [Yellow] is on top. Don't worry about the side colours yet — we'll fix those last.",
      },
      steps: [
        {
          text: "**Keep [White] on the bottom and [Yellow] on top.**\n\nLook at the top face. How many [Yellow] stickers can you see up there?\n\nEach top corner has exactly one sticker on top. Count how many of those four are already [Yellow].",
        },
        {
          diagram: {
            type: 'face',
            cubeSize: 2,
            colors: ['Y','Y','Y','Y'],
            highlights: [0, 1, 2, 3],
          },
          text: "**If all four are already yellow:**\n\nAmazing — you can skip straight to Stage 4!\n\nIf not, don't worry — we only need one algorithm: **Sune**.",
        },
        {
          text: "**Our plan for the yellow face:**\n\nWe'll use one algorithm — **Sune** — over and over until the whole top is yellow.\n\nBefore each Sune, we'll rotate the **whole cube** so a special corner is in the right spot. Then we do Sune. Repeat until done.",
        },
      ],
      checkIn: {
        text: "Flip your cube so [Yellow] is on top. How many yellow stickers do you see on the top face right now? (0, 1, 2 or 4 are all normal!)",
      },
      celebration: "Cube flipped, corners counted. Let's Sune!",
    },

    // ── Lesson 3-2: The Sune Algorithm ──────────────────────────
    {
      id: '2x2-3-2',
      title: 'Sune (SOO-nay)',
      coachIntro: {
        coach: 'feliks',
        text: "Sune is one of my favourite algorithms. It rotates three top corners at once. Say it like a song: Right, Top, Right-back, Top, Right, Top-top, Right-back!",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R', 'U', "R'", 'U', 'R', "U'", "U'", "R'"], size: 80, orientation: 'yellowTop' },
          text: "**The Sune algorithm:**\n\n{R} {U} {R'} {U} {R} {U} {U} {R'}\n\nThe two {U}s at the end are just a double-top-turn (U2).\n\nFollow the arrows carefully!",
          moves: ['R', 'U', "R'", 'U', 'R', "U'", "U'", "R'"],
        },
        {
          text: "**Where to hold the cube before each Sune:**\n\nLook at the top. Find any corner that has a **yellow sticker on its LEFT side** (on the left face of the cube, not on top).\n\nHold the cube so that corner is at the **front-left**.\n\nThen do Sune!",
        },
        {
          text: "**What if there's no yellow on any left side?**\n\nThen turn the whole cube (pick it up and spin it) until one of the top corners shows yellow on the left face. There will always be one — unless the top is already solid [Yellow]!",
        },
        {
          text: "**Repeat until top is all [Yellow]:**\n\n1. Rotate the cube so a yellow-on-left corner is front-left\n2. Do Sune: {R} {U} {R'} {U} {R} {U2} {R'}\n3. Check — is the top all [Yellow] now?\n4. If not, repeat. Usually takes 1 to 3 tries!",
        },
        {
          diagram: {
            type: 'face',
            cubeSize: 2,
            colors: ['Y','Y','Y','Y'],
            highlights: [0, 1, 2, 3],
          },
          text: "**You're done with Stage 3 when:**\n\nEvery sticker on the top face is [Yellow].\n\nThe side colours of the top corners might be jumbled — that's totally fine! We fix those in Stage 4.",
        },
      ],
      checkIn: {
        text: "Keep re-positioning and Sune-ing until your entire top face is solid [Yellow]! Don't give up — 1 to 3 tries does it.",
      },
      celebration: "Yellow face complete! Sune is a magical little algorithm.",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nIs Charlie's whole top face solid [Yellow]? (The side colours of the top corners may still be out of place — that's fine.)\n\nIf yes, they're ready for the final stage!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Two-thirds of the way there! The [Yellow] face is solid. One more algorithm and the 2x2 is solved.",
  },
};
