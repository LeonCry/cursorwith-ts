import type { InstanceMeta } from '../core/index';
import type { CursorWithOptions } from '../types';
import { gapLoop, springLoop, timeLoop, trackLoop } from '../core/loops';
import { fillDefaultFollow } from '../utils/pre-check-fill';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用follow
const BASE_FRAME_RATE = 60;
export function follow(config: CursorWithOptions['follow']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.follow = undefined;
      this.offMouseMove({ name: USEABLE_USE_FN_NAMES_SYMBOLS.follow });
      this.computeCurrentPoint = null;
      return;
    }
    this.options.follow = config;
    fillDefaultFollow(this.options.follow!);
    this.onMouseMove((e: MouseEvent) => {
      if (this.options.follow?.type === 'track') {
        this.trackPoints.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      }
    });
    this.computeCurrentPoint = (t: number) => {
      const { follow } = this.options as Required<CursorWithOptions>;
      const r = (this.FPS / BASE_FRAME_RATE) || 1;
      const type = follow.type;
      if (type === 'gap') return gapLoop([this.currentPoint, this.targetPoint], follow.distance! / r);
      if (type === 'time') return timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio! / r);
      if (type === 'track') return trackLoop(this.trackPoints, this.currentPoint, t, follow.delay!);
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
