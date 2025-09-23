import type { CursorWithOptions, Point } from '../types';
import { listenerUnWrapper, listenerWrapper, throttle } from '../utils';
import { canvasCreator } from './creator';
import { innerCircleDrawer, outerCircleDrawer } from './draw';
import { gapLoop, timeLoop } from './loops';
import { handleDealDefault, handleDealError } from './pre-check-fill';

class CreateCursorWith {
  options: CursorWithOptions;
  private TRACK_DELAY = 0;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clientWidth = document.documentElement.clientWidth;
  private clientHeight = document.documentElement.clientHeight;
  private currentPoint: Point = { x: 0, y: 0 };
  private targetPoint: Point = { x: 0, y: 0 };
  private loopId: number | null = null;
  constructor(options: CursorWithOptions) {
    handleDealDefault(options);
    handleDealError(options);
    this.options = options;
    this.canvas = this.create();
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private create() {
    return canvasCreator(this.clientWidth, this.clientHeight);
  }

  private drawCircle(point: Point) {
    const { x, y } = point;
    const { radius, color, borderWidth, borderColor } = this.options.style;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    if (borderWidth) {
      outerCircleDrawer(this.ctx, { x, y }, { radius, borderWidth, borderColor });
    }
    innerCircleDrawer(this.ctx, { x, y }, { radius, color });
  }

  private loop = () => {
    const follow = this.options.follow!;
    const type = follow.type;
    let currentPoint = this.currentPoint;
    if (type === 'gap') currentPoint = gapLoop([this.currentPoint, this.targetPoint], follow.distance!);
    if (type === 'time') currentPoint = timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio!);
    this.drawCircle(currentPoint);
    this.currentPoint = currentPoint;
    this.loopId = requestAnimationFrame(this.loop);
  };

  private init() {
    window.addEventListener('mousemove', listenerWrapper(throttle(
      { interval: this.TRACK_DELAY },
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.targetPoint = { x: clientX, y: clientY };
      },
    ), 'mousemove'));
    this.loopId = requestAnimationFrame(this.loop);
  }

  public destroy() {
    if (this.canvas) {
      window.removeEventListener('mousemove', listenerUnWrapper('mousemove'));
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = null;
    }
  }
}

export { CreateCursorWith };
