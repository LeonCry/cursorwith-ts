import type { CursorWithOptions, TargetBound } from '../../types';

let cacheTarget: HTMLElement | null = null;
let cacheTargetStyle: TargetBound | null = null;
let cacheContainer: HTMLElement | null = null;
let cacheContainerRect: DOMRect | null = null;

// 获取当前鼠标位置的元素
function getActiveTarget(
  target: HTMLElement,
  hoverEffect: CursorWithOptions['hoverEffect'],
  ro: ResizeObserver,
  forceUpdate?: boolean,
):
[
    HTMLElement | null,
    TargetBound | null,
] {
  if (!hoverEffect || !target) {
    ro.disconnect();
    cacheTarget = null;
    cacheTargetStyle = null;
    cacheContainer = null;
    cacheContainerRect = null;
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
    if (cacheTarget === tar && !forceUpdate) {
      return [tar, { ...cacheTargetStyle! }];
    }
    if (cacheTarget !== tar) {
      ro.observe(tar);
    }
    cacheTarget = tar;
    const container = hoverEffect.container!;
    const containerRect = cacheContainer === container
      ? cacheContainerRect!
      : (() => {
          cacheContainer = container;
          cacheContainerRect = container.getBoundingClientRect();
          return cacheContainerRect!;
        })();
    const tarRect = tar.getBoundingClientRect();
    const dt = tarRect.top - containerRect.top;
    const db = containerRect.bottom - tarRect.bottom;
    const dl = tarRect.left - containerRect.left;
    const dr = containerRect.right - tarRect.right;
    const dh = dt < 0 ? dt : db < 0 ? db : 0;
    const dw = dl < 0 ? dl : dr < 0 ? dr : 0;
    cacheTargetStyle = {
      top: tarRect.top,
      left: tarRect.left,
      width: tarRect.width,
      height: tarRect.height,
      offset: {
        width: dw,
        height: dh,
        top: dt < 0 ? -dt : 0,
        left: dl < 0 ? -dl : 0,
      },
      borderRadius: getComputedStyle(tar).borderRadius,
    };
    return [tar, { ...cacheTargetStyle! }];
  }
  return getActiveTarget(target.parentElement as HTMLElement, hoverEffect, ro, forceUpdate);
}

export { getActiveTarget };
