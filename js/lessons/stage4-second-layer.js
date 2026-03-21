// Stage 4 — Second Layer
// Insert the four middle-layer edge pieces.

const stage4 = {
  id: 4,
  title: 'Second Layer',
  subtitle: 'Solve the middle edges',
  color: '#FF9100',
  lessons: [

    // ── Lesson 4-1: Flip the Cube ─────────────────────────────────
    {
      id: '4-1',
      title: 'Flip and Find Edges',
      coachIntro: {
        coach: 'max',
        text: "Great work on the first layer! Now flip your cube upside down — white goes to the bottom. We want to see the yellow center on top. This is how we'll hold the cube for the rest of the solve!",
      },
      steps: [
        {
          text: "**Flip the cube over!**\n\n[White] goes on the **bottom** (you already solved it — hide it away).\n[Yellow] is now on **top**.\n\nFrom now on, we always hold the cube this way.",
        },
        {
          text: "**What's the second layer?**\n\nIt's the **middle ring** of edges — the four edge pieces between the top and bottom layers.\n\nThese edges have **no yellow** on them (yellow edges belong on top, which we'll do later).",
        },
        {
          text: "**Find the edges we need:**\n\nLook at the **top layer** for edge pieces that have **no yellow sticker**.\n\nThese are the ones we need to insert into the middle layer.\n\nIf an edge has yellow on it, skip it for now — it belongs on top.",
        },
      ],
      checkIn: {
        text: "Flip your cube so [Yellow] is on top. Can you find any edge pieces in the top layer that have no yellow?",
      },
      celebration: "You know which edges belong in the middle!",
    },

    // ── Lesson 4-2: Edge to the Right ─────────────────────────────
    {
      id: '4-2',
      title: 'Edge Goes Right',
      coachIntro: {
        coach: 'feliks',
        text: "When a middle edge needs to go to the right, we have a slick move for that. It's like the trigger you already know, but with a twist!",
      },
      steps: [
        {
          text: "**Setup:** Find a non-yellow edge on top. Turn {U} until its **front sticker matches the center** below it.\n\nNow look at the edge's **top sticker**. Does it match the center on the **right** or the **left**?",
        },
        {
          diagram: { type: 'moveArrow', moves: ['U', 'R', "U'", "R'", "U'", "F'", 'U', 'F'], size: 80 },
          text: "**If the top color matches the RIGHT center:**\n\nWe push the edge to the right using this sequence.\n\n**Part 1:** move edge away\n**Part 2:** tuck it in\n\nLet's break it down!",
          moves: ['U', 'R', "U'", "R'", "U'", "F'", 'U', 'F'],
        },
        {
          text: "**Think of it in two parts:**\n\n**Part 1:** {U} {R} {U'} {R'}\nThis moves the edge out of the way and opens a slot.\n\n**Part 2:** {U'} {F'} {U} {F}\nThis tucks the edge into the slot from the right.\n\nTogether they smoothly slide the edge into the middle layer!",
        },
        {
          diagram: { type: 'moveArrow', moves: ['U', 'R', "U'", "R'", "U'", "F'", 'U', 'F'], size: 80 },
          text: "**Try it step by step:**\n\n1. Line up the front color with the front center\n2. Check that the top color matches the right center\n3. Follow the arrows left to right!\n4. The edge should be in place!",
          moves: ['U', 'R', "U'", "R'", "U'", "F'", 'U', 'F'],
        },
      ],
      checkIn: {
        text: "Find an edge that needs to go right and try inserting it! Don't worry if it takes a few tries.",
      },
      celebration: "You can insert edges to the right! Half the battle won!",
    },

    // ── Lesson 4-3: Edge Goes Left ────────────────────────────────
    {
      id: '4-3',
      title: 'Edge Goes Left',
      coachIntro: {
        coach: 'max',
        text: "Now the mirror version — when the edge needs to go left instead of right. It's the same idea, just the other direction!",
      },
      steps: [
        {
          diagram: { type: 'moveArrow', moves: ["U'", "L'", 'U', 'L', 'U', 'F', "U'", "F'"], size: 80 },
          text: "**If the top color matches the LEFT center:**\n\nWe push the edge to the left — follow the arrows!",
          moves: ["U'", "L'", 'U', 'L', 'U', 'F', "U'", "F'"],
        },
        {
          text: "**It's a mirror of the right version:**\n\nRight version: {U} {R} {U'} {R'} {U'} {F'} {U} {F}\nLeft version: {U'} {L'} {U} {L} {U} {F} {U'} {F'}\n\nSame idea, opposite direction!",
        },
        {
          text: "**What if an edge is already in the middle layer but wrong?**\n\nJust do either the right or left insert to push a **different** edge into that spot. The wrong edge will pop out to the top layer.\n\nThen insert it correctly!",
        },
        {
          text: "**The full second layer process:**\n\n1. Find a non-yellow edge on top\n2. Match its front color with the center ({U} to align)\n3. Check: does the top color match right or left?\n4. Do the right or left algorithm\n5. Repeat for all four middle edges!\n\nThis takes practice — don't rush!",
        },
      ],
      checkIn: {
        text: "Can you solve the entire second layer? All four middle edges should match their centers on both sides!",
      },
      celebration: "Two layers DONE! You've solved two-thirds of the cube!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nAre the bottom two layers solved? The [White] layer should be complete on the bottom, and the middle ring of edges should all match their centers.\n\nIf yes, they're ready for Stage 5!",
  },

  coachOutro: {
    coach: 'max',
    text: "Two layers down, one to go! Everything from here is on the yellow top. We're in the endgame now!",
  },
};
