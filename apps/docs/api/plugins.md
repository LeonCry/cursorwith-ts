# Plugin API

This document describes available plugin function signatures, configuration options with defaults, and provides brief examples.

## follow

```ts
import { follow } from 'cursorwith-ts/use';

function follow(options: Follow): UseFn
```

- Purpose: enable follow strategy for the main circle
- Supported types: `time` | `gap` | `track` | `spring`
- Defaults (auto-filled):
  - `time`: `timeRatio = 0.1`
  - `gap`: `distance = 5` (px/frame, normalized by FPS)
  - `track`: `delay = 500ms`
  - `spring`: `stiffness = 0.05`, `damping = 0.25`

Example:
```ts
cw.use(follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }));
```

## hoverEffect

```ts
import { hoverEffect } from 'cursorwith-ts/use';

function hoverEffect(options: HoverEffect): UseFn
```

- Purpose: when hovering target elements, transition the circle into a rounded rectangle covering the target
- Key options: `scope`, `padding`, `offset`, `duration`, `easing`, `flash`, `style`
- Defaults (auto-filled):
  - `padding = 10`, `offset = 10`
  - `duration = 1000ms`, `easing = 'bounce-out'`
  - `flash.active = false`, `flash.duration = 1000ms`, `flash.easing = 'linear'`

Example:
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

- Purpose: draw a ribbon-like trailing curve behind the main circle
- Defaults (auto-filled):
  - `length = 10`
  - `color = 'rgba(255,255,255,0.2)'`
  - `firstDockGap = 0`, `dockGap = 0`

Example:
```ts
cw.use(tail({ length: 14, color: 'rgba(0,0,0,0.25)' }));
```

## nativeCursor

```ts
import { nativeCursor } from 'cursorwith-ts/use';

function nativeCursor(options: NativeCursorOptions): UseFn
```

- Purpose: draw an independent small dot at the real mouse position
- Defaults (auto-filled):
  - `borderWidth = 0`, `shadowBlur = 0`
  - `borderColor = 'transparent'`, `shadowColor = 'transparent'`
  - `shadowOffset = [0, 0]`

Example:
```ts
cw.use(nativeCursor({ radius: 5, color: '#ff4d4f' }));
```

## clickEffect

```ts
import { clickEffect } from 'cursorwith-ts/use';

function clickEffect(options?: {
  customTrigger?: () => [
    (progress: number) => any, // trigger stage (0→1)
    (progress: number) => any, // restore stage (0→1)
  ]
  ease?: [EasingInput, EasingInput] // default ['ease-out', 'spring-out']
  duration?: number                 // default 600 (ms)
}): UseFn
```

- Purpose: run two click animations during `mousedown`/`mouseup`
- Default behavior:
  - trigger: radius shrinks toward `0.8×` original
  - restore: radius returns to original
- Events used: `mousedown`, `mouseup`, `loopAfterDraw`, `optionSetter`

Example:
```ts
cw.use(clickEffect());
```

## inverse

```ts
import { inverse } from 'cursorwith-ts/use';

function inverse(): UseFn
```

- Purpose: switch canvas `mix-blend-mode` to `difference` for inverse contrast
- Default behavior: applies when enabled; restores to `normal` when disabled

Example:
```ts
cw.use(inverse());
```

## General Notes

- All plugin functions return `{ name: symbol, execute(this: InstanceMeta, active: boolean) }`. Use `cw.use(...)` to activate and `cw.stopUse(...)` to deactivate.
- Plugins interact with the event system and main loop. Common events include `mousemove`, `mousewheel`, `loopBeforeDraw`, `loopAfterDraw`, `mousedown`, `mouseup`, `optionSetter`, `optionGetter`.
- Each plugin has a built-in unique `name: symbol`. Repeated `use` first `stopUse`s then re-enables to keep state consistent.