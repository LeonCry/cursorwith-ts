import type {
  AnyFn,
  CursorWithOptions,
  Point,
  TargetBound,
  TrackPoint,
  UseFn,
} from '../types';
import {
  debounce,
  getFPS,
  listenerUnWrapper,
  listenerWrapper,
  notNone,
  voidNothing,
} from '../utils';
import { fillDefaultStyle, handleDealError } from '../utils/pre-check-fill';
import { clickEffectRestoreCollector, clickEffectTriggerCollector } from './click-effect-core';
import { canvasCreator } from './creator';
import {
  imageDrawer,
  innerCircleDrawer,
  nativeCursorDrawer,
  tailDrawer,
} from './draw';
import { circleToRect, getActiveTarget, rectToCircle } from './hover-effect-core';

export interface Meta {
  FPS: number
  options: CursorWithOptions
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  clientWidth: number
  clientHeight: number
  currentPoint: Point
  targetPoint: Point
  trackPoints: TrackPoint[]
  loopId: number | null
  subLoopId: number | null
  targetElement: HTMLElement | null
  targetStyle: TargetBound | null
  oldTargetElement: HTMLElement | null
  oldTargetStyle: TargetBound | null
  clickEffectTrigger: (() => void) | null
  clickEffectRestore: (() => void) | null
  computeCurrentPoint: ((t: number) => Point) | null
  useFns: Map<symbol | string, AnyFn>
  onMouseMoveFns: Map<symbol | string, AnyFn>
}
export type InstanceMeta = {
  [K in keyof CreateCursorWith]: CreateCursorWith[K]
} & Meta;
class CreateCursorWith {
  private FPS: Meta['FPS'] = 0;
  private clientWidth: Meta['clientWidth'] = document.documentElement.clientWidth;
  private clientHeight: Meta['clientHeight'] = document.documentElement.clientHeight;
  private currentPoint: Meta['currentPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private targetPoint: Meta['targetPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private trackPoints: Meta['trackPoints'] = [];
  private loopId: Meta['loopId'] = null;
  private subLoopId: Meta['subLoopId'] = null;
  private targetElement: Meta['targetElement'] = null;
  private oldTargetElement: Meta['oldTargetElement'] = null;
  private targetStyle: Meta['targetStyle'] = null;
  private oldTargetStyle: Meta['oldTargetStyle'] = null;
  private clickEffectTrigger: Meta['clickEffectTrigger'] = null;
  private clickEffectRestore: Meta['clickEffectRestore'] = null;
  // 计算主要圆当前点位置
  private computeCurrentPoint: Meta['computeCurrentPoint'] = null;
  private useFns: Meta['useFns'] = new Map();
  private onMouseMoveFns: Meta['onMouseMoveFns'] = new Map();
  private options: Meta['options'];
  private canvas: Meta['canvas'];
  private ctx: Meta['ctx'];
  constructor(styleOptions: CursorWithOptions['style']) {
    handleDealError();
    this.options = { style: styleOptions };
    fillDefaultStyle(this.options.style);
    this.canvas = this.create();
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
    // 跨文件变量
    voidNothing(this.FPS, this.trackPoints);
  }

  // 使用插件
  public use(fn: UseFn | UseFn[]) {
    if (Array.isArray(fn)) {
      fn.forEach((f) => {
        const { name, execute } = f;
        this.useFns.set(name, execute);
        execute.call(this, true);
      });
    }
    else {
      const { name, execute } = fn;
      this.useFns.set(name, execute);
      execute.call(this, true);
    }
  }

  // 卸载插件
  public unUse(fn: UseFn) {
    const execute = this.useFns.get(fn.name);
    if (execute) {
      execute.call(this, false);
    }
    this.useFns.delete(fn.name);
  }

  // 注册鼠标移动事件
  public onMouseMove(fn: AnyFn) {
    this.onMouseMoveFns.set(fn.name, fn);
  }

  // 卸载鼠标移动事件
  public unOnMouseMove(fn: AnyFn) {
    this.onMouseMoveFns.delete(fn.name);
  }

  // 创建canvas
  private create() {
    return canvasCreator(this.clientWidth, this.clientHeight);
  }

  // 初始化
  private init() {
    window.addEventListener('mousemove', listenerWrapper((e: MouseEvent) => {
      const { clientX, clientY } = e;
      this.targetPoint = { x: clientX, y: clientY };
      this.onMouseMoveFns.forEach(fn => fn(e));
      // const { hoverEffect, follow } = this.options;
      // if (hoverEffect?.active) {
      //   [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
      // }
      // if (follow?.type === 'track') {
      //   this.trackPoints.push({ x: clientX, y: clientY, t: performance.now() });
      // }
    }, 'mousemove'));
    window.addEventListener('mousedown', listenerWrapper(() => {
      const { clickEffect } = this.options;
      this.clickEffectTrigger = clickEffect ? clickEffectTriggerCollector(this.options) : null;
      this.clickEffectRestore = null;
    }, 'mousedown'));
    window.addEventListener('mouseup', listenerWrapper(() => {
      const { clickEffect } = this.options;
      this.clickEffectRestore = clickEffect ? clickEffectRestoreCollector(this.options) : null;
      this.clickEffectTrigger = null;
    }, 'mouseup'));
    window.addEventListener('wheel', listenerWrapper((e) => {
      const { hoverEffect } = this.options;
      if (hoverEffect?.active) {
        [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
      }
    }, 'wheel'));
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
    this.subLoopId = requestAnimationFrame(this.subLoop);
  }

  // 绘制cursor主要圆
  private drawCircle() {
    const { img } = this.options.style;
    innerCircleDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
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
      () => {
        this.oldTargetElement = null;
        this.drawCircle();
      },
    );
  }

  // 主循环
  private loop = (t: number) => {
    const { tail, nativeCursor } = this.options;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    const { x: tx, y: ty } = this.targetPoint;
    const { x: cx, y: cy } = this.currentPoint;
    if (tx !== cx || ty !== cy) {
      this.currentPoint = this.computeCurrentPoint?.(t) || this.currentPoint;
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
    if (tail?.active && !this.targetElement) {
      this.drawTail();
    }
    if (nativeCursor?.show) this.drawNativeCursor();
    if (this.clickEffectTrigger) this.clickEffectTrigger();
    if (this.clickEffectRestore) this.clickEffectRestore();
    this.loopId = requestAnimationFrame(this.loop);
  };

  // 副循环
  private subLoop = () => {
    this.FPS = getFPS();
    this.subLoopId = requestAnimationFrame(this.subLoop);
  };

  private subLoopStop() {
    if (!notNone(this.subLoopId)) return;
    cancelAnimationFrame(this.subLoopId);
    this.subLoopId = null;
  }

  // 获取当前canvas元素
  public getCanvas() {
    return this.canvas;
  }

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

  // 设置选项
  public setOptions(options: CursorWithOptions) {
    this.options = { ...this.options, ...options };
  }

  // 获取当前选项
  public getOptions() {
    return this.options;
  }

  // 获取当前cursor主要圆位置
  public getCurrentPoint() {
    return this.currentPoint;
  }

  // 获取当前鼠标位置
  public getTargetPoint() {
    return this.targetPoint;
  }

  // 销毁实例
  public destroy() {
    this.pause();
    this.subLoopStop();
    if (this.canvas) {
      window.removeEventListener('resize', listenerUnWrapper('resize'));
      window.removeEventListener('mousemove', listenerUnWrapper('mousemove'));
      window.removeEventListener('mousedown', listenerUnWrapper('mousedown'));
      window.removeEventListener('mouseup', listenerUnWrapper('mouseup'));
      window.removeEventListener('wheel', listenerUnWrapper('wheel'));
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export { CreateCursorWith };
