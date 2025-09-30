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
  ctx.closePath();
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
    ctx.closePath();
  }
}

/**
 * 绘制图像
 * @param ctx ctx实例
 * @param point 中心点
 * @param style 图像样式
 */
function imageDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  style: Pick<CursorWithOptions['style'], 'radius' | 'img'>,
) {
  const { x, y } = point;
  const { radius, img } = style;
  if (!img) return;
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = img;
  ctx.beginPath();
  ctx.save();
  ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
  ctx.closePath();
}

/**
 * 绘制尾巴
 * @param ctx ctx实例
 * @param points 当前点
 * @param style 尾巴样式
 */
const tailPoints: Point[] = [];
function tailDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  targetPoint: Point,
  style: CursorWithOptions['tail'],
  radius: number,
) {
  if (!style) return;
  const { x: tx, y: ty } = targetPoint;
  const { x: cx, y: cy } = currentPoint;
  const { length, color } = style;
  if (tx !== cx || ty !== cy) tailPoints.push({ ...currentPoint });
  else tailPoints.shift();
  while (tailPoints.length > length) tailPoints.shift();
  if (tailPoints.length < 2) return;
  const pts = tailPoints;
  const total = pts.length;
  const maxWidth = radius * 2;
  const minWidth = radius * 0.25;
  const minAlpha = 0;
  const maxAlpha = 1.0;

  function midpoint(a: Point, b: Point) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
  ctx.save();
  ctx.strokeStyle = color;
  for (let i = 1; i < total - 1; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const next = pts[i + 1];
    const start = midpoint(prev, curr);
    const end = midpoint(curr, next);
    const t = i / (total - 1);
    const width = minWidth + (maxWidth - minWidth) * t;
    const alpha = minAlpha + (maxAlpha - minAlpha) * t;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(curr.x, curr.y, end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.restore();
}

export { imageDrawer, innerCircleDrawer, outerCircleDrawer, tailDrawer };
