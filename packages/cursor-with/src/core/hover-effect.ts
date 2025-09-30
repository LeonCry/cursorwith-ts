import type { CursorWithOptions, TargetBound } from '../types';

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

export { getActiveTarget };
