interface Point {
  x: number
  y: number
}
interface TrackPoint extends Point { t: number }

interface TargetBound {
  top: number
  left: number
  width: number
  height: number
  borderRadius: string
}

interface UseFn { name: symbol, execute: (this: InstanceMeta, active: boolean) => void }

type AnyFn = (...args: any) => any;

export { AnyFn, Point, TargetBound, TrackPoint, UseFn };
