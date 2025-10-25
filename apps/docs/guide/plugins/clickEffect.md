# Plugin: ClickEffect

::: info
ClickEffect triggers two-stage animations on mouse down and up: the trigger phase and the restore phase. You can customize easing, duration, and the trigger logic.
:::

## Type Definitions

```ts
interface ClickEffectOptions {
  customTrigger?: () => [
    (progress: number) => any, // custom trigger animation (0→1)
    (progress: number) => any, // custom restore animation (0→1)
    // progress is the current animation progress (0~1)
  ]
  //ease?: [config for trigger, config for restore]
  ease?: [EasingInput, EasingInput] // default ['ease-out', 'spring-out']
  duration?: number                 // default 600 (ms)
}
```

> Default behavior:
> - trigger: circle radius shrinks to 0.8× of the original.
> - restore: circle radius returns to the original value.
> - both stages use independent easing but share the same duration (configurable).

## Usage Examples

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { clickEffect } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 20, color: '#ddddddaa' } });

// Enable with default easing and duration
cw.use(clickEffect());

// Custom easing and duration
cw.use(clickEffect({ ease: ['quad-out', 'spring-out'], duration: 800 }));

// Custom triggers (example: turn red on down, then restore)
cw.use(clickEffect({
  customTrigger: () => [
    (p) => {
      // trigger: gradually intensify color
      cw.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 + 0.6 * p})` } });
    },
    (p) => {
      // restore: gradually return
      const t = 1 - p;
      cw.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 * t})` } });
    },
  ],
}));
```

<script setup>
import ClickEffectDemo from '../../components/ClickEffectDemo.vue'
</script>

<ClientOnly>
  <ClickEffectDemo />
</ClientOnly>



## Combination Tips

- Combine with `nativeCursor` to form “outer ring animation + inner dot positioning” feedback.
- Compatible with `hoverEffect`; clicks still fire while the rectangle covers the target.
- Adjust `duration` and `ease` to match your overall motion rhythm.