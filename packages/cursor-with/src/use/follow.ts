import type { CursorWithOptions, InstanceMeta, TrackPoint } from '../types';
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

export function follow(config: CursorWithOptions['follow']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.follow = undefined;
      this.off('mousemove', { name: USEABLE_USE_FN_NAMES_SYMBOLS.follow });
      this.computeCurrentPoint = null;
      subLoopStop();
      return;
    }
    this.options.follow = config;
    fillDefaultFollow(this.options.follow!);
    subLoopId = requestAnimationFrame(subLoop);
    this.on('mousemove', (e: MouseEvent) => {
      if (this.options.follow?.type === 'track') {
        trackPoints.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      }
    });
    this.computeCurrentPoint = (t: number) => {
      const { follow } = this.options as Required<CursorWithOptions>;
      const r = (fps / BASE_FRAME_RATE) || 1;
      const type = follow.type;
      if (type === 'gap') return gapLoop([this.currentPoint, this.targetPoint], follow.distance! / r);
      if (type === 'time') return timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio! / r);
      if (type === 'track') return trackLoop(trackPoints, this.currentPoint, t, follow.delay!);
      if (type === 'spring') {
        return springLoop(
          [this.currentPoint, this.targetPoint],
          follow.stiffness! / r,
          follow.damping!,
        );
      }
      return this.currentPoint;
    };
  }
  return {
    name: USEABLE_USE_FN_NAMES_SYMBOLS.follow,
    execute,
  };
}
