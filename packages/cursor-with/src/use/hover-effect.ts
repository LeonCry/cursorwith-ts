import type { CursorWithOptions, InstanceMeta, TargetBound } from '../types';
import { circleToRect, getActiveTarget, rectToCircle } from '../core/hover-effect-core';
import { fillDefaultHoverEffect } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';

let targetElement: HTMLElement | null = null;
let targetStyle: TargetBound | null = null;
let oldTargetElement: HTMLElement | null = null;
let oldTargetStyle: TargetBound | null = null;
// 使用hoverEffect
export function hoverEffect(config: CursorWithOptions['hoverEffect']) {
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.hoverEffect = undefined;
      this.isDrawCircle = true;
      this.off('mousemove', { name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect });
      this.off('mousewheel', { name: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect });
      return;
    }
    this.options.hoverEffect = config;
    fillDefaultHoverEffect(this.options.hoverEffect!);
    this.on('mousemove', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
      return { id: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect, result: targetElement };
    });
    this.on('mousewheel', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
      return { id: USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect, result: targetElement };
    });
    this.on('loopBeforeDraw', () => {
      this.isDrawCircle = false;
      if (targetElement && targetStyle) {
        oldTargetElement = targetElement;
        oldTargetStyle = targetStyle;
        circleToRect(
          this.ctx,
          this.options,
          targetStyle,
          targetElement,
          this.currentPoint,
        );
      }
      else if (!targetElement && oldTargetElement) {
        rectToCircle(
          this.ctx,
          this.options,
          oldTargetStyle!,
          oldTargetElement,
          this.currentPoint,
          () => {
            oldTargetElement = null;
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
