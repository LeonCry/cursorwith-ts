import type {
  CursorWithOptions,
  EventNames,
  InstanceMeta,
  ListenerFn,
  StopUseFn,
  UseFn,
} from '../types';
import { isNameLegal } from '../use';
import {
  debounce,
  fillDefaultStyle,
  handleDealError,
  listenerUnWrapper,
  listenerWrapper,
  notNone,
  throwError,
} from '../utils';
import { canvasCreator } from './creator';
import {
  imageDrawer,
  innerCircleDrawer,
} from './draw';

class CreateCursorWith {
  private clientWidth: InstanceMeta['clientWidth'] = document.documentElement.clientWidth;
  private clientHeight: InstanceMeta['clientHeight'] = document.documentElement.clientHeight;
  private currentPoint: InstanceMeta['currentPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private targetPoint: InstanceMeta['targetPoint'] = { x: this.clientWidth / 2, y: this.clientHeight / 2 };
  private loopId: InstanceMeta['loopId'] = null;
  private isDrawCircle: InstanceMeta['isDrawCircle'] = true;
  private isOnHoverTarget: InstanceMeta['isOnHoverTarget'] = false;
  private useFns: InstanceMeta['useFns'] = new Map();
  private eventListeners: InstanceMeta['eventListeners'] = new Map();
  private eventResult: InstanceMeta['eventResult'] = new Map();
  private options: InstanceMeta['options'];
  private canvas: InstanceMeta['canvas'];
  private ctx: InstanceMeta['ctx'];
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
    const handle = (f: UseFn) => {
      const { name, execute } = f;
      if (!isNameLegal(name)) throwError(`The use function name ${String(name)} is not legal.`);
      this.useFns.set(name, execute);
      execute.call(this as InstanceMeta, true);
    };
    const fns = Array.isArray(fn) ? fn : [fn];
    fns.forEach(handle);
  }

  // 卸载插件
  public stopUse(fn: StopUseFn | StopUseFn[]) {
    const handle = (f: StopUseFn) => {
      const { name, execute } = f();
      if (!isNameLegal(name)) throwError(`The use function name ${String(name)} is not legal.`);
      if (execute) {
        execute.call(this as InstanceMeta, false);
      }
      this.useFns.delete(name);
    };
    const fns = Array.isArray(fn) ? fn : [fn];
    fns.forEach(handle);
  }

  // 事件注册
  public on(eventName: EventNames, fn: ListenerFn, uniqueId?: keyof any) {
    if (!this.eventListeners.get(eventName)) {
      this.eventListeners.set(eventName, new Map());
    }
    this.eventListeners.get(eventName)!.set(uniqueId || fn.name, fn);
  }

  // 事件注销
  public off(eventName: EventNames, fn: ListenerFn | null, uniqueId?: keyof any) {
    if (this.eventListeners.has(eventName)) {
      this.eventListeners.get(eventName)!.delete(uniqueId || fn?.name || '');
    }
  }

  // 获取事件结果
  public getEventResult(eventName: EventNames, id: keyof any) {
    return (this.eventResult.get(eventName) || []).find(item => item?.id === id);
  }

  // 执行事件并收集结果
  private doEvent(eventName: EventNames, e?: any) {
    this.eventResult.set(eventName, [...this.eventListeners.get(eventName) || []]?.map(([_, fn]) => fn(e)));
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
      this.doEvent('mousemove', e);
    }, 'mousemove'));
    window.addEventListener('mousedown', listenerWrapper((e) => {
      this.doEvent('mousedown', e);
    }, 'mousedown'));
    window.addEventListener('mouseup', listenerWrapper((e) => {
      this.doEvent('mouseup', e);
    }, 'mouseup'));
    window.addEventListener('wheel', listenerWrapper((e) => {
      this.doEvent('mousewheel', e);
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
    if (!this.isDrawCircle || this.isOnHoverTarget) return;
    const { img } = this.options.style;
    innerCircleDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
    if (img) {
      imageDrawer(this.ctx, this.currentPoint, this.options);
    }
  }

  // 主循环
  private loop = (t: number) => {
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    this.doEvent('loopBeforeDraw', t);
    this.drawCircle();
    this.doEvent('loopAfterDraw', t);
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
