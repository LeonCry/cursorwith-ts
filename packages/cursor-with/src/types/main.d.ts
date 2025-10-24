import type { CreateCursorWith } from '../core/index';
import type { EasingInput } from './index';
import type { ListenerFn } from './use';

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
  deform?: { decay?: number }
}

interface NativeCursorOptions extends CommonStyle { radius: number }

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
  length: number
  color: string
  firstDockGap?: number
  dockGap?: number
}

interface HoverEffect {
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

interface CursorWithOptions {
  container?: Element
  style: StyleOptions
  follow?: Follow
  tail?: Tail
  hoverEffect?: HoverEffect
  clickEffect?: boolean
  nativeCursor?: NativeCursorOptions
  inverse?: boolean
}

type EventNames = 'mousemove' | 'mousedown' | 'mouseup' | 'mousewheel' | 'loopBeforeDraw' | 'loopAfterDraw' | 'optionSetter' | 'optionGetter';
interface Meta {
  container: Element
  options: CursorWithOptions
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  containerRect: DOMRect
  currentPoint: Point
  targetPoint: Point
  loopId: number | null
  isDrawCircle: boolean
  isOnHoverTarget: boolean
  useFns: Map<keyof any, AnyFn>
  eventListeners: Map<EventNames, Map<keyof any, ListenerFn>>
  eventResult: Map<EventNames, ReturnType<ListenerFn>[]>
}
type InstanceMeta = {
  [K in keyof CreateCursorWith]: CreateCursorWith[K]
} & Meta;

export { CursorWithOptions, EventNames, InstanceMeta };
