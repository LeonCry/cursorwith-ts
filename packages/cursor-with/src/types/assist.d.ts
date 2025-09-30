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
export { Point, TargetBound, TrackPoint };
