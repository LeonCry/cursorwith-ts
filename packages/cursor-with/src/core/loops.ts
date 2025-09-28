import type { Point, Track } from '../types';

const CORRECT_FINAL_DISTANCE_FRAME = 5; // 修正最终距离所需帧数，防止无限抖动(不能为1)
let frameCount = 0;
function gapLoop([currentPoint, targetPoint]: [Point, Point], distance: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  const dx = tar.x - cur.x;
  const dy = tar.y - cur.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d > distance) {
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
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  cur.x = cur.x + (tar.x - cur.x) * timeRatio;
  cur.y = cur.y + (tar.y - cur.y) * timeRatio;
  if (Math.abs(tar.x - cur.x) <= CORRECT_FACTOR) cur.x = tar.x;
  if (Math.abs(tar.y - cur.y) <= CORRECT_FACTOR) cur.y = tar.y;
  return cur;
}

function trackLoop(trackPoints: Track[], currentPoint: Point, delay: number, time: number) {
  let cur = { ...currentPoint };
  if (trackPoints.length === 0) return cur;
  while (1) {
    const { x, y, t } = trackPoints[0];
    if (t <= time - delay) {
      cur = { x, y };
      trackPoints.shift();
      if (trackPoints.length === 0) break;
    }
    else {
      break;
    }
  }
  return cur;
}

export { gapLoop, timeLoop, trackLoop };
