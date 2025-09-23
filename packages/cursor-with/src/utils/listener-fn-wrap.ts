// 监听函数包装器,用于取消监听时函数的一致性
type anyFn = (...args: any[]) => any;
const fnMap = new Map<string, anyFn>();
function listenerWrapper(fn: anyFn, tag: string) {
  if (fnMap.has(tag)) throw new Error(`Listener already exists for tag: ${tag}`);
  fnMap.set(tag, fn);
  return fn;
}

function listenerUnWrapper(tag: string) {
  if (!fnMap.has(tag)) throw new Error(`No listener found for tag: ${tag}`);
  return fnMap.get(tag)!;
}
export { listenerUnWrapper, listenerWrapper };
