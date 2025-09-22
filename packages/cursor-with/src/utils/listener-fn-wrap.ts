// 监听函数包装器,用于取消监听时函数的一致性
export function listenerFnWrapper(fn: (...args: any[]) => any, params: any) {
  return () => fn(params);
}
