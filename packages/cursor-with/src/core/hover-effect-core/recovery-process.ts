// 恢复元素transform,无论是元素在什么状态下
import type { resolveEasing } from '../../utils';
import { getElementOriginalTransform } from '.';

interface RecoveryProcess {
  elapsed: number
  easingFn: ReturnType<typeof resolveEasing> | null
  targetElement: HTMLElement | null
  duration: number
  eoxOut: number
  eoyOut: number
  now?: number
}
// 恢复进度
let recoveryProcess: RecoveryProcess | null = null;
function recoveryAbandonTransform(currentTarget: HTMLElement) {
  const raf = (t: number, r: RecoveryProcess) => {
    const {
      elapsed,
      easingFn,
      targetElement,
      duration,
      eoxOut,
      eoyOut,
      now,
    } = r;
    if (!targetElement) return;
    const baseTransformOut = getElementOriginalTransform(targetElement) || '';
    const rectProgress = (t - now! + elapsed) / duration;
    if (rectProgress > 1) return;
    const pe = Math.min(1, Math.max(0, easingFn!(rectProgress)));
    const eox = eoxOut * (1 - pe);
    const eoy = eoyOut * (1 - pe);
    targetElement.style.transform = `${baseTransformOut} translate(${eox.toFixed(2)}px, ${eoy.toFixed(2)}px)`;
    targetElement.style.willChange = 'transform';
    requestAnimationFrame(t => raf(t, r));
  };
  if (recoveryProcess) {
    const rp = recoveryProcess;
    if (rp.targetElement === currentTarget) return;
    const now = performance.now();
    requestAnimationFrame(t => raf(t, { ...rp, now }));
    recoveryProcess = null;
  }
}
function collectRecoveryProcess(rp: RecoveryProcess | null) {
  recoveryProcess = rp;
}
function getRecoveryProcess() {
  return recoveryProcess;
}
export { collectRecoveryProcess, getRecoveryProcess, recoveryAbandonTransform };
export type { RecoveryProcess };
