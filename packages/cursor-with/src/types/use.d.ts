import type { InstanceMeta } from './core';

type Execute = (this: InstanceMeta, active: boolean) => void;
interface UseFn { name: symbol, execute: Execute }
type StopUseFn = (config?: any) => UseFn;
type ListenerFn = (...arg: any[]) => (void | { id: keyof any, result: any });
export { ListenerFn, StopUseFn, UseFn };
