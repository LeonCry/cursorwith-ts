import type {
  AnyFn,
  CursorWithOptions,
  Point,
  StopUseFn,
  UseFn,
} from '../types';
import { isNameLegal } from '../use';
import {
  debounce,
  listenerUnWrapper,
  listenerWrapper,
  notNone,
  throwError,
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

export type EventNames = 'mousemove' | 'mousedown' | 'mouseup' | 'mousewheel' | 'loopBeforeDraw' | 'loopAfterDraw';
export interface Meta {
  options: CursorWithOptions
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  clientWidth: number
  clientHeight: number
  currentPoint: Point
  targetPoint: Point
  loopId: number | null
  isDrawCircle: boolean
  clickEffectTrigger: (() => void) | null
  clickEffectRestore: (() => void) | null
  computeCurrentPoint: ((t: number) => Point) | null
  useFns: Map<symbol | string, AnyFn>
  eventListeners: Map<EventNames, Map<symbol | string, AnyFn>>
}
export type InstanceMeta = {
  [K in keyof CreateCursorWith]: CreateCursorWith[K]
} & Meta;
class CreateCursorWith {
  private clientWidth: Meta['clientWidth'] = document.documentElement.clientWidth;
  private clientHeight: Meta['clientHeight'] = document.documentElement.clientHeight;
  private currentPoint: Meta['currentPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private targetPoint: Meta['targetPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private loopId: Meta['loopId'] = null;
  private isDrawCircle: boolean = true;
  private clickEffectTrigger: Meta['clickEffectTrigger'] = null;
  private clickEffectRestore: Meta['clickEffectRestore'] = null;
  private computeCurrentPoint: Meta['computeCurrentPoint'] = null;
  private useFns: Meta['useFns'] = new Map();
  private eventListeners: Meta['eventListeners'] = new Map();
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
  }

  // 使用插件
  public use(fn: UseFn | UseFn[]) {
    if (Array.isArray(fn)) {
      fn.forEach((f) => {
        const { name, execute } = f;
        if (!isNameLegal(name)) throwError(`The use function name ${String(name)} is not legal.`);
        this.useFns.set(name, execute);
        execute.call(this, true);
      });
    }
    else {
      const { name, execute } = fn;
      if (!isNameLegal(name)) throwError(`The use function name ${String(name)} is not legal.`);
      this.useFns.set(name, execute);
      execute.call(this, true);
    }
  }

  // 卸载插件
  public stopUse(fn: StopUseFn) {
    const { name, execute } = fn();
    if (!isNameLegal(name)) throwError(`The use function name ${String(name)} is not legal.`);
    if (execute) {
      execute.call(this, false);
    }
    this.useFns.delete(name);
  }

  // 事件注册
  public on(eventName: EventNames, fn: AnyFn) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Map());
    }
    this.eventListeners.get(eventName)!.set(fn.name, fn);
  }

  // 事件注销
  public off(eventName: EventNames, fn: AnyFn | { name: symbol }) {
    if (this.eventListeners.has(eventName)) {
      this.eventListeners.get(eventName)!.delete(fn.name);
    }
  }

  // 创建canvas
  private create() {
    return canvasCreator(this.clientWidth, this.clientHeight);
  }

  // 初始化
  private init() {
    window.addEventListener('mousemove', listenerWrapper((e) => {
      const { clientX, clientY } = e;
      this.targetPoint = { x: clientX, y: clientY };
      this.eventListeners.get('mousemove')?.forEach(fn => fn(e));
    }, 'mousemove'));
    window.addEventListener('mousedown', listenerWrapper((e) => {
      const { clickEffect } = this.options;
      this.clickEffectTrigger = clickEffect ? clickEffectTriggerCollector(this.options) : null;
      this.clickEffectRestore = null;
      this.eventListeners.get('mousedown')?.forEach(fn => fn(e));
    }, 'mousedown'));
    window.addEventListener('mouseup', listenerWrapper((e) => {
      const { clickEffect } = this.options;
      this.clickEffectRestore = clickEffect ? clickEffectRestoreCollector(this.options) : null;
      this.clickEffectTrigger = null;
      this.eventListeners.get('mouseup')?.forEach(fn => fn(e));
    }, 'mouseup'));
    window.addEventListener('wheel', listenerWrapper((e) => {
      this.eventListeners.get('mousewheel')?.forEach(fn => fn(e));
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
  }

  // 绘制cursor主要圆
  private drawCircle() {
    if (!this.isDrawCircle) return;
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

  // 主循环
  private loop = (t: number) => {
    const { tail, nativeCursor } = this.options;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    const { x: tx, y: ty } = this.targetPoint;
    const { x: cx, y: cy } = this.currentPoint;
    if (tx !== cx || ty !== cy) {
      this.currentPoint = this.computeCurrentPoint?.(t) || this.currentPoint;
    }
    this.eventListeners.get('loopBeforeDraw')?.forEach(fn => fn());
    this.drawCircle();
    this.eventListeners.get('loopAfterDraw')?.forEach(fn => fn());
    if (tail && this.isDrawCircle) {
      this.drawTail();
    }
    if (nativeCursor) this.drawNativeCursor();
    if (this.clickEffectTrigger) this.clickEffectTrigger();
    if (this.clickEffectRestore) this.clickEffectRestore();
    this.loopId = requestAnimationFrame(this.loop);
  };

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
