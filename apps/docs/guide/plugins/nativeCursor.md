# Plugin: NativeCursor

::: info
NativeCursor draws a small “native-size” dot exactly at the real mouse position, useful for enhancing precise positioning or building a dual-layer cursor effect.
:::

## Type Definitions

```ts
interface NativeCursorOptions extends CommonStyle {
  radius?: number // default 4, small dot radius
}
```

> `CommonStyle` includes common style fields: `color`, `borderColor`, `borderWidth`, `shadowBlur`, `shadowColor`, `shadowOffset`, etc.

## Usage Example

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { nativeCursor } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 18, color: '#ddddddaa' } });

cw.use(nativeCursor({
  radius: 5,
  color: 'red',
}));
```

<script setup>
import NativeCursorDemo from '../../components/NativeCursorDemo.vue'
</script>

<ClientOnly>
  <NativeCursorDemo />
</ClientOnly>



## Behavior

- The small dot always sits at the real mouse position and does not interfere with the main circle’s follow strategy.
- Its style is independent of the global circle style.
- It continues to draw under `hoverEffect` and `tail`; it does not participate in rectangle transitions or tail changes.

## Combination Tips

- Combine with `clickEffect` to get “outer ring motion + inner dot positioning” feedback on click.
- When used with `inverse`, the canvas blend mode affects visuals uniformly; enable or disable as needed.