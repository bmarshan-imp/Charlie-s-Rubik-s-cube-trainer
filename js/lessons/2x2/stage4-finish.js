// Stage 4 (2x2) — Finish the Cube
// Permute the last layer corners with a single algorithm (T-perm).

const stage4_2x2 = {
  id: 4,
  title: 'Finish It!',
  subtitle: 'Swap the last corners into place',
  color: '#6200EA',
  cubeSize: 2,
  lessons: [

    // ── Lesson 4-1: Check the Top Corners ───────────────────────
    {
      id: '2x2-4-1',
      title: 'Check the Top Corners',
      coachIntro: {
        coach: 'feliks',
        text: "Top is all yellow but the side colours are probably jumbled. Let's see how jumbled — it might be almost solved already!",
      },
      steps: [
        {
          text: "**Try a {Top} turn and look.**\n\nTurn the top layer around ({U} a few times). After each turn, look at all four side faces.\n\n**If you can find a position where every side face has two matching side stickers on top** — the cube is already solved! Just align and enjoy.",
        },
        {
          text: "**Find pairs of matching corners.**\n\nLook at two corners that sit side-by-side on one face. Do they show the **same colour** on that face?\n\nFor example: do the two top-back corners both show [Orange] on the back? If yes, that's a **matched pair**.",
        },
        {
          text: "**Three possible situations:**\n\n1. **Already solved** — one {U} turn away from finished.\n2. **Two matched corners on one side** — one algorithm away from solved.\n3. **No matched pair on any side** — do the algorithm once, then check again.",
        },
      ],
      checkIn: {
        text: "Rotate {U} and look at the side faces. Can you find two corners that match on one side? Or is the cube already solved after a {U} turn?",
      },
      celebration: "You can read the top! Almost there.",
    },

    // ── Lesson 4-2: The Corner Swap ─────────────────────────────
    {
      id: '2x2-4-2',
      title: 'Swap Corners',
      coachIntro: {
        coach: 'feliks',
        text: "One more algorithm, Charlie. It's a bit longer — 14 moves — but it's the **only** one left. Break it into chunks and take it slow.",
      },
      steps: [
        {
          diagram: {
            type: 'moveArrow',
            cubeSize: 2,
            moves: ['R', 'U', "R'", "U'", "R'", 'F', 'R', 'R', "U'", "R'", "U'", 'R', 'U', "R'", "F'"],
            size: 60,
            orientation: 'yellowTop',
          },
          text: "**The corner-swap algorithm:**\n\n{R} {U} {R'} {U'} {R'} {F} {R} {R} {U'} {R'} {U'} {R} {U} {R'} {F'}\n\n(The {R} {R} in the middle is just {R} done twice — some people say R2.)",
          moves: ['R', 'U', "R'", "U'", "R'", 'F', 'R2', "U'", "R'", "U'", 'R', 'U', "R'", "F'"],
        },
        {
          text: "**Break it into chunks:**\n\n• **Chunk 1:** {R} {U} {R'} {U'} (the right-hand trigger!)\n• **Chunk 2:** {R'} {F} {R2} {U'} {R'}\n• **Chunk 3:** {U'} {R} {U} {R'} {F'}\n\nChunk 1 is an old friend. Learn Chunks 2 and 3 slowly.",
        },
        {
          text: "**What this algorithm does:**\n\nIt **swaps the two right-side top corners** (front-right and back-right) and leaves the two left-side corners exactly where they are.\n\nSo: put your **matched pair on the LEFT side** before you run it!",
        },
        {
          text: "**If you have a matched pair:**\n\n1. Rotate the whole cube so the matched pair is on the **left** face (both left-side top corners match).\n2. Do the algorithm.\n3. The right side swaps and the cube is solved!\n4. You may need one final {U} turn to line everything up.",
        },
        {
          text: "**If there's no matched pair anywhere:**\n\nThat's the 'diagonal' case. Do the algorithm once from **any** orientation.\n\nAfter it finishes, check again — you'll now have a matched pair on some side. Put it on the left and do the algorithm one more time.",
        },
        {
          text: "**The final moment!**\n\nAfter the swap, give {U} a little turn until every side face is a single solid colour.\n\nEvery sticker in its right place. Every face one colour.\n\n**YOUR 2x2 IS SOLVED!**",
        },
      ],
      checkIn: {
        text: "Do the algorithm until every face of your 2x2 is a single solid colour. When it clicks together — you've SOLVED THE POCKET CUBE!",
      },
      celebration: "YOU SOLVED THE 2x2!!! The Pocket Cube is no match for you!",
    },

    // ── Lesson 4-3: What's Next? ────────────────────────────────
    {
      id: '2x2-4-3',
      title: "What's Next?",
      coachIntro: {
        coach: 'feliks',
        text: "You solved two different cubes now, Charlie. You're a real cuber. Let me give you a few ideas for what to try next.",
      },
      steps: [
        {
          text: "**Solve it again — from a scramble.**\n\nMix up the cube and solve it from the start. Each time it gets easier. Your fingers start to remember the algorithms on their own!",
        },
        {
          text: "**Time yourself.**\n\nGrab a phone timer. Scramble the cube. Start the timer when you pick it up, stop when it's solved.\n\nMany 2x2 beginners start at 1-2 minutes. With practice you can get under 30 seconds — then under 15!",
        },
        {
          text: "**The four steps by heart:**\n\n1. Place the first white corner — anchor your colour scheme\n2. Insert the other three white corners with the right-hand trigger\n3. Make the yellow face with Sune\n4. Swap the last corners with the 14-move algorithm\n\nCome back to any lesson whenever you want a refresher!",
        },
        {
          text: "**Try the big cube again!**\n\nNow that you've seen the 2x2, you can go back to the 3x3 and notice: the 2x2 is basically the 3x3 **without the edges and centres**.\n\nThe corners behave the same way on both!",
        },
        {
          text: "**A message from me:**\n\nFeliks says: \"The 2x2 is small, but solving it is a big deal. Be proud, Charlie — you figured out two different puzzles. Keep turning, keep smiling, keep cubing!\"",
        },
      ],
      celebration: "You've finished the 2x2 course! Two cubes down — what will you solve next?",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nCan Charlie take a fully scrambled 2x2 and work through all four stages to a solved state? They may need to glance back at the algorithm lessons — that's expected!\n\nThe goal is understanding the four steps, not memorising them perfectly yet.",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Amazing work, Charlie! Two cubes solved. Keep practising — speed comes with repetition. I'm proud of you!",
  },
};
