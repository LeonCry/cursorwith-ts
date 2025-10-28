import type { CursorWithOptions, InstanceMeta } from '../types';
import { tailDrawer } from '../core/draw';
import { fillDefaultTail } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用tail
export function tail(config: CursorWithOptions['tail']) {
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.tail;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.tail = undefined;
      this.off('loopAfterDraw', null, uniqueId);
      return;
    }
    this.options.tail = config;
    fillDefaultTail(this.options.tail!);
    this.on('loopAfterDraw', () => {
      tailDrawer(this.ctx, this.isOnHoverTarget, this.currentPoint, this.targetPoint, this.options);
    }, uniqueId);
  }
  return {
    name: uniqueId,
    execute,
  };
}
