import type { CursorWithOptions, InstanceMeta, TargetBound } from '../types';
import { circleToRect, getActiveTarget, rectToCircle } from '../core/hover-effect-core';
import { fillDefaultHoverEffect } from '../utils';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';

let targetElement: HTMLElement | null = null;
let targetStyle: TargetBound | null = null;
let oldTargetElement: HTMLElement | null = null;
let oldTargetStyle: TargetBound | null = null;
let needUpdateTargetStyle: boolean = false;
function setRealTargetStyle(newStyle?: {
  width?: number
  height?: number
}) {
  const { width, height } = newStyle || {};
  if (targetStyle) {
    const { offset } = targetStyle;
    targetStyle.width = (width ?? targetStyle.width) + offset.width;
    targetStyle.height = (height ?? targetStyle.height) + offset.height;
    targetStyle.top += offset.top;
    targetStyle.left += offset.left;
  }
}
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
    const ro = new ResizeObserver(async (mutations) => {
      await new Promise(resolve => setTimeout(resolve, 0));
      const { width, height } = mutations[0].contentRect;
      setRealTargetStyle({ width, height });
    });
    this.on('mousemove', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect, ro);
      setRealTargetStyle();
    }, uniqueId);
    this.on('mousewheel', (e: MouseEvent) => {
      [targetElement, targetStyle] = getActiveTarget(e.target as HTMLElement, this.options.hoverEffect, ro, true);
      setRealTargetStyle();
    }, uniqueId);
    this.on('loopBeforeDraw', () => {
      if (needUpdateTargetStyle && targetElement) {
        [, targetStyle] = getActiveTarget(targetElement, this.options.hoverEffect, ro, true);
        setRealTargetStyle();
        needUpdateTargetStyle = false;
      }
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

// 当目标元素被手动设置位置时,需要重新获取目标元素的位置信息
export function updateTargetInHover() {
  needUpdateTargetStyle = true;
}
