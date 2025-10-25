# All Types

Key type definitions available from `cursorwith-ts/types`.

## Style Types

```ts
interface CommonStyle {
  color?: string
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
```

- `CommonStyle` is shared across several plugin options.
- `StyleOptions` defines the main circle style and optional image fill and deformation.

## NativeCursor

```ts
interface NativeCursorOptions extends CommonStyle {
  radius?: number // default 4
}
```

## Follow Types

```ts
interface TimeFollow { type: 'time'; timeRatio?: number }
interface GapFollow { type: 'gap'; distance?: number }
interface TrackFollow { type: 'track'; delay?: number }
interface SpringFollow { type: 'spring'; stiffness?: number; damping?: number }

type Follow = TimeFollow | GapFollow | TrackFollow | SpringFollow
```

## Tail

```ts
interface Tail {
  length?: number
  color?: string
  firstDockGap?: number
  dockGap?: number
}
```

## HoverEffect

```ts
interface HoverEffectScope {
  dataset?: string[]
  class?: string[]
}

interface HoverEffect {
  scope?: HoverEffectScope
  padding?: number
  offset?: number
  duration?: number
  easing?: EasingInput
  flash?: {
    active?: boolean
    duration?: number
    easing?: EasingInput
  }
  style?: CommonStyle
}
```

## Instance Options

```ts
interface CursorWithOptions {
  container?: HTMLElement
  style: StyleOptions
}
```

## Events

```ts
type EventNames =
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'mousewheel'
  | 'loopBeforeDraw'
  | 'loopAfterDraw'
  | 'optionSetter'
  | 'optionGetter'
```

## InstanceMeta

```ts
interface InstanceMeta {
  canvas: HTMLCanvasElement
  options: CursorWithOptions
  // internal pointers and state are available within plugins via `this`
}
```

## Helper Types

```ts
interface Point { x: number; y: number }
interface TrackPoint extends Point { v: number }
interface TargetBound { width: number; height: number }
type AnyFn = (...args: any[]) => any

type EasingInput =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'quad-in'
  | 'quad-out'
  | 'cubic-in'
  | 'cubic-out'
  | 'quart-in'
  | 'quart-out'
  | 'quint-in'
  | 'quint-out'
  | 'sine-in'
  | 'sine-out'
  | 'sine-in-out'
  | 'bounce-out'
  | 'spring-out'
  | (t: number) => number
```

> Exact union values may extend depending on library updates; refer to exported types in `cursorwith-ts/types`.