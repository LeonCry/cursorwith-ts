import type { CursorWithOptions, InstanceMeta, Point, TrackPoint } from '../types';
import { gapLoop, springLoop, timeLoop, trackLoop } from '../core/loops';
import { fillDefaultFollow, getFPS, notNone } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用follow
const BASE_FRAME_RATE = 60;
let fps = 0;
let subLoopId: number | null = null;
const trackPoints: TrackPoint[] = [];
// 计算FPS副循环
function subLoop() {
  fps = getFPS();
  subLoopId = requestAnimationFrame(subLoop);
}

function subLoopStop() {
  if (!notNone(subLoopId)) return;
  cancelAnimationFrame(subLoopId);
  subLoopId = null;
}
function computeCurrentPoint(follow: Required<CursorWithOptions>['follow'], currentPoint: Point, targetPoint: Point, t: number) {
  const r = (fps / BASE_FRAME_RATE) || 1;
  const type = follow.type;
  if (type === 'gap') return gapLoop([currentPoint, targetPoint], follow.distance! / r);
  if (type === 'time') return timeLoop([currentPoint, targetPoint], follow.timeRatio! / r);
  if (type === 'track') return trackLoop(trackPoints, currentPoint, t, follow.delay!);
  if (type === 'spring') {
    return springLoop(
      [currentPoint, targetPoint],
      follow.stiffness! / r,
      follow.damping!,
    );
  }
  return currentPoint;
};

export function follow(config: CursorWithOptions['follow']) {
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.follow;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.follow = undefined;
      this.off('mousemove', null, uniqueId);
      this.off('loopBeforeDraw', null, uniqueId);
      subLoopStop();
      return;
    }
    this.options.follow = config;
    fillDefaultFollow(this.options.follow!);
    subLoopId = requestAnimationFrame(subLoop);
    this.on('mousemove', (e: MouseEvent) => {
      if (this.options.follow?.type === 'track') {
        const { left, top } = this.containerRect;
        trackPoints.push({ x: e.clientX - left, y: e.clientY - top, t: performance.now() });
      }
    }, uniqueId);
    this.on('loopBeforeDraw', (t: number) => {
      const { x: tx, y: ty } = this.targetPoint;
      const { x: cx, y: cy } = this.currentPoint;
      if (tx !== cx || ty !== cy) {
        this.currentPoint = computeCurrentPoint(this.options.follow!, this.currentPoint, this.targetPoint, t);
      }
    }, uniqueId);
  }
  return {
    name: uniqueId,
    execute,
  };
}
