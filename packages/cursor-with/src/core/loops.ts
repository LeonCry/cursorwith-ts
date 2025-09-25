import type { Point } from '../types';

function gapLoop([currentPoint, targetPoint]: [Point, Point], distance: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  const dx = tar.x - cur.x;
  const dy = tar.y - cur.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d > distance) {
    cur.x += (dx / d) * distance;
    cur.y += (dy / d) * distance;
  }
  else {
    cur.x = targetPoint.x;
    cur.y = targetPoint.y;
  }
  return cur;
}
const CORRECT_FACTOR = 1; // 修正系数，防止无限抖动
function timeLoop([currentPoint, targetPoint]: [Point, Point], timeRatio: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  cur.x = cur.x + (tar.x - cur.x) * timeRatio;
  cur.y = cur.y + (tar.y - cur.y) * timeRatio;
  if (Math.abs(tar.x - cur.x) <= CORRECT_FACTOR) cur.x = tar.x;
  if (Math.abs(tar.y - cur.y) <= CORRECT_FACTOR) cur.y = tar.y;
  return cur;
}

export { gapLoop, timeLoop };
