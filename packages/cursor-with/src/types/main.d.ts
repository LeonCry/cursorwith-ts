interface StyleOptions {
  radius: number
  color: string
  img?: string
  borderWidth?: number
  borderColor?: string
  shadowBlur?: number
  shadowColor?: string
  shadowOffset?: [number, number]
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

interface Tail {
  show: boolean
  length: number
  color: string
}

interface HoverEffect {
  active: boolean
  scope: {
    dataset?: string[]
    class?: string[]
  }
  padding?: number
}

interface CursorWithOptions {
  style: StyleOptions
  follow?: Follow
  tail?: Tail
  hoverEffect?: HoverEffect
}

export { CursorWithOptions };
