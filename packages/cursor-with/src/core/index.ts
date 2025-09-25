import type { CursorWithOptions, Point } from '../types';
import { debounce, throttle } from 'radash';
import { listenerUnWrapper, listenerWrapper, notNone } from '../utils';
import { canvasCreator } from './creator';
import { imageDrawer, innerCircleDrawer, outerCircleDrawer } from './draw';
import { gapLoop, timeLoop } from './loops';
import { handleDealDefault, handleDealError } from './pre-check-fill';

class CreateCursorWith {
  options: CursorWithOptions;
  private TRACK_DELAY = 0;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clientWidth: number;
  private clientHeight: number;
  private currentPoint: Point;
  private targetPoint: Point;
  private loopId: number | null;
  constructor(options: CursorWithOptions) {
    handleDealDefault(options);
    handleDealError(options);
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.currentPoint = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
    this.targetPoint = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
    this.loopId = null;
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
    const { radius, color, borderWidth, borderColor, img } = this.options.style;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    if (borderWidth) {
      outerCircleDrawer(this.ctx, { x, y }, { radius, borderWidth, borderColor });
    }
    innerCircleDrawer(this.ctx, { x, y }, { radius, color });
    if (img) {
      imageDrawer(this.ctx, { x, y }, { radius, img });
    }
  }

  private loop = () => {
    const follow = this.options.follow!;
    const type = follow.type;
    if (type === 'gap') this.currentPoint = gapLoop([this.currentPoint, this.targetPoint], follow.distance!);
    if (type === 'time') this.currentPoint = timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio!);
    const { x: tx, y: ty } = this.targetPoint;
    const { x: cx, y: cy } = this.currentPoint;
    if (tx !== cx || ty !== cy) {
      this.drawCircle(this.currentPoint);
    }
    requestAnimationFrame(this.loop);
  };

  private init() {
    window.addEventListener('mousemove', listenerWrapper(throttle(
      { interval: this.TRACK_DELAY },
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.targetPoint = { x: clientX, y: clientY };
      },
    ), 'mousemove'));
    window.addEventListener('resize', listenerWrapper(debounce(
      { delay: 300 },
      () => {
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
        this.canvas.width = this.clientWidth;
        this.canvas.height = this.clientHeight;
      },
    ), 'resize'));
    this.loopId = requestAnimationFrame(this.loop);
  }

  public pause() {
    if (!notNone(this.loopId)) return;
    cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }

  public resume() {
    if (notNone(this.loopId)) return;
    this.loopId = requestAnimationFrame(this.loop);
  }

  public destroy() {
    this.pause();
    window.removeEventListener('resize', listenerUnWrapper('resize'));
    if (this.canvas) {
      window.removeEventListener('mousemove', listenerUnWrapper('mousemove'));
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export { CreateCursorWith };
