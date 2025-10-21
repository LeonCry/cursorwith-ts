// 更新滤镜-反色
export function setInverse(canvas: HTMLCanvasElement, inverse: boolean | undefined) {
  canvas.style.setProperty('mix-blend-mode', inverse ? 'difference' : 'normal', 'important');
}
