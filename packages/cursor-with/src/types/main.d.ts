import type { EasingInput } from '../utils/easing';

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

interface NativeCursorOptions {
  show: boolean
  radius: number
  color: string
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

interface Tail {
  show: boolean
  length: number
  color: string
  firstDockGap?: number
  dockGap?: number
}

interface HoverEffect {
  active: boolean
  scope: {
    dataset: string[]
    class?: string[]
  }
  padding?: number
  offset?: number
  duration?: number
  easing?: EasingInput
  style?: {
    borderWidth?: number
    borderColor?: string
    color?: string
  }
}

interface Deform {
  active: boolean
  decay?: number
}

interface CursorWithOptions {
  style: StyleOptions
  follow?: Follow
  tail?: Tail
  hoverEffect?: HoverEffect
  deform?: Deform
  nativeCursor?: NativeCursorOptions

}

export { CursorWithOptions };
