import type { CursorWithOptions, InstanceMeta } from '../types';
import { nativeCursorDrawer } from '../core/draw';
import { fillDefaultNativeCursor } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用nativeCursor
export function nativeCursor(config: CursorWithOptions['nativeCursor']) {
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.nativeCursor;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.nativeCursor = undefined;
      return;
    }
    this.options.nativeCursor = config;
    fillDefaultNativeCursor(this.options.nativeCursor!);
    this.on('loopAfterDraw', () => {
      nativeCursorDrawer(this.ctx, this.targetPoint, this.options);
    }, uniqueId);
  }
  return {
    name: uniqueId,
    execute,
  };
}
