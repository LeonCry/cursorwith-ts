import type { InstanceMeta } from '../core/index';
import type { CursorWithOptions } from '../types';
import { getActiveTarget } from '../core/hover-effect-core';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用hoverEffect
export function hoverEffect(config: CursorWithOptions) {
  function execute(this: InstanceMeta) {
    const { hoverEffect } = this.options;
    this.onMouseMove((e: MouseEvent) => {
      if (hoverEffect?.active) {
        [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
      }
    });
  }
  return {
    name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect,
    execute,
  };
}
