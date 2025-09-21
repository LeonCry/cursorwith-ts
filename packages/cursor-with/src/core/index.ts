import type { CursorWithOptions, Point } from '../types';
import throttle from '../utils/tiny-throttle';
import { gapLoop, timeLoop } from './loops';
import { handleDealDefault, handleDealError } from './pre-check';

class CreateCursorWith {
  options: CursorWithOptions;
  private TRACK_DELAY = 0;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clientWidth = document.documentElement.clientWidth;
  private clientHeight = document.documentElement.clientHeight;
  private currentPoint: Point = { x: 0, y: 0 };
  private targetPoint: Point = { x: 0, y: 0 };
  private throttleHandleMouseMove: Parameters<typeof throttle>[1];
  private loopId: number | null = null;
  constructor(options: CursorWithOptions) {
    handleDealError(options);
    handleDealDefault(options);
    this.options = options;
    this.throttleHandleMouseMove = throttle(
      { interval: this.TRACK_DELAY },
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        this.targetPoint = { x: clientX, y: clientY };
      },
    );
    // 创建canvas
    this.canvas = this.CreateCanvas();
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private CreateCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.clientWidth;
    canvas.height = this.clientHeight;
    canvas.style.setProperty('position', 'fixed', 'important');
    canvas.style.setProperty('top', '0px', 'important');
    canvas.style.setProperty('left', '0px', 'important');
    canvas.style.setProperty('z-index', '9999', 'important');
    canvas.style.setProperty('pointer-events', 'none', 'important');
    canvas.style.setProperty('background', 'rgba(0,0,255,0.1)', 'important');
    document.body.appendChild(canvas);
    return canvas;
  }

  private drawCircle(point: Point) {
    const { x, y } = point;
    const { radius, color } = this.options;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private loop = () => {
    const type = this.options.type!;
    let currentPoint = this.currentPoint;
    if (type === 'gap') currentPoint = gapLoop([this.currentPoint, this.targetPoint], this.options as CursorWithOptions & { type: 'gap' })!;
    if (type === 'time') currentPoint = timeLoop([this.currentPoint, this.targetPoint], this.options as CursorWithOptions & { type: 'time' })!;
    this.drawCircle(currentPoint);
    this.currentPoint = currentPoint;
    this.loopId = requestAnimationFrame(this.loop);
  };

  private init() {
    window.addEventListener('mousemove', this.throttleHandleMouseMove);
    this.drawCircle({ x: 100, y: 100 });
    this.loopId = requestAnimationFrame(this.loop);
  }

  public destroy() {
    if (this.canvas) {
      window.removeEventListener('mousemove', this.throttleHandleMouseMove);
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
