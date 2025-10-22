import type { InstanceMeta } from '../core/index';
import { getActiveTarget } from '../core/hover-effect-core';
// 使用hoverEffect
export function hoverEffect(this: InstanceMeta) {
  const { hoverEffect } = this.options;
  this.onMouseMove((e: MouseEvent) => {
    if (hoverEffect?.active) {
      [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, hoverEffect);
    }
  });
}
