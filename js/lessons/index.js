// Lesson index — assembles 3x3 stages.
// Stage variables are loaded via script tags before this file.

const STAGES_3X3 = [
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
];

// `STAGES` starts pointing at the 3x3 course and is re-pointed by app.js
// when the active cube type changes.
let STAGES = STAGES_3X3;
