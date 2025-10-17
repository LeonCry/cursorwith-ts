import type { CursorWithOptions, Point, TargetBound } from '../types';

/**
 * 控制绘制圆还是椭圆(是否变形)
 * @param ctx ctx实例
 * @param point 中心点
 * @param targetPoint 目标点
 * @param radius 半径
 * @param deform 变形配置
 */
function arcOrEllipseDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  targetPoint: Point,
  radius: number,
  deform?: CursorWithOptions['deform'],
) {
  const { x, y } = point;
  const { x: tx, y: ty } = targetPoint;
  if (!deform || !deform.active) return ctx.arc(x, y, radius, 0, Math.PI * 2);
  const distance = Math.sqrt((tx - x) ** 2 + (ty - y) ** 2);
  const angle = Math.atan2(ty - y, tx - x);
  const d = Math.max(radius, distance / deform.strength!);
  ctx.ellipse(x, y, radius, d, angle - Math.PI / 2, 0, Math.PI * 2);
}
/**
 * 绘制内圆
 * @param ctx ctx实例
 * @param point 中心点
 * @param targetPoint 目标点
 * @param style 内圆样式
 */
function innerCircleDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  targetPoint: Point,
  style: CursorWithOptions['style'],
  deform?: CursorWithOptions['deform'],
) {
  const { radius, color } = style;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  arcOrEllipseDrawer(ctx, point, targetPoint, radius, deform);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

/**
 * 绘制外圆
 * @param ctx ctx实例
 * @param point 中心点
 * @param targetPoint 目标点
 * @param style 外圆样式
 */
function outerCircleDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  targetPoint: Point,
  style: CursorWithOptions['style'],
  deform?: CursorWithOptions['deform'],
) {
  const {
    radius,
    shadowBlur,
    shadowColor,
    shadowOffset,
  } = style;
  const { borderWidth, borderColor } = style as Required<CursorWithOptions['style']>;
  ctx.save();
  if (shadowBlur && shadowColor) {
    ctx.shadowOffsetX = shadowOffset?.[0] || 0;
    ctx.shadowOffsetY = shadowOffset?.[1] || 0;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
  }
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  arcOrEllipseDrawer(ctx, point, targetPoint, radius, deform);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
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
  const { length, color, dockGap = 1, firstDockGap = 1 } = style;
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
  // 去除圆球内部多余的拖尾
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
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

// 以下为hoverEffect相关绘制

/**
 * 由circle转化为rect效果
 */
function circleToRect(ctx: CanvasRenderingContext2D, FPS: number, circleStyle: CursorWithOptions['style'], targetStyle: TargetBound, currentPoint: Point, padding: number, duration: number) {
  const { borderWidth, borderColor, color, radius } = circleStyle as Required<CursorWithOptions['style']>;
  const { width, height, left, top, borderRadius } = targetStyle;
  return {
    borderWidth,
    borderColor,
    color,
    radius,
    width,
    height,
    left,
    top,
    borderRadius,
    padding,
    duration,
    FPS,
    currentPoint,
  };
}

/**
 * 绘制hover-border效果
 * @param ctx ctx实例
 * @param point 中心点
 * @param style hover样式
 * @param targetStyle 目标元素样式
 * @param padding 内边距
 */
function outerRectDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  style: CursorWithOptions['style'],
  targetStyle: TargetBound,
  padding: number = 0,
) {
  const { borderWidth, borderColor } = style as Required<CursorWithOptions['style']>;
  const { width, height, left, top } = targetStyle;
  ctx.save();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.rect(left - padding, top - padding, width + padding * 2, height + padding * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

/**
 * 绘制hover-内部rect效果
 * @param ctx ctx实例
 * @param point 中心点
 * @param style hover样式
 * @param targetStyle 目标元素样式
 * @param padding 内边距
 */
function innerRectDrawer(
  ctx: CanvasRenderingContext2D,
  point: Point,
  style: CursorWithOptions['style'],
  targetStyle: TargetBound,
  padding: number = 0,
) {
  const { color } = style;
  const { width, height, left, top } = targetStyle;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(left - padding, top - padding, width + padding * 2, height + padding * 2);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

export {
  circleToRect,
  imageDrawer,
  innerCircleDrawer,
  innerRectDrawer,
  outerCircleDrawer,
  outerRectDrawer,
  tailDrawer,
};
