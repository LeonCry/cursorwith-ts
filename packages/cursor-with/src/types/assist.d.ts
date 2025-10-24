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

type AnyFn = (...args: any) => any;

type EasingInput
  = 'linear' | `${'ease' | 'back' | 'elastic' | 'bounce' | 'sine' | 'quad' | 'quart' | 'quint' | 'expo' | 'circ' | 'spring'}-${'in' | 'out' | 'in-out'}`
    | ((t: number) => number);

export {
  AnyFn,
  EasingInput,
  Point,
  TargetBound,
  TrackPoint,
};
