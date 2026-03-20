// Lesson index — assembles all stages into a single STAGES array.

import { stage1 } from './stage1-cube-basics.js';
import { stage2 } from './stage2-white-cross.js';
import { stage3 } from './stage3-white-corners.js';
import { stage4 } from './stage4-second-layer.js';
import { stage5 } from './stage5-yellow-cross.js';
import { stage6 } from './stage6-yellow-face.js';
import { stage7 } from './stage7-yellow-corners.js';
import { stage8 } from './stage8-yellow-edges.js';

export const STAGES = [
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
];
