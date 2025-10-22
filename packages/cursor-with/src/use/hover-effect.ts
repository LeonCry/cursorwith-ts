import type { InstanceMeta } from '../core/index';
import type { CursorWithOptions } from '../types';
import { getActiveTarget } from '../core/hover-effect-core';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用hoverEffect
export function hoverEffect(config: CursorWithOptions['hoverEffect']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.hoverEffect = undefined;
      this.offMouseMove({ name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect });
      return;
    }
    this.options.hoverEffect = config;
    this.onMouseMove((e: MouseEvent) => {
      [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
    });
  }
  return {
    name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect,
    execute,
  };
}
