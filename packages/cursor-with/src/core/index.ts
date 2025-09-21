import type { CursorWithOptions } from '../types';
import throwError from '../utils/global-error';

class CreateCursorWith {
  options: CursorWithOptions;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clientWidth = document.documentElement.clientWidth;
  private clientHeight = document.documentElement.clientHeight;
  constructor(options: CursorWithOptions) {
    if (!document?.body) throwError('This library only works in browser environments.');
    if (!options.radius) throwError('Radius is required.');
    if (!options.color) throwError('Color is required.');
    this.options = options;
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

  private drawCircle(e: MouseEvent) {
    const { clientX: cx, clientY: cy } = e;
    const { radius, color } = this.options;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight);
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  private init() {
    const handleDraw = this.drawCircle.bind(this);
    window.addEventListener('mousemove', handleDraw);
  }

  public destroy() {
    const handleDraw = this.drawCircle.bind(this);
    if (this.canvas && this.canvas.parentNode) {
      window.removeEventListener('mousemove', handleDraw);
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
export { CreateCursorWith };
