import type { CursorWithOptions, Point } from '../types';
/**
 * 绘制内圆
 * @param ctx ctx实例
 * @param point 中心点
 * @param style 内圆样式
 */
function innerCircleDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  style: Pick<CursorWithOptions['style'], 'radius' | 'color'>,
) {
  const { x, y } = point;
  const { radius, color } = style;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * 绘制外圆
 * @param ctx ctx实例
 * @param point 中心点
 * @param style 外圆样式
 */
function outerCircleDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  style: Pick<CursorWithOptions['style'], 'radius' | 'borderWidth' | 'borderColor'>,
) {
  const { x, y } = point;
  const { radius, borderWidth = 0, borderColor = 'transparent' } = style;
  if (borderWidth > 0) {
    ctx.beginPath();
    ctx.arc(x, y, radius + borderWidth / 2, 0, Math.PI * 2);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  }
}

export { innerCircleDrawer, outerCircleDrawer };
