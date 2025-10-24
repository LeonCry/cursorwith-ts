import type { InstanceMeta } from '../types';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用nativeCursor
export function inverse() {
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.inverse;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.inverse = undefined;
      this.canvas.style.setProperty('mix-blend-mode', 'normal', 'important');
      return;
    }
    this.options.inverse = true;
    this.canvas.style.setProperty('mix-blend-mode', 'difference', 'important');
  }
  return {
    name: uniqueId,
    execute,
  };
}
