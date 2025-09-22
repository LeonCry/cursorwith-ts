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
function timeLoop([currentPoint, targetPoint]: [Point, Point], timeRatio: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  cur.x = cur.x + (tar.x - cur.x) * timeRatio;
  cur.y = cur.y + (tar.y - cur.y) * timeRatio;
  return cur;
}

export { gapLoop, timeLoop };
