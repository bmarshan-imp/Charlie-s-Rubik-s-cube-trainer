// Stage 3 — White Corners
// Complete the first layer by inserting white corner pieces.

const stage3 = {
  id: 3,
  title: 'White Corners',
  subtitle: 'Finish the whole first layer',
  color: '#00C853',
  lessons: [

    // ── Lesson 3-1: Finding Corners ───────────────────────────────
    {
      id: '3-1',
      title: 'Finding Corners',
      coachIntro: {
        coach: 'feliks',
        text: "The white cross is done — nice! Now we fill in the four corners to complete the entire white face and first layer. Let me show you where to look.",
      },
      steps: [
        {
          diagram: {
            type: 'face',
            colors: ['W','W','W','W','W','W','W','W','W'],
            highlights: [0, 2, 6, 8],
          },
          text: "We need to fill in the four **corners** of the [White] face.\n\nEach corner piece has **three colors** — white plus two side colors.",
        },
        {
          text: "**Where are the white corners right now?**\n\nHold your cube with [White] on top. Look around the **bottom layer** for corners that have a white sticker.\n\nMost of them will be down there. Some might already be on top but in the wrong spot.",
        },
        {
          text: "**Each corner has a home.**\n\nThe white-red-blue corner belongs between the [White], [Red], and [Blue] faces.\n\nThe white-red-green corner belongs between [White], [Red], and [Green].\n\nLook at the three colors to know where it goes!",
        },
      ],
      checkIn: {
        text: "Can you find all four white corner pieces on your cube? What three colors does each one have?",
      },
      celebration: "You can spot white corners! Now let's learn to put them in place.",
    },

    // ── Lesson 3-2: Right-Hand Trigger ────────────────────────────
    {
      id: '3-2',
      title: 'The Right-Hand Trigger',
      coachIntro: {
        coach: 'max',
        text: "There's one move sequence you'll use over and over. I call it the right-hand trigger because your right hand does all the work. It's the most important thing in cubing!",
      },
      steps: [
        {
          text: "**The Right-Hand Trigger:**\n\n{R} {U} {R'} {U'}\n\nSay it like a rhythm: **Right, Up, Right-back, Up-back.**\n\nPractice it a few times until it feels natural!",
          moves: ['R', 'U', "R'", "U'"],
        },
        {
          text: "This trigger does something magical — it cycles corners in and out of the top layer without breaking the cross.\n\n**Try it:** Do the trigger 6 times. Your cube returns to where it started!\n\nThis means it's **safe** — you can't permanently mess up with it.",
        },
        {
          text: "**Why does this matter?**\n\nTo insert a white corner, we'll use this trigger **1 to 5 times** depending on how the corner is oriented.\n\nThe trigger gently nudges the corner into place.\n\nLet's learn the cases!",
        },
      ],
      checkIn: {
        text: "Practice the right-hand trigger {R} {U} {R'} {U'} until you can do it smoothly. Try it 6 times — does your cube come back to the start?",
      },
      celebration: "The right-hand trigger will be your best friend!",
    },

    // ── Lesson 3-3: Inserting Corners ─────────────────────────────
    {
      id: '3-3',
      title: 'Inserting Corners',
      coachIntro: {
        coach: 'feliks',
        text: "Now we use the trigger to actually put corners in! There are a few cases, but they all use the same trigger. Just repeat until it clicks into place.",
      },
      steps: [
        {
          text: "**Setup:** Hold [White] on top. Find a white corner in the **bottom layer**.\n\nTurn the bottom ({D}) to position that corner directly **below its home** — the spot where its three colors match the three surrounding centers.",
        },
        {
          text: "**Now look at where the white sticker is on that corner.**\n\nIt can be in one of three positions:\n1. White faces the **front** (toward you)\n2. White faces the **right** side\n3. White faces **down**\n\nEach case needs a different number of triggers.",
        },
        {
          text: "**Case 1: White faces the right side**\n\nThis is the easy one! Just do the trigger once:\n\n{R} {U} {R'} {U'}\n\nThe corner pops right into place with white on top!",
          moves: ['R', 'U', "R'", "U'"],
        },
        {
          text: "**Case 2: White faces toward you (front)**\n\nDo the trigger **three times:**\n\n{R} {U} {R'} {U'} — three times\n\nWatch the corner — it travels around and lands with white on top.",
          moves: ['R', 'U', "R'", "U'", '×3'],
        },
        {
          text: "**Case 3: White faces down**\n\nDo the trigger **five times:**\n\n{R} {U} {R'} {U'} — five times\n\nIt takes longer, but it works perfectly!",
          moves: ['R', 'U', "R'", "U'", '×5'],
        },
        {
          text: "**What if a white corner is already on top but wrong?**\n\nHold that corner in the front-right position and do the trigger once. It will pop out to the bottom layer.\n\nThen use {D} to position it below its home, and insert it using the cases above.",
        },
        {
          text: "**The full process:**\n\n1. Find a white corner (check the bottom layer)\n2. Use {D} to put it below its home\n3. Hold that spot at front-right\n4. Do the trigger until white is on top\n5. Repeat for all four corners!\n\nTake your time — this is the hardest part of Stage 3.",
        },
      ],
      checkIn: {
        text: "Can you insert all four white corners? The entire [White] face should be solved, and the top part of each side should match its center color!",
      },
      celebration: "First layer DONE! The whole top is white with matching sides!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nIs Charlie's entire top layer solved? The [White] face should be complete, and the first row of each side should be one solid color matching its center.\n\nIf yes, they're ready for Stage 4!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "One whole layer solved! You're a third of the way there. Next up — the middle layer. We'll use a new trick to put edges in place!",
  },
};
