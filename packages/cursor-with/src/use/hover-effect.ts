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
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.hoverEffect;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.hoverEffect = undefined;
      this.isDrawCircle = true;
      this.off('mousemove', null, uniqueId);
      this.off('mousewheel', null, uniqueId);
      return;
    }
    this.options.hoverEffect = config;
    fillDefaultHoverEffect(this.options.hoverEffect!);
    this.on('mousemove', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
    }, uniqueId);
    this.on('mousewheel', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect);
    }, uniqueId);
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
    }, uniqueId);
  }
  return {
    name: uniqueId,
    execute,
  };
}
