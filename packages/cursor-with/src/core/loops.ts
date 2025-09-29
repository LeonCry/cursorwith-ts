import type { Point } from '../types';

const CORRECT_FINAL_DISTANCE_FRAME = 5; // 修正最终距离所需帧数，防止无限抖动(不能为1)
let frameCount = 0;
function gapLoop([currentPoint, targetPoint]: [Point, Point], distance: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  const dx = tar.x - cur.x;
  const dy = tar.y - cur.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d >= distance) {
    cur.x += (dx / d) * distance;
    cur.y += (dy / d) * distance;
    frameCount = 0;
  }
  else {
    if (frameCount === 0) {
      frameCount = CORRECT_FINAL_DISTANCE_FRAME;
    }
    else if (frameCount === 1) {
      frameCount = 0;
      cur.x = targetPoint.x;
      cur.y = targetPoint.y;
    }
    else {
      frameCount--;
      cur.x += (dx / d) * ((distance) / CORRECT_FINAL_DISTANCE_FRAME);
      cur.y += (dy / d) * ((distance) / CORRECT_FINAL_DISTANCE_FRAME);
    }
  }
  return cur;
}
const CORRECT_FACTOR = 1; // 修正系数，防止无限抖动
function timeLoop([currentPoint, targetPoint]: [Point, Point], timeRatio: number) {
  const r = Math.min(timeRatio, 1);
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  cur.x = cur.x + (tar.x - cur.x) * r;
  cur.y = cur.y + (tar.y - cur.y) * r;
  if (Math.abs(tar.x - cur.x) <= CORRECT_FACTOR) cur.x = tar.x;
  if (Math.abs(tar.y - cur.y) <= CORRECT_FACTOR) cur.y = tar.y;
  return cur;
}

let curLocation: Point | undefined;
function trackLoop(trackPoints: Point[], currentPoint: Point, maxDistance: number) {
  let cur = curLocation || { ...currentPoint };
  if (trackPoints.length === 0) return cur;
  const { x, y } = trackPoints[0];
  const distance = Math.sqrt((x - cur.x) ** 2 + (y - cur.y) ** 2);
  cur = gapLoop([cur, { x, y }], Math.min(maxDistance, distance));
  curLocation = cur;
  if (cur.x === x && cur.y === y) {
    trackPoints.shift();
  }
  if (trackPoints.length === 0) curLocation = undefined;
  return cur;
}

export { gapLoop, timeLoop, trackLoop };
