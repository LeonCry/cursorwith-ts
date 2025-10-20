import type { CursorWithOptions, Point } from '../types';

/**
 * 控制绘制圆还是椭圆(是否变形)
 * @param ctx ctx实例
 * @param currentPoint 当前点
 * @param targetPoint 目标点
 * @param radius 半径
 * @param deform 变形配置
 */
function arcOrEllipseDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  targetPoint: Point,
  radius: number,
  deform?: CursorWithOptions['deform'],
) {
  const { x, y } = currentPoint;
  const { x: tx, y: ty } = targetPoint;
  if (!deform || !deform.active) return ctx.arc(x, y, radius, 0, Math.PI * 2);
  const distance = Math.sqrt((tx - x) ** 2 + (ty - y) ** 2);
  const angle = Math.atan2(ty - y, tx - x);
  const d = Math.max(radius, Math.min(distance / deform.decay!, 2 * radius));
  ctx.ellipse(x, y, radius, d, angle - Math.PI / 2, 0, Math.PI * 2);
}
/**
 * 绘制内圆
 * @param ctx ctx实例
 * @param currentPoint 中心点
 * @param targetPoint 目标点
 * @param options 配置
 */
function innerCircleDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  targetPoint: Point,
  options: CursorWithOptions,
) {
  const { style, deform } = options;
  const { radius, color, shadowBlur, shadowColor, shadowOffset } = style;
  const { borderWidth, borderColor } = style as Required<CursorWithOptions['style']>;
  if (shadowBlur && shadowColor) {
    ctx.shadowOffsetX = shadowOffset?.[0] || 0;
    ctx.shadowOffsetY = shadowOffset?.[1] || 0;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
  }
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  arcOrEllipseDrawer(ctx, currentPoint, targetPoint, radius, deform);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

/**
 * 绘制图像
 * @param ctx ctx实例
 * @param currentPoint 中心点
 * @param options 配置
 */
function imageDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  options: CursorWithOptions,
) {
  const { x, y } = currentPoint;
  const { radius, img } = options.style;
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
 * @param currentPoint 当前点
 * @param targetPoint 目标点
 * @param options 配置
 */
const tailPoints: Point[] = [];
function tailDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  targetPoint: Point,
  options: CursorWithOptions,
) {
  const { radius } = options.style;
  const { x: tx, y: ty } = targetPoint;
  const { x: cx, y: cy } = currentPoint;
  const { length, color, dockGap = 1, firstDockGap = 1 } = options.tail!;
  if (tx !== cx || ty !== cy) tailPoints.push({ ...currentPoint });
  else tailPoints.shift();
  while (tailPoints.length > length) tailPoints.shift();
  if (tailPoints.length < 2) return;
  const pts = tailPoints;
  const total = pts.length;
  const maxWidth = radius * 2;
  const minWidth = radius;
  const minAlpha = 0;
  const maxAlpha = 1;

  function midpoint(a: Point, b: Point) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
  ctx.save();
  // 镂空,去除圆球内部多余的拖尾
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  arcOrEllipseDrawer(ctx, currentPoint, targetPoint, radius, options.deform);
  ctx.clip('evenodd');
  ctx.strokeStyle = color;
  for (let i = 1; i < total - firstDockGap; i += dockGap) {
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

function nativeCursorDrawer(
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  options: CursorWithOptions,
) {
  const { radius, color, borderWidth, borderColor } = options.nativeCursor as NonNullable<Required<CursorWithOptions['nativeCursor']>>;
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.arc(currentPoint.x, currentPoint.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}
export {
  imageDrawer,
  innerCircleDrawer,
  nativeCursorDrawer,
  tailDrawer,
};
