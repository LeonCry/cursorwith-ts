# 插件 API

本文档说明可用插件的函数签名、配置项与默认值，并给出简要示例。

## follow

```ts
import { follow } from 'cursorwith-ts/use';

function follow(options: Follow): UseFn
```

- 作用：为主要圆形启用跟随策略
- 支持类型：`time` | `gap` | `track` | `spring`
- 默认值（自动填充）：
  - `time`: `timeRatio = 0.1`
  - `gap`: `distance = 5`（px/帧，按 FPS 归一化）
  - `track`: `delay = 500ms`
  - `spring`: `stiffness = 0.05`，`damping = 0.25`

示例：
```ts
cw.use(follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }));
```

## hoverEffect

```ts
import { hoverEffect } from 'cursorwith-ts/use';

function hoverEffect(options: HoverEffect): UseFn
```

- 作用：悬停目标元素时将圆形过渡为带圆角矩形覆盖
- 关键配置：`scope`（选择范围）、`padding`、`offset`、`duration`、`easing`、`flash`、`style`
- 默认值（自动填充）：
  - `padding = 10`，`offset = 10`
  - `duration = 1000ms`，`easing = 'bounce-out'`
  - `flash.active = false`，`flash.duration = 1000ms`，`flash.easing = 'linear'`

示例：
```ts
cw.use(hoverEffect({
  scope: { dataset: ['demo'], class: ['demo'] },
  padding: 8,
  duration: 800,
  easing: 'quad-out',
  flash: { active: true, duration: 600, easing: 'sine-in-out' },
}));
```

## tail

```ts
import { tail } from 'cursorwith-ts/use';

function tail(options: Tail): UseFn
```

- 作用：在主要圆后绘制丝带式拖尾曲线
- 默认值（自动填充）：
  - `length = 10`
  - `color = 'rgba(255,255,255,0.2)'`
  - `firstDockGap = 0`，`dockGap = 0`

示例：
```ts
cw.use(tail({ length: 14, color: 'rgba(0,0,0,0.25)' }));
```

## nativeCursor

```ts
import { nativeCursor } from 'cursorwith-ts/use';

function nativeCursor(options: NativeCursorOptions): UseFn
```

- 作用：在真实鼠标位置绘制一个独立样式的小圆点
- 默认值（自动填充）：
  - `borderWidth = 0`，`shadowBlur = 0`
  - `borderColor = 'transparent'`，`shadowColor = 'transparent'`
  - `shadowOffset = [0, 0]`

示例：
```ts
cw.use(nativeCursor({ radius: 5, color: '#ff4d4f' }));
```

## clickEffect

```ts
import { clickEffect } from 'cursorwith-ts/use';

function clickEffect(options?: {
  customTrigger?: () => [
    (progress: number) => any, // trigger 阶段（0→1）
    (progress: number) => any, // restore 阶段（0→1）
  ]
  ease?: [EasingInput, EasingInput] // 默认 ['ease-out', 'spring-out']
  duration?: number                 // 默认 600(ms)
}): UseFn
```

- 作用：在 `mousedown`/`mouseup` 期间执行两段点击动画
- 默认行为：
  - trigger：半径向 `0.8×` 原始半径收缩
  - restore：半径恢复到原始值
- 事件挂载：`mousedown`、`mouseup`、`loopAfterDraw`、`optionSetter`

示例：
```ts
cw.use(clickEffect());
```

## inverse

```ts
import { inverse } from 'cursorwith-ts/use';

function inverse(): UseFn
```

- 作用：将画布的 `mix-blend-mode` 切换为 `difference`，形成反相效果
- 默认行为：开启即应用，关闭后恢复 `normal`

示例：
```ts
cw.use(inverse());
```

## 通用说明

- 所有插件函数返回对象形如 `{ name: symbol, execute(this: InstanceMeta, active: boolean) }`，由 `cw.use(...)` 调用激活，`cw.stopUse(...)` 关闭；
- 插件内部通过事件系统与主循环交互，常用事件：`mousemove`、`mousewheel`、`loopBeforeDraw`、`loopAfterDraw`、`mousedown`、`mouseup`、`optionSetter`、`optionGetter`；
- 每个插件都有内建的 `name: symbol` 唯一标识，重复 `use` 会先 `stopUse` 再重新启用，确保状态一致。