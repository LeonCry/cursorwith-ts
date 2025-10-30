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
    const ro = new ResizeObserver((mutations) => {
      targetStyle!.width = mutations[0].contentRect.width;
      targetStyle!.height = mutations[0].contentRect.height;
    });
    const io = new IntersectionObserver((entries) => {
      // console.log(entries[0]);
    }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });
    this.on('mousemove', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect, ro, io);
    }, uniqueId);
    this.on('mousewheel', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect, ro, io, true);
    }, uniqueId);
    this.on('loopBeforeDraw', () => {
      this.isDrawCircle = false;
      if (targetElement && targetStyle) {
        oldTargetElement = targetElement;
        oldTargetStyle = targetStyle;
        this.isOnHoverTarget = true;
        circleToRect(
          this.ctx,
          this.options,
          targetStyle,
          targetElement,
          this.currentPoint,
          this.containerRect,
        );
      }
      else if (!targetElement && oldTargetElement) {
        this.isOnHoverTarget = false;
        rectToCircle(
          this.ctx,
          this.options,
          oldTargetStyle!,
          oldTargetElement,
          this.currentPoint,
          this.containerRect,
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
