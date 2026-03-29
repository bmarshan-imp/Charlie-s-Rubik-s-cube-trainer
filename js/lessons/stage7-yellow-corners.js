// Stage 7 — Position Yellow Corners
// Permute corners so each one is between the right three colors.

const stage7 = {
  id: 7,
  title: 'Position Corners',
  subtitle: 'Put the yellow corners in the right spots',
  color: '#00BFA5',
  lessons: [

    // ── Lesson 7-1: Checking Corner Positions ─────────────────────
    {
      id: '7-1',
      title: 'Are Corners Home?',
      coachIntro: {
        coach: 'feliks',
        text: "The yellow face is solid — but look at the sides. The corners might not match the side colors yet. We need to put each corner in its correct position!",
      },
      steps: [
        {
          text: "**Look at the top layer from the side.**\n\nEach yellow corner has two side colors. Those side colors need to match the centers they're next to.\n\nFor example, a corner between [Red] and [Blue] centers should have red and blue side stickers.",
        },
        {
          text: "**Check all four corners:**\n\nTurn the cube around and look at each corner.\n\nA corner is in the **right position** if its side colors match the two centers next to it.\n\nA corner is in the **wrong position** if the colors don't match.",
        },
        {
          text: "**Try turning {U}:**\n\nSometimes all four corners are correct, just rotated. Try turning {U} a few times to see if they all line up.\n\nIf you find a position where all corners match — skip to Stage 8!\n\nIf not, we need the algorithm.",
        },
        {
          text: "**Finding a correct corner:**\n\nTurn {U} and look for **at least one corner** that's in the right spot (its side colors match the two adjacent centers).\n\nIf you find one, hold the cube so that correct corner is at the **front-right**.",
        },
      ],
      checkIn: {
        text: "Look at your corners. After turning {U}, can you find at least one corner that matches its two centers?",
      },
      celebration: "You can tell which corners are in the right spot!",
    },

    // ── Lesson 7-2: Corner Swap Algorithm ─────────────────────────
    {
      id: '7-2',
      title: 'Swap Corners',
      coachIntro: {
        coach: 'max',
        text: "This algorithm swaps three corners around while keeping one in place. It's like a musical chairs for corners!",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', moves: ['U', 'R', "U'", "L'", 'U', "R'", "U'", 'L'], size: 80, orientation: 'yellowTop' },
          text: "**The corner-swap algorithm:**\n\nThis keeps the **front-right** corner in place and shuffles the other three.\n\nSo always put your correct corner at front-right!",
          moves: ['U', 'R', "U'", "L'", 'U', "R'", "U'", 'L'],
        },
        {
          text: "**If you found ONE correct corner:**\n\n1. Put it at front-right\n2. Do the algorithm\n3. Check all corners again\n4. If needed, repeat (keep the correct corner at front-right)\n\nUsually takes 1-2 times.",
        },
        {
          text: "**If NO corner is correct:**\n\nDo the algorithm once from any position.\n\nAfter that, at least one corner will be correct.\n\nThen put that one at front-right and do it again.",
        },
        {
          text: "**How to know when you're done:**\n\nWhen you turn {U}, all four corners should match their centers.\n\nThe side colors of the top layer might not fully match yet — that's OK! The **edges** are next.\n\nJust make sure each corner is between the right two colors.",
        },
      ],
      checkIn: {
        text: "Get all four yellow corners in the right positions! Each corner's side colors should match the two centers next to it.",
      },
      celebration: "All corners are in position! Just one more step to go!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nAre all four top-layer corners in the correct positions? Each corner's side colors should match the centers on either side.\n\nIf yes — one more stage and the cube is SOLVED!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Corners are set! Just one more algorithm to cycle the edges into place and YOU WILL HAVE A SOLVED CUBE!",
  },
};
