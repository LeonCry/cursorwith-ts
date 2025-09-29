interface StyleOptions {
  radius: number
  color: string
  img?: string
  borderWidth?: number
  borderColor?: string
}
interface TimeFollow {
  type: 'time'
  timeRatio?: number
}
interface GapFollow {
  type: 'gap'
  distance?: number
}
interface TrackFollow {
  type: 'track'
  delay?: number
}
interface SpringFollow {
  type: 'spring'
  stiffness?: number
  damping?: number
}
type Follow = TimeFollow | GapFollow | TrackFollow | SpringFollow;

interface CursorWithOptions { style: StyleOptions, follow?: Follow }

export { CursorWithOptions };
