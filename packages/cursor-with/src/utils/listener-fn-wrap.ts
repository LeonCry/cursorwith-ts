import type { AnyFn } from '../types';

// 监听函数包装器,用于取消监听时函数的一致性
const fnMap = new Map<string, AnyFn>();
function listenerWrapper(fn: AnyFn, tag: string) {
  if (fnMap.has(tag)) throw new Error(`Listener already exists for tag: ${tag}`);
  fnMap.set(tag, fn);
  return fn;
}

function listenerUnWrapper(tag: string) {
  if (!fnMap.has(tag)) return () => void 0;
  const fn = fnMap.get(tag)!;
  fnMap.delete(tag);
  return fn;
}
export { listenerUnWrapper, listenerWrapper };
