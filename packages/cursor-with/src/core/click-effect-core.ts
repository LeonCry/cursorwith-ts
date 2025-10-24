import type { CursorWithOptions, EasingInput } from '../types';
import { resolveEasing } from '../utils';

const DURATION = 600;
let saveRadius = 0;
let clickStartTime = 0;
let clickEndTime = 0;
function clickEffectTriggerCollector(
  clickFinish: { trigger: boolean, restore: boolean },
  options: CursorWithOptions,
  ease: EasingInput,
  trigger?: (p: number) => any,
) {
  const { style } = options;
  const now = performance.now();
  if (!clickStartTime) {
    saveRadius = style.radius;
    clickStartTime = now;
    clickEndTime = 0;
  }
  return () => {
    if (clickEndTime) return;
    clickFinish.trigger = false;
    const n = performance.now();
    const progress = Math.min((n - clickStartTime) / DURATION, 1);
    if (progress === 1) return clickFinish.trigger = true;
    const easeValue = resolveEasing(ease)(progress);
    const pe = Math.min(1, Math.max(0, easeValue));
    if (trigger) {
      trigger(pe);
    }
    else {
      style.radius = style.radius + (saveRadius * 0.8 - style.radius) * pe;
    }
  };
}
function clickEffectRestoreCollector(
  clickFinish: { trigger: boolean, restore: boolean },
  options: CursorWithOptions,
  ease: EasingInput,
  restore?: (p: number) => any,
) {
  const { style } = options;
  const now = performance.now();
  if (!clickEndTime) {
    clickEndTime = now;
    clickStartTime = 0;
  }
  return () => {
    if (clickStartTime) return;
    clickFinish.restore = false;
    const n = performance.now();
    const progress = Math.min((n - clickEndTime) / DURATION, 1);
    if (progress === 1) return clickFinish.restore = true;
    const easeValue = resolveEasing(ease)(progress);
    const pe = Math.min(1, Math.max(0, easeValue));
    if (restore) {
      restore(pe);
    }
    else {
      style.radius = 1.2 * style.radius + (saveRadius - 1.2 * style.radius) * pe;
    }
  };
}

export { clickEffectRestoreCollector, clickEffectTriggerCollector };
