import type { EasingInput } from '../utils/easing';

interface CommonStyle {
  color: string
  borderWidth?: number
  borderColor?: string
  shadowBlur?: number
  shadowColor?: string
  shadowOffset?: [number, number]
}

interface StyleOptions extends CommonStyle {
  radius: number
  img?: string
}

interface NativeCursorOptions extends CommonStyle {
  show: boolean
  radius: number
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
type Follow = { active?: boolean } & (TimeFollow | GapFollow | TrackFollow | SpringFollow);

interface Tail {
  active?: boolean
  length: number
  color: string
  firstDockGap?: number
  dockGap?: number
}

interface HoverEffect {
  active?: boolean
  padding?: number
  offset?: number
  duration?: number
  easing?: EasingInput
  scope: {
    dataset: string[]
    class?: string[]
  }
  flash?: {
    active: boolean
    duration?: number
    easing?: EasingInput
  }
  style: CommonStyle
};

interface Deform {
  active?: boolean
  decay?: number
}
interface Inverse { active: boolean }

interface CursorWithOptions {
  style: StyleOptions
  follow?: Follow
  tail?: Tail
  deform?: Deform
  hoverEffect?: HoverEffect
  clickEffect?: boolean
  nativeCursor?: NativeCursorOptions
  inverse?: Inverse
}

export { CursorWithOptions };
