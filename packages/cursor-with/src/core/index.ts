import type { CursorWithOptions, Point, TargetBound, TrackPoint } from '../types';
import { debounce, throttle } from 'radash';
import { getFPS, listenerUnWrapper, listenerWrapper, notNone } from '../utils';
import { canvasCreator } from './creator';
import {
  circleToRect,
  imageDrawer,
  innerCircleDrawer,
  // innerRectDrawer,
  outerCircleDrawer,
  // outerRectDrawer,
  tailDrawer,
} from './draw';
import { getActiveTarget } from './hover-effect';
import { gapLoop, springLoop, timeLoop, trackLoop } from './loops';
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
  private trackPoints: TrackPoint[];
  private loopId: number | null;
  private targetElement: HTMLElement | null;
  private targetStyle: TargetBound | null;
  private FPS: number;
  constructor(options: CursorWithOptions) {
    handleDealDefault(options);
    handleDealError(options);
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.currentPoint = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
    this.targetPoint = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
    this.trackPoints = [];
    this.loopId = null;
    this.targetElement = null;
    this.targetStyle = null;
    this.FPS = 0;
    this.options = options;
    this.canvas = this.create();
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private create() {
    return canvasCreator(this.clientWidth, this.clientHeight);
  }

  private init() {
    window.addEventListener('mousemove', listenerWrapper(throttle(
      { interval: this.TRACK_DELAY },
      (e: MouseEvent) => {
        const { hoverEffect } = this.options;
        if (hoverEffect?.active) {
          [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
        }
        const { clientX, clientY } = e;
        this.targetPoint = { x: clientX, y: clientY };
        if (this.options.follow?.type === 'track') {
          this.trackPoints.push({ x: clientX, y: clientY, t: performance.now() });
        }
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

  private drawCircle(point: Point) {
    if (this.options.style.borderWidth) {
      outerCircleDrawer(this.ctx, point, this.options.style);
    }
    innerCircleDrawer(this.ctx, point, this.options.style);
    if (this.options.style.img) {
      imageDrawer(this.ctx, point, this.options.style);
    }
  }

  private drawRect(point: Point) {
    circleToRect(
      this.ctx,
      this.FPS,
      this.options.style,
      this.targetStyle!,
      point,
      this.options.hoverEffect!.padding!,
      this.options.hoverEffect!.duration!,
    );
    // outerRectDrawer(this.ctx, point, this.options.style, this.targetStyle!, this.options.hoverEffect!.padding);
    // innerRectDrawer(this.ctx, point, this.options.style, this.targetStyle!, this.options.hoverEffect!.padding);
  }

  private loop = (t: number) => {
    this.FPS = getFPS(t);
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    const follow = this.options.follow!;
    const type = follow.type;
    const { x: tx, y: ty } = this.targetPoint;
    const { x: cx, y: cy } = this.currentPoint;
    if (tx !== cx || ty !== cy) {
      if (type === 'gap') this.currentPoint = gapLoop([this.currentPoint, this.targetPoint], follow.distance!);
      if (type === 'time') this.currentPoint = timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio!);
      if (type === 'track') this.currentPoint = trackLoop(this.trackPoints, this.currentPoint, t, follow.delay!);
      if (type === 'spring') {
        this.currentPoint = springLoop(
          [this.currentPoint, this.targetPoint],
          follow.stiffness!,
          follow.damping!,
        );
      }
    }
    if (this.targetElement && this.targetStyle) {
      this.drawRect(this.targetPoint);
    }
    else {
      this.drawCircle(this.currentPoint);
    }
    if (this.options.tail?.show) {
      tailDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options.tail!, this.options.style.radius);
    }
    this.loopId = requestAnimationFrame(this.loop);
  };

  public pause() {
    if (!notNone(this.loopId)) return;
    cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }

  public resume() {
    if (notNone(this.loopId)) return;
    this.loopId = requestAnimationFrame(this.loop);
  }

  public getCurrentPoint() {
    return this.currentPoint;
  }

  public setStyle(style: CursorWithOptions['style']) {
    this.options.style = { ...this.options.style, ...style };
  }

  public setFollow(follow: CursorWithOptions['follow']) {
    this.options.follow = { ...this.options.follow!, ...follow };
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
