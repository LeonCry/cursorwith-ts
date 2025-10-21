import type { CursorWithOptions } from '../types';
import { resolveEasing } from '../utils';

const DURATION = 600;
let saveRadius = 0;
let clickStartTime = 0;
let clickEndTime = 0;
function clickEffectTriggerCollector(options: CursorWithOptions) {
  const { style } = options;
  const now = performance.now();
  if (!clickStartTime) {
    saveRadius = style.radius;
    clickStartTime = now;
    clickEndTime = 0;
  }
  return () => {
    if (clickEndTime) return;
    const n = performance.now();
    const progress = Math.min((n - clickStartTime) / DURATION, 1);
    if (progress === 1) return;
    const ease = resolveEasing('ease-out')(progress);
    const pe = Math.min(1, Math.max(0, ease));
    style.radius = style.radius + (saveRadius * 0.8 - style.radius) * pe;
  };
}
function clickEffectRestoreCollector(options: CursorWithOptions) {
  const { style } = options;
  const now = performance.now();
  if (!clickEndTime) {
    clickEndTime = now;
    clickStartTime = 0;
  }
  return () => {
    if (clickStartTime) return;
    const n = performance.now();
    const progress = Math.min((n - clickEndTime) / DURATION, 1);
    if (progress === 1) return;
    const ease = resolveEasing('spring-out')(progress);
    const pe = Math.min(1, Math.max(0, ease));
    style.radius = 1.2 * style.radius + (saveRadius - 1.2 * style.radius) * pe;
  };
}

export { clickEffectRestoreCollector, clickEffectTriggerCollector };
