import type { CursorWithOptions, Point, TargetBound, TrackPoint } from '../types';
import { debounce, throttle } from 'radash';
import { listenerUnWrapper, listenerWrapper, notNone } from '../utils';
import { canvasCreator } from './creator';
import {
  imageDrawer,
  innerCircleDrawer,
  nativeCursorDrawer,
  outerCircleDrawer,
  tailDrawer,
} from './draw';
import { circleToRect, getActiveTarget, rectToCircle } from './hover-effect';
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
  private oldTargetElement: HTMLElement | null;
  private targetStyle: TargetBound | null;
  private oldTargetStyle: TargetBound | null;
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
    this.oldTargetElement = null;
    this.targetStyle = null;
    this.oldTargetStyle = null;
    this.options = options;
    this.canvas = this.create();
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  // 创建canvas
  private create() {
    return canvasCreator(this.clientWidth, this.clientHeight);
  }

  // 初始化
  private init() {
    window.addEventListener('mousemove', listenerWrapper(throttle(
      { interval: this.TRACK_DELAY },
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.targetPoint = { x: clientX, y: clientY };
        const { hoverEffect, follow } = this.options;
        if (hoverEffect?.active) {
          [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
        }
        if (follow?.type === 'track') {
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

  // 绘制cursor主要圆
  private drawCircle() {
    const { borderWidth, img } = this.options.style;
    innerCircleDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
    if (borderWidth) {
      outerCircleDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
    }
    if (img) {
      imageDrawer(this.ctx, this.currentPoint, this.options);
    }
  }

  // 绘制原生cursor替代圆
  private drawNativeCursor() {
    nativeCursorDrawer(this.ctx, this.targetPoint, this.options);
  }

  // 绘制拖尾
  private drawTail() {
    tailDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
  }

  // 绘制circle到rect
  private drawCircleToRect() {
    circleToRect(
      this.ctx,
      this.options,
      this.targetStyle!,
      this.targetElement!,
      this.currentPoint,
    );
  }

  private drawRectToCircle() {
    rectToCircle(
      this.ctx,
      this.options,
      this.oldTargetStyle!,
      this.oldTargetElement!,
      this.currentPoint,
      () => this.oldTargetElement = null,
    );
  }

  // 计算cursor主要圆当前位置
  private computeCurrentPoint(t: number) {
    const { follow } = this.options as Required<CursorWithOptions>;
    const type = follow.type;
    if (type === 'gap') return gapLoop([this.currentPoint, this.targetPoint], follow.distance!);
    if (type === 'time') return timeLoop([this.currentPoint, this.targetPoint], follow.timeRatio!);
    if (type === 'track') return trackLoop(this.trackPoints, this.currentPoint, t, follow.delay!);
    if (type === 'spring') {
      return springLoop(
        [this.currentPoint, this.targetPoint],
        follow.stiffness!,
        follow.damping!,
      );
    }
    return this.currentPoint;
  }

  // 主循环
  private loop = (t: number) => {
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    const { tail, nativeCursor } = this.options;
    if (nativeCursor?.show) this.drawNativeCursor();
    const { x: tx, y: ty } = this.targetPoint;
    const { x: cx, y: cy } = this.currentPoint;
    if (tx !== cx || ty !== cy) {
      this.currentPoint = this.computeCurrentPoint(t);
    }
    if (this.targetElement && this.targetStyle) {
      this.oldTargetElement = this.targetElement;
      this.oldTargetStyle = this.targetStyle;
      this.drawCircleToRect();
    }
    else if (!this.targetElement && this.oldTargetElement) {
      this.drawRectToCircle();
    }
    else {
      this.drawCircle();
    }
    if (tail?.show && !this.targetElement) {
      this.drawTail();
    }
    this.loopId = requestAnimationFrame(this.loop);
  };

  // 暂停绘制
  public pause() {
    if (!notNone(this.loopId)) return;
    cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }

  // 恢复绘制
  public resume() {
    if (notNone(this.loopId)) return;
    this.loopId = requestAnimationFrame(this.loop);
  }

  // 获取当前cursor主要圆位置
  public getCurrentPoint() {
    return this.currentPoint;
  }

  // 设置样式
  public setStyle(style: CursorWithOptions['style']) {
    this.options.style = { ...this.options.style, ...style };
  }

  // 设置跟随模式
  public setFollow(follow: CursorWithOptions['follow']) {
    this.options.follow = { ...this.options.follow!, ...follow };
  }

  // 销毁实例
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
