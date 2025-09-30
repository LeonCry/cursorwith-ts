import type { Point, TrackPoint } from '../types';

const CORRECT_FINAL_DISTANCE_FRAME = 5; // 修正最终距离所需帧数，防止无限抖动(不能为1)
let frameCount = 0;
/**
 * 定长模式
 * distance 每帧移动的距离
 */
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
/**
 * 衰减模式
 * timeRatio 衰减率
 */
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
let vx = 0;
let vy = 0;
/**
 * 弹簧模式
 * stiffness 弹簧硬度
 * damping 阻尼系数
 */
function springLoop([currentPoint, targetPoint]: [Point, Point], stiffness: number, damping: number) {
  const cur = { ...currentPoint };
  const tar = { ...targetPoint };
  const ax = -stiffness * (cur.x - tar.x) - damping * vx;
  const ay = -stiffness * (cur.y - tar.y) - damping * vy;
  vx += ax;
  vy += ay;
  cur.x += vx;
  cur.y += vy;
  return cur;
}

/**
 * 轨迹跟随模式
 */
function trackLoop(trackPoints: TrackPoint[], currentPoint: Point, time: number, delay: number) {
  let cur = { ...currentPoint };
  if (trackPoints.length === 0) return cur;
  const { x, y, t } = trackPoints[0];
  if (t <= time - delay) {
    cur = { x, y };
    trackPoints.shift();
  }
  return cur;
}

export { gapLoop, springLoop, timeLoop, trackLoop };
