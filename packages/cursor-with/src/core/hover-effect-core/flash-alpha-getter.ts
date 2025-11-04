import type { CursorWithOptions } from '../../types';
import { resolveEasing } from '../../utils';

// 获取闪烁效果时的透明度
function getFlashAlpha(flash: NonNullable<CursorWithOptions['hoverEffect']>['flash'], now: number) {
  if (!flash) return 1;
  const { active, duration, easing } = flash!;
  if (!active) return 1;
  const halfFlashC = duration! / 2;
  const spendC = now % duration!;
  const flashRaw = spendC <= halfFlashC
    ? spendC / halfFlashC
    : (spendC - halfFlashC) / halfFlashC;
  const flashEase = Math.min(1, Math.max(0, resolveEasing(easing)(flashRaw)));
  return Math.max(0.2, spendC <= halfFlashC ? flashEase : 1 - flashEase);
}

export { getFlashAlpha };
