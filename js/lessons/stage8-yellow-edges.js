// Stage 8 — Position Yellow Edges (Final Step!)
// Cycle the last layer edges into their correct positions to solve the cube!

export const stage8 = {
  id: 8,
  title: 'Final Edges',
  subtitle: 'The last step — solve the cube!',
  color: '#6200EA',
  lessons: [

    // ── Lesson 8-1: Reading the Edges ─────────────────────────────
    {
      id: '8-1',
      title: 'Which Edges to Move?',
      coachIntro: {
        coach: 'max',
        text: "This is it — the FINAL step! The yellow corners are all in the right spots. Now we just need to cycle the edges so every face is one solid color. Let's go!",
      },
      steps: [
        {
          text: "**Look at the top layer edges.**\n\nTurn {U} to see if any edge already matches its center.\n\nYou might find:\n• **All four match** → YOU'RE DONE! The cube is solved!\n• **One matches** → we work from there\n• **None match** → we need to set one up",
        },
        {
          text: "**If one edge matches:**\n\nHold the cube so the solved edge is at the **back** (away from you).\n\nThe three remaining edges need to cycle — they'll go around like a merry-go-round.",
        },
        {
          text: "**Which direction?**\n\nLook at the front edge. Does its color match the center on its **right** or its **left**?\n\n• If it matches the **right** → we cycle **clockwise**\n• If it matches the **left** → we cycle **counter-clockwise**",
        },
      ],
      checkIn: {
        text: "Find the one solved edge (or check if you're already done!). Hold it at the back and figure out which direction the others need to cycle.",
      },
      celebration: "You can read which way edges need to go!",
    },

    // ── Lesson 8-2: The Edge Cycle Algorithm ──────────────────────
    {
      id: '8-2',
      title: 'Cycle Edges',
      coachIntro: {
        coach: 'feliks',
        text: "One last algorithm and you'll solve the cube! This one cycles three edges around. It's the finish line — let's do this!",
      },
      steps: [
        {
          text: "**Clockwise cycle** (front edge needs to go right):\n\n{R} {U'} {R} {U} {R} {U} {R} {U'} {R'} {U'} {R'} {R'}\n\nThat's a lot of moves! Let's break it down.",
          moves: ['R', "U'", 'R', 'U', 'R', 'U', 'R', "U'", "R'", "U'", "R'", "R'"],
        },
        {
          text: "**Break it into chunks:**\n\n{R} {U'} — start\n{R} {U} — go up\n{R} {U} — go up again\n{R} {U'} — turn back\n{R'} {U'} — reverse\n{R'} {R'} — double finish\n\nPractice it slowly — it's just R and U moves!",
          moves: ['R', "U'", 'R', 'U', 'R', 'U', 'R', "U'", "R'", "U'", 'R2'],
        },
        {
          text: "**Counter-clockwise cycle** (front edge needs to go left):\n\nJust do the **same algorithm twice!**\n\nOr you can use the mirror:\n{L'} {U} {L'} {U'} {L'} {U'} {L'} {U} {L} {U} {L} {L}\n\nBut doing it twice is easier to remember!",
        },
        {
          text: "**If NO edge matches a center:**\n\nDo the clockwise algorithm once from any position.\n\nAfter that, one edge will match. Put it at the back and continue!",
        },
        {
          text: "**The final moment:**\n\nAfter the edges cycle into place, you might need one {U} turn to align everything.\n\nAnd then... **THE CUBE IS SOLVED!**\n\nEvery face is one solid color. You did it!",
        },
      ],
      checkIn: {
        text: "This is it! Cycle those edges into place. When every face is one color — YOU SOLVED THE RUBIK'S CUBE!",
      },
      celebration: "YOU SOLVED THE RUBIK'S CUBE!!! Incredible work, Charlie! You are now officially a cuber!",
    },

    // ── Lesson 8-3: What's Next? ──────────────────────────────────
    {
      id: '8-3',
      title: "What's Next?",
      coachIntro: {
        coach: 'max',
        text: "You solved the cube! That's amazing. Let me tell you what I did after my first solve — I practiced until I could do it faster and faster!",
      },
      steps: [
        {
          text: "**Congratulations!** You can solve a Rubik's Cube!\n\nHere's what to do now:\n\n**1. Solve it again!**\nScramble the cube and solve it from the beginning. Each time gets easier.",
        },
        {
          text: "**2. Practice makes faster!**\n\nYour first solves might take 10-20 minutes. That's completely normal!\n\nWith practice, you can get to under 5 minutes, then under 2 minutes.\n\nMax's tip: focus on smooth turning, not speed. Speed comes naturally!",
        },
        {
          text: "**3. Learn the steps by heart:**\n\n• [White] cross (daisy method)\n• [White] corners (right-hand trigger)\n• Second layer edges (left and right inserts)\n• [Yellow] cross ({F} {R} {U} {R'} {U'} {F'})\n• [Yellow] face (Sune)\n• Position corners\n• Cycle edges\n\nYou can always come back to review any stage!",
        },
        {
          text: "**4. Time yourself!**\n\nGet a timer (your phone works!) and see how fast you can solve.\n\nKeep track of your best time. Try to beat it!\n\nMost cubers start around 3-5 minutes and improve from there.",
        },
        {
          text: "**A message from your coaches:**\n\nFeliks: \"I started just like you — one solve at a time. Every world record started with a first solve. Be proud!\"\n\nMax: \"The cube taught me focus and patience. Every time you solve it, your brain gets a little stronger. Keep going!\"",
        },
      ],
      celebration: "You've completed the entire course! You're a real cuber now! Keep solving and keep having fun!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nCan Charlie solve the cube from a scrambled state? They might need to refer back to lessons for some steps — that's completely normal!\n\nThe goal is for them to be able to work through all the stages. Speed comes with practice!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Charlie, you are AMAZING! You learned to solve a Rubik's Cube! Not many people can say that. Keep cubing, keep having fun, and who knows — maybe we'll see you at a competition one day!",
  },
};
