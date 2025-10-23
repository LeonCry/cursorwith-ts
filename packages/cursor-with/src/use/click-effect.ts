import type { InstanceMeta } from '../types';
import { clickEffectRestoreCollector, clickEffectTriggerCollector } from '../core/click-effect-core';
import { USEABLE_USE_FN_NAMES_SYMBOLS } from './index';
// 使用clickEffect
let clickEffectTrigger: (() => void) | null = null;
let clickEffectRestore: (() => void) | null = null;
export function clickEffect() {
  const uniqueId = USEABLE_USE_FN_NAMES_SYMBOLS.clickEffect;
  function execute(this: InstanceMeta, active: boolean) {
    if (!active) {
      this.options.clickEffect = undefined;
      clickEffectTrigger = null;
      clickEffectRestore = null;
      this.off('mousedown', null, uniqueId);
      this.off('mouseup', null, uniqueId);
      return;
    }
    this.options.clickEffect = true;
    this.on('mousedown', () => {
      clickEffectTrigger = clickEffectTriggerCollector(this.options);
      clickEffectRestore = null;
    }, uniqueId);
    this.on('mouseup', () => {
      clickEffectRestore = clickEffectRestoreCollector(this.options);
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
