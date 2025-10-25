# Create an Instance

Import via ES6 Modules and create a `CursorWith` instance.

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: {
    radius: 20,
    color: '#ddddddaa',
  },
  // Optional: specify container, default is document.body
  // container: document.body,
});

// Optional: use the follow plugin
cw.use(follow({ type: 'time', timeRatio: 0.04 }));
```

## Container (`container`)

- Default container is `document.body`.
- You can pass any `Element` as the container; the instance will create a `canvas` inside and cover the page with fixed positioning.
- The instance automatically mounts/unmounts events when the container is entered/left.

::: danger Note
If you pass a custom `Element`, make sure it has `transform / perspective / filter` set to non-`none` values; otherwise the circle may not render as expected.
:::

```ts
const cw = new CreateCursorWith({
  style: { radius: 16, color: 'rgba(0,0,0,0.15)' },
  container: document.querySelector('#app')!,
});
```

## Style (`style`)

::: info
Style options control the circle color, border, shadow, radius, image fill, and dynamic deformation.
:::

## Type definition

```ts
// CursorWithOptions['style']
interface StyleOptions {
  // base
  radius: number
  color: string
  borderWidth?: number
  borderColor?: string
  // shadow
  shadowBlur?: number
  shadowColor?: string
  shadowOffset?: [number, number]
  // image fill
  img?: string
  // dynamic deformation (stretch by movement direction)
  deform?: { decay?: number }
}
```

## Usage notes

- `radius`: circle radius.
- `color`: fill color.
- `borderWidth` / `borderColor`: border width and color.
- `shadowBlur` / `shadowColor` / `shadowOffset`: shadow blur, color, and offset (`[x, y]`). Shadows render when a non-transparent color is set.
- `img`: image fill on top of the base circle.
- `deform.decay`: stretch the circle into an ellipse based on the movement direction.
  - Smaller values stretch more obviously; larger values keep it closer to a circle. `0` or omitted disables deformation.

## Example
```ts
import { CreateCursorWith } from 'cursorwith-ts';

const cw = new CreateCursorWith({
  style: {
    // base appearance
    radius: 16,
    color: 'rgba(0,0,0,0.12)',
    borderWidth: 2,
    borderColor: '#000',
    // shadow
    shadowBlur: 20,
    shadowColor: 'rgba(0,0,0,0.35)',
    shadowOffset: [2, 4],
    // image fill (optional)
    img: '/assets/cursor.png',
    // dynamic deformation: stretch along movement direction
    deform: { decay: 12 },
  },
});
```

> When `deform` is enabled and the mouse moves quickly, the circle stretches into an ellipse along the direction of movement; it returns to a circle when stationary.

::: info Suggestion
When using cursorwith-ts, consider setting a global style `* { cursor: none; }`.
:::

## Lifecycle

- `cw.destroy()`: destroy the instance and remove canvas and listeners.
- `cw.pause()` / `cw.resume()`: pause/resume rendering.

> Call `destroy()` when the component unmounts to free resources.