# 类型定义

本文档列出库中核心类型、插件配置与默认值，便于在 TypeScript 下获得完整的提示与约束。

## 样式类型

```ts
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
  img?: string           // 可选图片（替代圆形填充）
  deform?: { decay?: number } // 形变参数（预留）
}
```

默认填充（内部自动）：
- `borderWidth` 默认 `0`
- `shadowBlur` 默认 `0`
- `borderColor` 默认 `transparent`
- `shadowColor` 默认 `transparent`
- `shadowOffset` 默认 `[0, 0]`

## 实例配置

```ts
interface CursorWithOptions {
  container?: Element           // 默认 document.body
  style: StyleOptions
  follow?: Follow
  tail?: Tail
  hoverEffect?: HoverEffect
  clickEffect?: boolean
  nativeCursor?: NativeCursorOptions
  inverse?: boolean
}
```

## 插件配置类型

```ts
// Follow（跟随）
interface TimeFollow { type: 'time'; timeRatio?: number }
interface GapFollow { type: 'gap'; distance?: number }
interface TrackFollow { type: 'track'; delay?: number }
interface SpringFollow { type: 'spring'; stiffness?: number; damping?: number }

// Tail（拖尾）
interface Tail {
  length: number
  color: string
  firstDockGap?: number
  dockGap?: number
}

// HoverEffect（悬停变形）
interface HoverEffect {
  padding?: number
  offset?: number
  duration?: number
  easing?: EasingInput
  scope: { dataset: string[]; class?: string[] }
  flash?: { active: boolean; duration?: number; easing?: EasingInput }
  style: CommonStyle
}

// NativeCursor（原生小圆点）
interface NativeCursorOptions extends CommonStyle { radius: number }

// 合并类型
type Follow = TimeFollow | GapFollow | TrackFollow | SpringFollow;
```

默认值（内部自动）：
- Follow
  - `time`：`timeRatio = 0.1`
  - `gap`：`distance = 5`（px/帧，会按 FPS 归一化）
  - `track`：`delay = 500ms`
  - `spring`：`stiffness = 0.05`，`damping = 0.25`
- Tail
  - `length = 10`
  - `color = 'rgba(255,255,255,0.2)'`
  - `firstDockGap = 0`，`dockGap = 0`
- HoverEffect
  - `padding = 10`，`offset = 10`
  - `duration = 1000ms`
  - `easing = 'bounce-out'`
  - `flash.active = false`，`flash.duration = 1000ms`，`flash.easing = 'linear'`
- NativeCursorOptions
  - `borderWidth = 0`，`shadowBlur = 0`
  - `borderColor = 'transparent'`，`shadowColor = 'transparent'`
  - `shadowOffset = [0, 0]`

## 缓动类型

```ts
type EasingInput =
  | 'linear'
  | `${'ease' | 'back' | 'elastic' | 'bounce' | 'sine' | 'quad' | 'quart' | 'quint' | 'expo' | 'circ' | 'spring'}-${'in' | 'out' | 'in-out'}`
  | ((t: number) => number)
```

## 事件名与元数据

```ts
// 可注册的事件名
type EventNames =
  | 'mousemove'
  | 'mousedown'
  | 'mouseup'
  | 'mousewheel'
  | 'loopBeforeDraw'
  | 'loopAfterDraw'
  | 'optionSetter'
  | 'optionGetter'

// 监听器签名
type ListenerFn = (...arg: any[]) => void | { id: keyof any; result: any };
```

说明：
- `optionSetter` / `optionGetter` 在访问或设置 `options` 属性时被触发，可用于拦截或记录选项变化；
- `loopBeforeDraw` / `loopAfterDraw` 在每帧绘制前后触发，适合插件内部更新状态与执行动画。