import type { CursorWithOptions, InstanceMeta } from '../types';
import { tailDrawer } from '../core/draw';
import { fillDefaultTail } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用tail
export function tail(config: CursorWithOptions['tail']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.tail = undefined;
      this.off('loopAfterDraw', { name: USEABLE_USE_FN_NAMES_SYMBOLS.tail });
      return;
    }
    this.options.tail = config;
    fillDefaultTail(this.options.tail!);
    this.on('loopAfterDraw', () => {
      if (!this.isOnHoverTarget) {
        tailDrawer(this.ctx, this.currentPoint, this.targetPoint, this.options);
      }
    });
  }
  return {
    name: USEABLE_USE_FN_NAMES_SYMBOLS.tail,
    execute,
  };
}
