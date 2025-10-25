# Plugin: Follow

::: info
The Follow plugin controls the motion strategy of the main circle. Four modes are available: `time` (fixed duration), `gap` (fixed distance), `track` (trajectory playback), and `spring` (spring motion).
:::

## Type Definitions

```ts
interface TimeFollow { type: 'time'; timeRatio?: number }      // default 0.1
interface GapFollow { type: 'gap'; distance?: number }         // default 5 (px/frame)
interface TrackFollow { type: 'track'; delay?: number }        // default 500 (ms)
interface SpringFollow { type: 'spring'; stiffness?: number; damping?: number } // default 0.05 / 0.25

type Follow = TimeFollow | GapFollow | TrackFollow | SpringFollow;
```

> Internally, `timeRatio` and `distance` are normalized by device FPS to keep the motion feeling consistent across devices.

## Usage Notes

- Fixed duration (`time`)
  - `timeRatio` controls the per-frame approach factor (default `0.1`). Smaller values move slower; larger values move faster.
  - Because per-frame distances vary, the overall speed curve shows an easing effect.

- Fixed distance (`gap`)
  - Moves a fixed number of pixels toward the target each frame (default `5px/frame`), resulting in near-constant speed.

- Trajectory playback (`track`)
  - Records mouse movement and replays it with `delay` (default `500ms`).
  - Produces a “ghost tail” effect along the historical path.

- Spring motion (`spring`)
  - Uses a second-order spring model toward the target. `stiffness` (default `0.05`) controls elasticity; `damping` (default `0.25`) controls damping.
  - Often shows slight overshoot followed by stabilization.

## Examples

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 20, color: '#ddddddaa' },
  container: document.getElementById('app')!,
});

// 1) Fixed duration
cw.use(follow({ type: 'time', timeRatio: 0.1 }));

// 2) Fixed distance
cw.use(follow({ type: 'gap', distance: 8 }));

// 3) Track playback (400ms delay)
cw.use(follow({ type: 'track', delay: 400 }));

// 4) Spring (stronger elasticity and damping)
cw.use(follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }));
```

<script setup>
import FollowDemo from '../../components/FollowDemo.vue'
</script>

<ClientOnly>
  <FollowDemo />
</ClientOnly>



## Tips
- You can toggle at any time:
  ```ts
  const f = follow({ type: 'time' });
  cw.use(f);
  cw.stopUse(f); // uninstall the plugin
  ```
- When using the same plugin type, you don't need to stop before re-using with new config; calling `use` replaces the old configuration by default.
- When `hoverEffect` is active, the circle transitions to a rounded rectangle covering the target element; `follow` still updates internal positions for subsequent drawing and transitions.