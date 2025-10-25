# Plugin: Tail

::: info
Tail draws a ribbon-like trailing curve behind the main circle, with configurable length, color, and dotted gap options.
:::

## Type Definitions

```ts
interface Tail {
  length?: number       // default 10, maximum recorded trail points
  color?: string        // default '#00000033', tail color (lower opacity recommended)
  firstDockGap?: number // default 0, near-circle initial segment gap (skip segments)
  dockGap?: number      // default 0, subsequent segment gap (create dotted effect)
}
```

## Usage Example

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { tail } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 18, color: '#ddddddaa' } });

cw.use(tail({
  length: 14,
  color: 'rgba(0,0,0,0.25)',
  firstDockGap: 0,
  dockGap: 0,
}));
```

<script setup>
import TailDemo from '../../components/TailDemo.vue'
</script>

<ClientOnly>
  <TailDemo />
</ClientOnly>



## Behavior

- Tail width and opacity fade along the trail; segments near the circle are thicker and more solid, far segments are thinner and lighter.
- Larger `length` means longer tails; too large may impact performance.
- `firstDockGap` and `dockGap` form dotted or intermittent tails:
  - `firstDockGap` affects only the segments closest to the circle.
  - `dockGap` applies to all subsequent segments.
- When hovering a target (`hoverEffect` active), the tail turns off automatically and resumes afterward.

## Combination Tips

- Pair with `follow` modes for richer tail dynamics.
- Using with `hoverEffect` is great for emphasizing focus; the system automatically avoids draw conflicts.