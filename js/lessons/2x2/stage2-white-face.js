// Stage 2 (2x2) — Solve the White Face
// First-layer solve: pick a starting corner, then insert the other three
// using the right-hand trigger.

const stage2_2x2 = {
  id: 2,
  title: 'White Face',
  subtitle: 'Solve the entire bottom layer',
  color: '#2979FF',
  cubeSize: 2,
  lessons: [

    // ── Lesson 2-1: Pick a Starting Corner ───────────────────────
    {
      id: '2x2-2-1',
      title: 'Pick a Starting Corner',
      coachIntro: {
        coach: 'feliks',
        text: "Since the 2x2 has no centres, nothing is telling us what colour each face should be. So we get to choose! We start by placing one [White] corner, and that corner decides everything else.",
      },
      steps: [
        {
          diagram: {
            type: 'face',
            cubeSize: 2,
            colors: ['R','X','X','X'],
            highlights: [0],
          },
          text: "**Look at all 8 corners.** Four of them have a [White] sticker. Pick any one — let's use the corner with [White], [Red], and [Blue].",
        },
        {
          text: "**Put it in the bottom-front-right spot** with:\n\n• [White] on the bottom\n• [Red] on the front\n• [Blue] on the right\n\nYou can hold the corner in your hand and just **place the cube around it** — rotate the whole puzzle so this corner lands on the bottom-front-right.",
        },
        {
          text: "**That corner now decides the scheme.**\n\nBecause this corner sits with [White]-[Red]-[Blue], we know:\n\n• The whole bottom face = [White]\n• The whole front face = [Red]\n• The whole right face = [Blue]\n\nAnd from the opposites: Top = [Yellow], Back = [Orange], Left = [Green].",
        },
        {
          text: "**Don't move this corner again!**\n\nIt's our anchor. Every other corner will be placed to match the faces it sits on.\n\nFrom now on, when we say 'match the front centre' on the 3x3 — on the 2x2, just **match the colour of the corner that's already there**.",
        },
      ],
      checkIn: {
        text: "Can you place the white-red-blue corner at the bottom-front-right of your cube? Check: is [White] facing the floor?",
      },
      celebration: "Your anchor corner is set! The colour scheme is locked in.",
    },

    // ── Lesson 2-2: Insert the Other White Corners ──────────────
    {
      id: '2x2-2-2',
      title: 'Insert a White Corner',
      coachIntro: {
        coach: 'feliks',
        text: "Three white corners to go. We use the exact same right-hand trigger you learned on the big cube. Same trick, same rhythm — just fewer pieces in the way!",
      },
      steps: [
        {
          text: "**Keep [White] on the bottom.** Look at the three remaining white corners.\n\nIf any are in the **top layer** already — great, we can work on them there.\n\nIf any are in the **bottom layer but in the wrong slot** — we'll pop them up first.",
        },
        {
          text: "**Pick one white corner in the top layer.**\n\nLook at its **two non-white colours**. Those colours must match the two bottom-layer sides where the corner wants to go.\n\nExample: a [White]-[Red]-[Green] corner belongs at bottom-front-left (between the [Red] front and the [Green] left).",
        },
        {
          text: "**Set up the corner:**\n\n1. Use {Top} turns to move the corner to the **top-front-right** position — directly above its home slot.\n2. The corner's non-white stickers should be facing the front and the right sides (not always a match yet — that's OK, you just need it above its home).",
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R', 'U', "R'", "U'"], size: 110 },
          text: "**Case 1 — White sticker faces the RIGHT side.**\n\nDo the right-hand trigger **once**:\n{Right} {Top} {Right \u21A9} {Top \u21A9}\n\nThe corner drops into the bottom with [White] on the floor. Done!",
          moves: ['R', 'U', "R'", "U'"],
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R', 'U', "R'", "U'"], size: 110 },
          text: "**Case 2 — White sticker faces UP.**\n\nDo the right-hand trigger **three times**:\n{R} {U} {R'} {U'} — then again — then again.\n\nWatch the corner travel around the top and land in its home with [White] on the floor.",
          moves: ['R', 'U', "R'", "U'", '×3'],
        },
        {
          diagram: { type: 'moveArrow', cubeSize: 2, moves: ['R', 'U', "R'", "U'"], size: 110 },
          text: "**Case 3 — White sticker faces the FRONT (toward you).**\n\nDo the right-hand trigger **five times**.\n\nIt feels long, but it's the same rhythm over and over. Count them out loud!",
          moves: ['R', 'U', "R'", "U'", '×5'],
        },
        {
          text: "**Stuck white corner in the wrong bottom slot?**\n\n1. Hold it at the bottom-front-right\n2. Do the trigger **once** — this pops it up to the top\n3. Now use {Top} to line it up above its real home\n4. Insert it with the case above",
        },
      ],
      checkIn: {
        text: "Insert one white corner into its home. [White] should be on the bottom, and the side colours should match the neighbour corner that's already there!",
      },
      celebration: "You inserted a corner! Just keep going — three becomes two becomes one becomes done.",
    },

    // ── Lesson 2-3: Finish the White Face ────────────────────────
    {
      id: '2x2-2-3',
      title: 'Finish the White Face',
      coachIntro: {
        coach: 'feliks',
        text: "Now do the same trick for the other white corners, one at a time. Don't panic if a corner goes to a weird place — you can always pop it back up with one trigger and retry.",
      },
      steps: [
        {
          text: "**The full process, one corner at a time:**\n\n1. Find a white corner in the top layer\n2. Look at its two non-white colours — that tells you its home slot\n3. Use {Top} to put it above its home\n4. Use the right trigger 1, 3, or 5 times depending on where [White] is facing\n5. Repeat for the next white corner",
        },
        {
          text: "**How do I know the side colours?**\n\nLook at the white corners that are **already on the bottom**. Their side stickers tell you which face is which colour.\n\nExample: if the bottom-front-right corner has [Red] on the front, the whole front face must match [Red]. So any new corner going to the front needs a [Red] side sticker.",
        },
        {
          text: "**If a white corner is already in its correct spot but twisted:**\n\nTreat it the same way:\n1. Hold it at bottom-front-right\n2. Do one trigger to pop it up to the top\n3. Realign with {U} and reinsert using the right case",
        },
        {
          diagram: {
            type: 'face',
            cubeSize: 2,
            colors: ['W','W','W','W'],
            highlights: [0, 1, 2, 3],
          },
          text: "**When you're done:**\n\nThe whole bottom face should be solid [White]. Flip the cube over and check!\n\nAlso look at the bottom row of each side — every corner's side stickers should match its neighbour.",
        },
      ],
      checkIn: {
        text: "Is your whole [White] face solid? Do the bottom side stickers on each face match each other? If yes — you've solved the first layer!",
      },
      celebration: "First layer DONE! That's already half the 2x2 solved. High five!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nIs the entire bottom face of Charlie's 2x2 solid [White], with the bottom ring of side stickers matching colour on each face?\n\nIf yes, they're ready for Stage 3!",
  },

  coachOutro: {
    coach: 'feliks',
    text: "Half the cube done with just one algorithm — the right-hand trigger! Next we flip the cube over and work on the [Yellow] top.",
  },
};
