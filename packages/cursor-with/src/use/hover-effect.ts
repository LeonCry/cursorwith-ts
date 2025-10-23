import type { InstanceMeta } from '../core/index';
import type { CursorWithOptions } from '../types';
import { circleToRect, getActiveTarget, rectToCircle } from '../core/hover-effect-core';
import { fillDefaultHoverEffect } from '../utils/pre-check-fill';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用hoverEffect
export function hoverEffect(config: CursorWithOptions['hoverEffect']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.hoverEffect = undefined;
      this.isDrawCircle = true;
      this.offMouseMove({ name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect });
      this.offMouseWheel({ name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect });
      return;
    }
    this.options.hoverEffect = config;
    fillDefaultHoverEffect(this.options.hoverEffect!);
    this.onMouseMove((e: MouseEvent) => {
      [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
    });
    this.onMouseWheel((e: MouseEvent) => {
      [this.targetElement, this.targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
    });
    this.onLoopBeforeDraw(() => {
      this.isDrawCircle = false;
      if (this.targetElement && this.targetStyle) {
        this.oldTargetElement = this.targetElement;
        this.oldTargetStyle = this.targetStyle;
        circleToRect(
          this.ctx,
          this.options,
          this.targetStyle,
          this.targetElement,
          this.currentPoint,
        );
      }
      else if (!this.targetElement && this.oldTargetElement) {
        rectToCircle(
          this.ctx,
          this.options,
          this.oldTargetStyle!,
          this.oldTargetElement,
          this.currentPoint,
          () => {
            this.oldTargetElement = null;
            this.isDrawCircle = true;
          },
        );
      }
      else {
        this.isDrawCircle = true;
      }
    });
  }
  return {
    name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect,
    execute,
  };
}
