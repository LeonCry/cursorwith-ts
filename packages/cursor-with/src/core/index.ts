import type {
  CursorWithOptions,
  EventNames,
  InstanceMeta,
  ListenerFn,
  UseFn,
} from '../types';
import { isNameLegal } from '../use';
import {
  debounce,
  deepClone,
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
  private container: InstanceMeta['container'];
  private containerRect: InstanceMeta['containerRect'];
  private currentPoint: InstanceMeta['currentPoint'];
  private targetPoint: InstanceMeta['targetPoint'];
  private loopId: InstanceMeta['loopId'] = null;
  private isDrawCircle: InstanceMeta['isDrawCircle'] = true;
  private isOnHoverTarget: InstanceMeta['isOnHoverTarget'] = false;
  private useFns: InstanceMeta['useFns'] = new Map();
  private eventListeners: InstanceMeta['eventListeners'] = new Map();
  private eventResult: InstanceMeta['eventResult'] = new Map();
  private options: InstanceMeta['options'];
  private rowOptions: InstanceMeta['options'];
  private canvas: InstanceMeta['canvas'];
  private ctx: InstanceMeta['ctx'];
  constructor(options: {
    style: CursorWithOptions['style']
    container?: CursorWithOptions['container']
  }) {
    const { style: styleConfig, container } = options;
    handleDealError();
    this.container = container || document.body;
    // 设置currentPoint,targetPoint为中间位置
    this.containerRect = this.container.getBoundingClientRect();
    this.currentPoint = {
      x: this.containerRect.width / 2,
      y: this.containerRect.height / 2,
    };
    this.targetPoint = {
      x: this.containerRect.width / 2,
      y: this.containerRect.height / 2,
    };
    this.rowOptions = { style: styleConfig };
    this.options = new Proxy(this.rowOptions, {
      set: (target, key, val, receiver) => {
        this.doEvent('optionSetter', { target, key, val });
        return Reflect.set(target, key, val, receiver);
      },
      get: (target, key, receiver) => {
        this.doEvent('optionGetter', { target, key });
        return Reflect.get(target, key, receiver);
      },
    });
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
      if (this.useFns.has(name)) this.stopUse(f);
      this.useFns.set(name, execute);
      execute.call(this as InstanceMeta, true);
    };
    const fns = Array.isArray(fn) ? fn : [fn];
    fns.forEach(handle);
  }

  // 卸载插件
  public stopUse(fn: UseFn | UseFn[]) {
    const handle = (f: UseFn) => {
      const { name, execute } = f;
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
    return canvasCreator(this.containerRect, this.container);
  }

  private removeEventListener() {
    window.removeEventListener('resize', listenerUnWrapper('resize'));
    this.container.removeEventListener('mousemove', listenerUnWrapper('mousemove'));
    this.container.removeEventListener('mousedown', listenerUnWrapper('mousedown'));
    this.container.removeEventListener('mouseup', listenerUnWrapper('mouseup'));
    this.container.removeEventListener('wheel', listenerUnWrapper('wheel'));
  }

  // 初始化
  private init() {
    const addEventListener = () => {
      this.container.addEventListener('mousemove', listenerWrapper((e) => {
        const { clientX, clientY } = e;
        const { left, top } = this.containerRect;
        this.targetPoint = { x: clientX - left, y: clientY - top };
        this.doEvent('mousemove', e);
      }, 'mousemove'));
      this.container.addEventListener('mousedown', listenerWrapper((e) => {
        this.doEvent('mousedown', e);
      }, 'mousedown'));
      this.container.addEventListener('mouseup', listenerWrapper((e) => {
        this.doEvent('mouseup', e);
      }, 'mouseup'));
      this.container.addEventListener('wheel', listenerWrapper((e) => {
        this.updateBound();
        this.doEvent('mousewheel', e);
      }, 'wheel'));
      window.addEventListener('resize', listenerWrapper(debounce(
        { delay: 300 },
        () => {
          this.updateBound();
        },
      ), 'resize'));
    };
    this.container.addEventListener('mouseenter', listenerWrapper(() => {
      this.updateBound();
      addEventListener();
    }, 'mouseenter'));
    this.container.addEventListener('mouseleave', listenerWrapper(() => {
      this.removeEventListener();
    }, 'mouseleave'));
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
    this.ctx.clearRect(0, 0, this.containerRect.width, this.containerRect.height);
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
    const o = deepClone(options);
    Object.keys(o).forEach((key) => {
      const k = key as keyof CursorWithOptions;
      // tslint:disable-next-line:no-any
      this.options[k] = o[k] as any;
    });
  }

  // 获取当前选项
  public getOptions() {
    return this.rowOptions;
  }

  // 获取当前cursor主要圆位置
  public getCurrentPoint() {
    return this.currentPoint;
  }

  // 获取当前鼠标位置
  public getTargetPoint() {
    return this.targetPoint;
  }

  // 更新canvas大小
  public updateBound() {
    this.containerRect = this.container.getBoundingClientRect();
    this.canvas.width = this.containerRect.width;
    this.canvas.height = this.containerRect.height;
  }

  // 销毁实例
  public destroy() {
    this.pause();
    this.stopUse(Array.from(this.useFns.values()));
    if (this.canvas) {
      this.removeEventListener();
      this.container.removeEventListener('mouseenter', listenerUnWrapper('mouseenter'));
      this.container.removeEventListener('mouseleave', listenerUnWrapper('mouseleave'));
    }
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export { CreateCursorWith };
