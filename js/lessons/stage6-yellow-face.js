// Stage 6 — Yellow Face
// Orient all yellow corners so the entire top face is yellow.

const stage6 = {
  id: 6,
  title: 'Yellow Face',
  subtitle: 'Make the whole top yellow',
  color: '#FF1744',
  lessons: [

    // ── Lesson 6-1: Reading the Corners ───────────────────────────
    {
      id: '6-1',
      title: 'Corner Patterns',
      coachIntro: {
        coach: 'max',
        text: "The cross is done but the corners still need to be flipped so yellow faces up. Let's see what patterns we might have.",
      },
      steps: [
        {
          text: "Look at your yellow top face. The cross is there — now count how many **corners** have yellow on top.\n\nYou'll see **0, 1, or 2** yellow corners (or all 4 if you're lucky!).",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','Y','X','Y','Y','Y','X','Y','X'],
          },
          text: "**Zero yellow corners on top:**\n\nLook at the front face. Find a corner where yellow is on the **left side** of the front-left corner. Hold that on the front-left.\n\nThat's your starting position!",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','Y','X','Y','Y','Y','X','Y','Y'],
            highlights: [8],
          },
          text: "**One yellow corner on top:**\n\nHold the cube so the one yellow corner is in the **front-left** position.\n\nThis is your starting position!",
        },
        {
          diagram: {
            type: 'face',
            colors: ['Y','Y','X','Y','Y','Y','X','Y','Y'],
            highlights: [0, 8],
          },
          text: "**Two yellow corners on top:**\n\nHold the cube so the two yellow corners are on the **left side** (front-left and back-left).\n\nThis is your starting position!",
        },
      ],
      checkIn: {
        text: "How many yellow corners are on top of your cube? Can you position the cube correctly for your case?",
      },
      celebration: "You can read the corner patterns! Now for the algorithm.",
    },

    // ── Lesson 6-2: Sune Algorithm ────────────────────────────────
    {
      id: '6-2',
      title: 'The Sune Algorithm',
      coachIntro: {
        coach: 'feliks',
        text: "This algorithm is called Sune (SOO-nay) — it's one of the most famous algorithms in cubing! It flips corners to make the whole yellow face.",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', moves: ['R', 'U', "R'", 'U', 'R', "U'", "U'", "R'"], size: 80, orientation: 'yellowTop' },
          text: "**The Sune algorithm:**\n\nBreak it down:\n• Trigger start, then an extra up turn\n• Finish with double up-back\n\nFollow the arrows!",
          moves: ['R', 'U', "R'", 'U', 'R', "U'", "U'", "R'"],
        },
        {
          text: "**How to use it:**\n\n1. Position the cube correctly (based on 0, 1, or 2 yellow corners)\n2. Do the Sune algorithm\n3. Check: is the whole face yellow?\n4. If not, re-position and repeat\n\nYou might need to do it **1 to 3 times**.",
        },
        {
          text: "**For 0 yellow corners:**\n\nPosition with yellow on the left side of front-left corner.\nDo Sune → check → reposition → repeat.\n\nUsually takes 2-3 applications.",
        },
        {
          text: "**For 1 yellow corner:**\n\nPut the yellow corner at front-left.\nDo Sune → you might get 0 or 2 yellow → reposition → repeat.\n\nUsually takes 2 applications.",
        },
        {
          text: "**For 2 yellow corners:**\n\nPut them on the left side.\nDo Sune → usually solves it in 1-2 applications!",
        },
        {
          text: "**Don't worry if it takes a few tries!**\n\nJust remember:\n1. Count yellow corners on top\n2. Position correctly\n3. Do Sune\n4. Repeat until all yellow\n\nThe whole top face will be beautiful solid [Yellow]!",
        },
      ],
      checkIn: {
        text: "Make the entire top face [Yellow]! Keep applying Sune with correct positioning until all four corners are yellow on top.",
      },
      celebration: "The whole yellow face is done! Look at that beautiful solid yellow top!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nIs the entire top face of Charlie's cube solid yellow? All four corners and the cross should be yellow.\n\nIf yes, they're ready for Stage 7 — we're almost done!",
  },

  coachOutro: {
    coach: 'max',
    text: "Yellow face complete! The cube is looking great. Just two more steps — positioning the corners, then the edges, and you'll have a SOLVED CUBE!",
  },
};
