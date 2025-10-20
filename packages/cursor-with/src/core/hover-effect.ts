import type { CursorWithOptions, Point, TargetBound } from '../types';
import { resolveEasing } from '../utils';

let cacheTarget: HTMLElement | null = null;
let cacheTargetStyle: TargetBound | null = null;
// 获取当前鼠标位置的元素
function getActiveTarget(target: HTMLElement, hoverEffect: CursorWithOptions['hoverEffect']):
[
    HTMLElement | null,
    TargetBound | null,
] {
  if (!hoverEffect || !target) {
    cacheTarget = null;
    cacheTargetStyle = null;
    return [null, null];
  }
  const { scope } = hoverEffect;
  let tar = null;
  if (scope.class?.length) {
    if (target.classList && Array.from(target.classList).some(cls => scope.class?.includes(cls))) {
      tar = target;
    }
  }
  if (scope.dataset?.length) {
    if (Object.keys(target.dataset).some(key => scope.dataset?.includes(key))) {
      tar = target;
    }
  }
  if (tar) {
    if (cacheTarget === tar) {
      return [tar, cacheTargetStyle];
    }
    cacheTarget = tar;
    const { top, left, width, height } = tar.getBoundingClientRect();
    cacheTargetStyle = {
      top,
      left,
      width,
      height,
      borderRadius: getComputedStyle(tar).borderRadius,
    };
    return [tar, cacheTargetStyle];
  }
  return getActiveTarget(target.parentElement as HTMLElement, hoverEffect);
}

// 保存元素原始transform
const elementOriginalTransform = new WeakMap<HTMLElement, string>();
let rectStartTime: number | null = null;
let circleBackStartTime: number | null = null;
/**
 * 圆到矩形的过渡动画状态
 * @param ctx ctx实例
 * @param options 配置
 * @param targetStyle 目标样式
 * @param targetElement 目标元素
 * @param currentPoint 当前点
 */
function circleToRect(
  ctx: CanvasRenderingContext2D,
  options: CursorWithOptions,
  targetStyle: TargetBound,
  targetElement: HTMLElement,
  currentPoint: Point,
) {
  const {
    borderWidth,
    borderColor,
    color,
    radius,
  }
    = options.style as Required<CursorWithOptions['style']>;
  const { style: hs, padding, duration, easing, offset }
    = options.hoverEffect! as NonNullable<Required<CursorWithOptions['hoverEffect']>>;
  const { left, top, width, height, borderRadius } = targetStyle;
  const { x: cx, y: cy } = currentPoint;
  const from = {
    left: cx - radius,
    top: cy - radius,
    width: radius * 2,
    height: radius * 2,
  };
  const to = {
    left: left - padding,
    top: top - padding,
    width: width + padding * 2,
    height: height + padding * 2,
  };
  const now = performance.now();
  if (rectStartTime == null) {
    rectStartTime = now;
    circleBackStartTime = null;
  }

  const elapsed = now - rectStartTime;
  const rectProgress = Math.min(1, elapsed / duration);

  // 应用缓动函数
  const easingFn = resolveEasing(easing);
  const pe = Math.min(1, Math.max(0, easingFn(rectProgress)));

  const L = from.left + (to.left - from.left) * pe;
  const T = from.top + (to.top - from.top) * pe;
  const W = from.width + (to.width - from.width) * pe;
  const H = from.height + (to.height - from.height) * pe;

  const centerX = to.left + to.width / 2;
  const centerY = to.top + to.height / 2;
  const dx = cx - centerX;
  const dy = cy - centerY;
  const dist = Math.hypot(dx, dy);
  const influenceR = Math.max(1, Math.hypot(to.width / 2, to.height / 2));
  let ox = 0;
  let oy = 0;
  if (dist > 0) {
    const norm = Math.min(1, dist / influenceR);
    const mag = offset * norm;
    ox = (dx / dist) * mag;
    oy = (dy / dist) * mag;
  }
  const L2 = L + ox * pe;
  const T2 = T + oy * pe;

  // 目标元素进行适量偏移
  if (!elementOriginalTransform.has(targetElement)) {
    elementOriginalTransform.set(targetElement, targetElement.style.transform || '');
  }
  const baseTransform = elementOriginalTransform.get(targetElement) || '';
  const maxElementOffset = offset / 2;
  let eox = 0;
  let eoy = 0;
  if (dist > 0) {
    const norm = Math.min(1, dist / influenceR);
    const magEl = maxElementOffset * norm;
    eox = (dx / dist) * magEl * pe;
    eoy = (dy / dist) * magEl * pe;
  }
  targetElement.style.transform = `${baseTransform}${baseTransform ? ' ' : ''}translate(${eox.toFixed(2)}px, ${eoy.toFixed(2)}px)`;
  targetElement.style.willChange = 'transform';

  // 圆角处理
  const borderRadiusList = borderRadius.split(' ').map(item => Number.parseInt(item));
  const drFrom = borderRadiusList.map(() => radius * 2);
  const dr = drFrom.map((v, i) => v + (borderRadiusList[i] - v) * pe);

  ctx.save();
  ctx.fillStyle = hs?.color || color;
  ctx.strokeStyle = hs?.borderColor || borderColor;
  ctx.lineWidth = hs?.borderWidth || borderWidth;
  ctx.beginPath();
  ctx.roundRect(L2, T2, W, H, dr);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

/**
 * 矩形到圆的过渡动画状态
 * @param ctx ctx实例
 * @param options 配置
 * @param targetStyle 目标样式
 * @param targetElement 目标元素
 * @param currentPoint 当前点
 */
function rectToCircle(
  ctx: CanvasRenderingContext2D,
  options: CursorWithOptions,
  targetStyle: TargetBound,
  targetElement: HTMLElement,
  currentPoint: Point,
) {
  const {
    borderWidth,
    borderColor,
    color,
    radius,
  } = options.style as Required<CursorWithOptions['style']>;
  const { style: hs, padding, duration, easing, offset }
    = options.hoverEffect! as NonNullable<Required<CursorWithOptions['hoverEffect']>>;
  const { left, top, width, height, borderRadius } = targetStyle;
  const { x: cx, y: cy } = currentPoint;
  const from = {
    left: left - padding,
    top: top - padding,
    width: width + padding * 2,
    height: height + padding * 2,
  };
  const to = {
    left: cx - radius,
    top: cy - radius,
    width: radius * 2,
    height: radius * 2,
  };

  const now = performance.now();
  if (circleBackStartTime == null) {
    circleBackStartTime = now;
    rectStartTime = null;
  }

  const elapsed = now - circleBackStartTime;
  const rectProgress = elapsed / duration;

  const easingFn = resolveEasing(easing);
  const pe = Math.min(1, Math.max(0, easingFn(rectProgress)));

  const L = from.left + (to.left - from.left) * pe;
  const T = from.top + (to.top - from.top) * pe;
  const W = from.width + (to.width - from.width) * pe;
  const H = from.height + (to.height - from.height) * pe;

  const centerX = from.left + from.width / 2;
  const centerY = from.top + from.height / 2;
  const dx = cx - centerX;
  const dy = cy - centerY;
  const dist = Math.hypot(dx, dy);
  const influenceR = Math.max(1, Math.hypot(from.width / 2, from.height / 2));
  let ox = 0;
  let oy = 0;
  if (dist > 0) {
    const norm = Math.min(1, dist / influenceR);
    const mag = offset * norm;
    ox = (dx / dist) * mag;
    oy = (dy / dist) * mag;
  }
  const L2 = L + ox * (1 - pe);
  const T2 = T + oy * (1 - pe);

  const baseTransformOut = elementOriginalTransform.get(targetElement) || '';
  const maxElementOffset = offset / 2;
  let eoxOut = 0;
  let eoyOut = 0;
  if (dist > 0) {
    const norm = Math.min(1, dist / influenceR);
    const magEl = maxElementOffset * norm;
    eoxOut = (dx / dist) * magEl * (1 - pe);
    eoyOut = (dy / dist) * magEl * (1 - pe);
  }
  targetElement.style.transform = `${baseTransformOut}${baseTransformOut ? ' ' : ''}translate(${eoxOut.toFixed(2)}px, ${eoyOut.toFixed(2)}px)`;
  targetElement.style.willChange = 'transform';
  const borderRadiusList = borderRadius.split(' ').map(item => Number.parseInt(item));
  const dr = borderRadiusList.map(v => v + (radius * 2 - v) * pe);

  ctx.save();
  ctx.fillStyle = hs?.color || color;
  ctx.strokeStyle = hs?.borderColor || borderColor;
  ctx.lineWidth = hs?.borderWidth || borderWidth;
  ctx.beginPath();
  ctx.roundRect(L2, T2, W, H, dr);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

export { circleToRect, getActiveTarget, rectToCircle };
