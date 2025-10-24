import type { EasingInput, InstanceMeta } from '../types';
import { clickEffectRestoreCollector, clickEffectTriggerCollector } from '../core/click-effect-core';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用clickEffect
let clickEffectTrigger: (() => boolean | undefined) | null = null;
let clickEffectRestore: (() => boolean | undefined) | null = null;

export function clickEffect(
  config?: {
    customTrigger?: () => [(p: number) => any, (p: number) => any]
    ease?: [EasingInput, EasingInput]
    duration?: number
  },
) {
  const { customTrigger, ease, duration } = config || {};
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.clickEffect;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.clickEffect = undefined;
      clickEffectTrigger = null;
      clickEffectRestore = null;
      this.off('mousedown', null, uniqueId);
      this.off('mouseup', null, uniqueId);
      this.off('optionSetter', null, uniqueId);
      return;
    }
    this.options.clickEffect = true;
    const clickFinish = {
      trigger: true,
      restore: true,
    };
    const [triggerEase, restoreEase] = ease || ['ease-out', 'spring-out'];
    const [trigger, restore] = customTrigger?.() || [];
    let originOptions = this.getOptions();
    this.on('optionSetter', () => {
      if (clickFinish.restore && clickFinish.trigger) {
        originOptions = this.getOptions();
      }
    }, uniqueId);

    this.on('mousedown', () => {
      this.setOptions(originOptions);
      clickEffectTrigger = clickEffectTriggerCollector(clickFinish, this.options, triggerEase, duration, trigger);
      clickEffectRestore = null;
    }, uniqueId);
    this.on('mouseup', () => {
      this.setOptions(originOptions);
      clickEffectRestore = clickEffectRestoreCollector(clickFinish, this.options, restoreEase, duration, restore);
      clickEffectTrigger = null;
    }, uniqueId);
    this.on('loopAfterDraw', () => {
      if (clickEffectTrigger) clickEffectTrigger();
      if (clickEffectRestore) clickEffectRestore();
    });
  }
  return {
    name: uniqueId,
    execute,
  };
}
