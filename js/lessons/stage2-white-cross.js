// Stage 2 — White Cross
// First real solving step: build a plus-sign of white edges on top.

const stage2 = {
  id: 2,
  title: 'White Cross',
  subtitle: 'Build a white plus sign on top',
  color: '#2979FF',
  lessons: [

    // ── Lesson 2-1: What is the White Cross? ──────────────────────
    {
      id: '2-1',
      title: 'The Goal',
      coachIntro: {
        coach: 'max',
        text: "Time to start solving! The first thing we build is the white cross — a plus sign of white edges on top. Let me show you what we're aiming for.",
      },
      steps: [
        {
          diagram: {
            type: 'face',
            colors: ['X','W','X','W','W','W','X','W','X'],
            highlights: [1, 3, 5, 7],
          },
          text: "The **white cross** looks like a plus sign (+) on the [White] face.\n\nThe four **edge** pieces around the [White] center are all white on top.",
        },
        {
          diagram: {
            type: 'net',
            state: 'custom',
            faces: {
              U: ['X','W','X','W','W','W','X','W','X'],
              F: ['X','R','X','X','R','X','X','X','X'],
              R: ['X','B','X','X','B','X','X','X','X'],
              B: ['X','O','X','X','O','X','X','X','X'],
              L: ['X','G','X','X','G','X','X','X','X'],
            },
            highlights: {
              F: [1], R: [1], B: [1], L: [1],
            },
          },
          text: "But there's a catch! Each white edge also has a **second color**.\n\nThat second color must **match the center** of the face below it.\n\nSee how the [Red] edge lines up with the [Red] center? That's correct!",
        },
        {
          text: "**The rule:** White on top, side color matches the center below.\n\nIf the white is on top but the side color doesn't match — the edge is in the wrong spot. We need to move it.\n\nDon't worry — we'll learn exactly how!",
        },
      ],
      checkIn: {
        text: "Look at your cube. Can you find any white edge pieces? How many are there? (There should be 4!)",
      },
      celebration: "You know what the white cross looks like! Now let's build it.",
    },

    // ── Lesson 2-2: Daisy Method ──────────────────────────────────
    {
      id: '2-2',
      title: 'The Daisy Trick',
      coachIntro: {
        coach: 'feliks',
        text: "Here's a cool trick I like to teach beginners — the Daisy! Instead of building the cross directly on white, we first gather the white edges around the yellow center. It's way easier!",
      },
      steps: [
        {
          diagram: {
            type: 'face',
            colors: ['X','W','X','W','Y','W','X','W','X'],
            highlights: [1, 3, 5, 7],
          },
          text: "**Step 1:** Flip the cube so [Yellow] is on top.\n\nOur goal is to make a **daisy** — four white edges around the [Yellow] center, like petals of a flower!",
        },
        {
          text: "**How to find white edges:**\n\nLook around your whole cube for edge pieces that have a white sticker.\n\nThey could be anywhere — on the sides, on the bottom, tucked in the middle layer.\n\nWe need to get all four up to the top (around [Yellow]).",
        },
        {
          text: "**If a white edge is in the middle layer:**\n\nTurn the face it's on so the white sticker goes up to the top.\n\nJust one turn of that face should do it!\n\n**Tip:** If moving it up would knock out a white edge already on top, first turn the top ({U}) to move the good edge out of the way.",
        },
        {
          text: "**If a white edge is on the bottom ([White] face):**\n\nTurn the face it's on **twice** to bring it from the bottom to the top.\n\nFor example, if it's on the front-bottom, do {F} {F} to flip it up.",
        },
        {
          text: "**Keep going until you have all four white petals around [Yellow]!**\n\nDon't worry about the second color of each edge yet — just get white edges to the top.\n\nTake your time. This is a puzzle within a puzzle!",
        },
      ],
      checkIn: {
        text: "Can you make the daisy? Four white edges around the [Yellow] center on top? Give it a try!",
      },
      celebration: "You made the daisy! Those white petals are ready to become a real cross.",
    },

    // ── Lesson 2-3: Daisy to Cross ────────────────────────────────
    {
      id: '2-3',
      title: 'Daisy to Cross',
      coachIntro: {
        coach: 'max',
        text: "Now we turn the daisy into the real white cross. We'll flip each petal down to its matching side. It's really satisfying!",
      },
      steps: [
        {
          text: "Your daisy is on top (white edges around [Yellow]).\n\n**Now look at the side colors.** Each white edge has a second color — that's the one we need to match.\n\nPick any white petal and look at its side color.",
        },
        {
          text: "**Turn the top ({U}) until that side color matches the center below it.**\n\nFor example, if the side color is [Red], turn {U} until it's above the [Red] center.\n\nThen flip that face **twice** to send the white edge to the bottom.\n\nIf it was on the front: {F} {F}\nIf it was on the right: {R} {R}",
          moves: ['U', '(match)', 'F F'],
        },
        {
          text: "**Repeat for all four petals:**\n\n1. Turn {U} to line up the side color with its center\n2. Flip that face twice to send the petal down\n3. Move to the next petal\n\nAfter all four, flip the cube over so [White] is on top.",
        },
        {
          diagram: {
            type: 'face',
            colors: ['X','W','X','W','W','W','X','W','X'],
            highlights: [1, 3, 5, 7],
          },
          text: "**You should now have the white cross!**\n\nCheck: Is [White] on top with a plus sign? Do the side colors match their centers?\n\nIf a side color doesn't match, don't panic — just flip that edge back up ({F} {F}), realign with {U}, and flip back down.",
        },
      ],
      checkIn: {
        text: "Make the white cross! [White] on top, plus sign, side colors matching. You've got this!",
      },
      celebration: "The white cross is done! You just solved the first part of the cube!",
    },
  ],

  adultCheckIn: {
    text: "**Grown-up check!**\n\nDoes Charlie's cube have a white plus sign on top, with the side colors of each edge matching the center below?\n\nIf yes, they're ready for Stage 3 — white corners!",
  },

  coachOutro: {
    coach: 'max',
    text: "The cross is done! You're already solving. Next we'll put the white corners in place to finish the whole first layer!",
  },
};
