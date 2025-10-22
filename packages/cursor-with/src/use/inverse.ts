// 使用反色
export function inverse(canvas: HTMLCanvasElement, inverse: boolean) {
  canvas.style.setProperty('mix-blend-mode', inverse ? 'difference' : 'normal', 'important');
}
