# Plugin: HoverEffect

::: info
When the mouse hovers over specified elements, the circle transitions into a rounded rectangle that covers the target area. You can control transition duration, easing, padding, and offset, and optionally enable flash and an independent style.
:::

## Type Definitions

```ts
interface HoverEffectScope {
  dataset?: string[] // select by data-*, e.g. data-demo
  class?: string[]   // select by class name, e.g. .demo
}

interface HoverEffect {
  scope?: HoverEffectScope
  padding?: number        // default 0, extra inner padding relative to the target
  offset?: number         // default 0, slight target offset (simulates follow)
  duration?: number       // default 600 (ms), transition duration
  easing?: EasingInput    // default 'ease-out', transition easing
  flash?: {
    active?: boolean      // default false, enables flashing while hovering
    duration?: number     // default 600 (ms), flashing cycle
    easing?: EasingInput  // default 'sine-in-out', flashing easing
  }
  style?: CommonStyle     // independent style while hovering
}
```

## Select target elements (scope)

- `dataset`: select elements by `data-*`, e.g. `data-demo`.
- `class`: select elements by class names, e.g. `.demo`.
- Both can be used together; matching either condition includes the element.

Example HTML:
```html
<div data-demo class="demo">hover me</div>
```

## Usage Example

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { hoverEffect } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 18, color: '#e0e0e0', borderColor: '#222', borderWidth: 1 },
});

cw.use(hoverEffect({
  scope: { dataset: ['demo'] },
  padding: 10,
  duration: 1000,
  offset: 20,
  easing: 'bounce-out',
  style: {
    color: 'rgba(0,0,255,0.1)',
    borderColor: 'rgba(0,0,255,0.1)',
    shadowBlur: 40,
    shadowColor: 'rgba(0,0,255,0.1)',
    shadowOffset: [0, 0],
    borderWidth: 5,
  },
}));
```

<script setup>
import HoverEffectDemo from '../../components/HoverEffectDemo.vue'
</script>

<ClientOnly>
  <HoverEffectDemo />
</ClientOnly>



## Behavior

- Entering the target element: the circle transitions into a rounded rectangle (radius computed from target) covering the element.
- Leaving the target element: the rectangle smoothly transitions back to a circle.
- `padding` expands the coverage area; `offset` produces slight element movement to enhance the follow feel.
- `flash` enables periodic brightness/opacity changes during hover.
- `style` applies only while hovering and does not affect the global circle style.

## Combination Tips

- When combined with `tail`, the tail temporarily stops while hovering and resumes afterward.
- Works with all `follow` modes; position updates smoothly during rectangle transitions.