import type {
  AnyFn,
  CursorWithOptions,
  Point,
  StopUseFn,
  TargetBound,
  TrackPoint,
  UseFn,
} from '../types';
import { isNameLegal } from '../use';
import {
  debounce,
  getFPS,
  listenerUnWrapper,
  listenerWrapper,
  notNone,
  throwError,
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
  isDrawCircle: boolean
  targetElement: HTMLElement | null
  targetStyle: TargetBound | null
  oldTargetElement: HTMLElement | null
  oldTargetStyle: TargetBound | null
  clickEffectTrigger: (() => void) | null
  clickEffectRestore: (() => void) | null
  computeCurrentPoint: ((t: number) => Point) | null
  useFns: Map<symbol | string, AnyFn>
  onMouseMoveFns: Map<symbol | string, AnyFn>
  onMouseDownFns: Map<symbol | string, AnyFn>
  onMouseUpFns: Map<symbol | string, AnyFn>
  onMouseWheelFns: Map<symbol | string, AnyFn>
  onLoopBeforeDrawFns: Map<symbol | string, AnyFn>
  onLoopAfterDrawFns: Map<symbol | string, AnyFn>
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
  private isDrawCircle: boolean = true;
  private targetElement: Meta['targetElement'] = null;
  private oldTargetElement: Meta['oldTargetElement'] = null;
  private targetStyle: Meta['targetStyle'] = null;
  private oldTargetStyle: Meta['oldTargetStyle'] = null;
  private clickEffectTrigger: Meta['clickEffectTrigger'] = null;
  private clickEffectRestore: Meta['clickEffectRestore'] = null;
  private computeCurrentPoint: Meta['computeCurrentPoint'] = null;
  private useFns: Meta['useFns'] = new Map();
  private onMouseMoveFns: Meta['onMouseMoveFns'] = new Map();
  private onMouseDownFns: Meta['onMouseDownFns'] = new Map();
  private onMouseUpFns: Meta['onMouseUpFns'] = new Map();
  private onMouseWheelFns: Meta['onMouseWheelFns'] = new Map();
  private onLoopBeforeDrawFns: Meta['onLoopBeforeDrawFns'] = new Map();
  private onLoopAfterDrawFns: Meta['onLoopAfterDrawFns'] = new Map();
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
    voidNothing(this.FPS, this.trackPoints, this.oldTargetElement, this.oldTargetStyle, this.targetStyle);
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

  // 注册鼠标移动事件
  public onMouseMove(fn: AnyFn) {
    this.onMouseMoveFns.set(fn.name, fn);
  }

  // 卸载鼠标移动事件
  public offMouseMove(fn: AnyFn | { name: symbol }) {
    this.onMouseMoveFns.delete(fn.name);
  }

  // 注册鼠标按下事件
  public onMouseDown(fn: AnyFn) {
    this.onMouseDownFns.set(fn.name, fn);
  }

  // 卸载鼠标按下事件
  public offMouseDown(fn: AnyFn | { name: symbol }) {
    this.onMouseDownFns.delete(fn.name);
  }

  // 注册鼠标抬起事件
  public onMouseUp(fn: AnyFn) {
    this.onMouseUpFns.set(fn.name, fn);
  }

  // 卸载鼠标抬起事件
  public offMouseUp(fn: AnyFn | { name: symbol }) {
    this.onMouseUpFns.delete(fn.name);
  }

  // 注册鼠标滚轮事件
  public onMouseWheel(fn: AnyFn) {
    this.onMouseWheelFns.set(fn.name, fn);
  }

  // 卸载鼠标滚轮事件
  public offMouseWheel(fn: AnyFn | { name: symbol }) {
    this.onMouseWheelFns.delete(fn.name);
  }

  // 注册loop事件(在绘制cursor主要圆之前调用)
  public onLoopBeforeDraw(fn: AnyFn) {
    this.onLoopBeforeDrawFns.set(fn.name, fn);
  }

  // 注册loop事件(在绘制cursor主要圆之后调用)
  public onLoopAfterDraw(fn: AnyFn) {
    this.onLoopAfterDrawFns.set(fn.name, fn);
  }

  // 卸载loop事件
  public offLoop(fn: AnyFn | { name: symbol }) {
    this.onLoopBeforeDrawFns.delete(fn.name);
    this.onLoopAfterDrawFns.delete(fn.name);
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
      this.onMouseMoveFns.forEach(fn => fn(e));
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
      this.onMouseWheelFns.forEach(fn => fn(e));
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
    this.onLoopBeforeDrawFns.forEach(fn => fn());
    this.drawCircle();
    this.onLoopAfterDrawFns.forEach(fn => fn());
    if (tail && !this.targetElement) {
      this.drawTail();
    }
    if (nativeCursor) this.drawNativeCursor();
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
