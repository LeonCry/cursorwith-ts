import type { InstanceMeta } from './index';

type Execute = (this: InstanceMeta, active: boolean) => void;
interface UseFn { name: symbol, execute: Execute }
type ListenerFn = (...arg: any[]) => (void | { id: keyof any, result: any });
export { ListenerFn, UseFn };
