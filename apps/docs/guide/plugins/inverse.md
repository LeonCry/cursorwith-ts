# Plugin: Inverse

::: info
Inverse applies a negative blending effect between the cursor graphics and page content, useful for improving contrast and readability on light or dark backgrounds.
:::

## Type Definitions

```ts
interface InverseOptions {}
```

> No additional parameters are required. Enable with `cw.use(inverse())`. Disable with `cw.stopUse(inverse())`.

## Usage Example

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { inverse } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: {
  radius: 40,
  color: 'white',
  borderColor: 'black',
  borderWidth: 20,
  shadowBlur: 40,
  shadowColor: 'white',
}});

cw.use(inverse()); // enable inverse blending
// cw.stopUse(inverse()); // disable (example)
```

<script setup>
import InverseDemo from '../../components/InverseDemo.vue'
</script>

<ClientOnly>
  <InverseDemo />
</ClientOnly>



## Behavior

- When enabled, the canvas `mix-blend-mode` switches so cursor colors contrast negatively against the background.
- When stacked with other draw-type plugins (`nativeCursor`, `tail`), the overall visual style is uniformly affected by the blend mode.
- Disabling the plugin restores normal blending.

## Combination Tips

- Strongly improves cursor visibility on complex or image backgrounds.
- If the page uses special blend modes, test locally to avoid impacting broader design.