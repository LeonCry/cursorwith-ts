# Option: Follow

::: info INTRODUCE
Follow configuration mainly adjusts the cursor follower’s follow type.
:::

## Type

```ts
// fixed time follow type
interface TimeFollow {
  type: 'time'
  timeRatio?: number
}
// fixed gap follow type
interface GapFollow {
  type: 'gap'
  distance?: number
}
type Follow = TimeFollow | GapFollow;
```

## Usage

Two follow strategies are `provided—fixed-distance` and `fixed-time—each` yielding a distinct motion feel.

- **Fixed-distance**

On every animation frame the follower travels a constant number of pixels.
The segment is therefore covered at a perfectly uniform speed from start to end.

- **Fixed-time**

The follower must reach the target within a given duration, governed by the timeRatio coefficient.
Because the required distance changes frame-by-frame, the velocity profile is non-uniform and produces an eased motion.


Parameter cheat-sheet

distance – pixels to advance per `frame` (fixed-distance mode)

timeRatio – time-scaling factor; lower values = slower transit (fixed-time mode)


## Example

```ts{5,14}
import { CreateCursorWith } from 'cursorwith-ts';

// fixed time follow instance
const cw = new CreateCursorWith({
  //...
  follow: { 
    type: 'time', 
    timeRatio: 0.04 
    }
})

// fixed gap follow instance
const cw = new CreateCursorWith({
  //...
  follow: { 
    type: 'gap', 
    distance: 100,
    }
})
```