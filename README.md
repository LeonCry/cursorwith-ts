# cursorwith-ts

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/voidissss/picture-bed@main/images/picssUso0Dn.png" alt="cursorwith logo" width="140" />
</p>

<p align="center"><b>Tiny (~4 kB)</b> · <b>Zero dependency</b> · <b>TypeScript-first</b> · <b>Framework agnostic</b> · <b>High performance</b></p>

<p align="center">
  <a href="https://www.npmjs.com/package/cursorwith-ts"><img src="https://img.shields.io/npm/v/cursorwith-ts.svg?color=3178c6&label=npm" alt="npm version" /></a>
  <a href="https://bundlephobia.com/package/cursorwith-ts"><img src="https://img.shields.io/bundlephobia/minzip/cursorwith-ts?label=bundle" alt="bundle size" /></a>
  <a href="https://www.npmjs.com/package/cursorwith-ts"><img src="https://img.shields.io/npm/dm/cursorwith-ts.svg?label=downloads" alt="downloads" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/cursorwith-ts.svg?label=license" alt="license" /></a>
</p>

<p align="center">A tiny, zero-dependency, TypeScript-powered cursor trail / follow effect for modern web apps.</p>

<div align="center">
  <a href="https://leoncry.github.io/cursor-with" target="_blank">
      Full Documentation
  </a>
</div>

---

## 🔥 Features

- Tiny: ~4 kB (gzipped) output
- Zero runtime dependencies
- Complete TypeScript declarations
- Works with any framework (Vue / React / Svelte / Vanilla ...)
- Smooth animation via Canvas (no layout thrash / minimal main thread impact)
- Configurable follow strategies (e.g. time-based)

---

## 🎈  Tiny

Just **≈ 4 kB**. Import, instantiate, done.

```ts
import { CreateCursorWith } from 'cursorwith-ts'; // ~4 kB gzipped
```

## 🚀  Zero-Dependency

**No third-party libraries** are required; all functionality is implemented internally, minimizing project complexity.

## 🔒  TypeScript Support

Written entirely in **TypeScript** across the stack, complete with type definitions to enhance development safety.

```ts
import type { CursorWithOptions } from 'cursorwith-ts';

```

## 🍭  Framework-Agnostic

Pure implementation – drop it into Vue, React, Angular, Svelte, Solid or plain HTML.

### Vue Example (`App.vue`)

```ts [app.vue]
import { CreateCursorWith } from 'cursorwith-ts';
import {onMounted, onBeforeUnmount, ref} from "vue";
const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: { 
        radius: 10, 
        color: 'rgba(0,0,0,0.1)', 
        borderWidth: 1, 
        borderColor: 'rgba(0,0,0,1)' 
        }
    follow: { 
        type: 'time', 
        timeRatio: 0.04
        }
  });
});
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
});
```


### React Example (`App.tsx`)

```tsx
import { useEffect, useRef } from 'react';
import { CreateCursorWith } from 'cursorwith-ts';

export default function App() {
  const cursorRef = useRef<InstanceType<typeof CreateCursorWith> | null>(null);

  useEffect(() => {
    cursorRef.current = new CreateCursorWith({
      style: { 
        radius: 10, 
        color: 'rgba(0,0,0,0.1)', 
        borderWidth: 1, 
        borderColor: 'rgba(0,0,0,1)' 
        },
      follow: { 
        type: 'time', 
        timeRatio: 0.04 
        }
    });

    return () => {
      cursorRef.current?.destroy();
    };
  }, []);

  return <></>;
}
```




## ⚡️  High Performance

Canvas-based rendering only. No layout / reflow thrashing; minimal overhead per frame.


## 📦 Install

```bash
# npm
npm install cursorwith-ts

# pnpm
pnpm add cursorwith-ts

# yarn
yarn add cursorwith-ts

# bun
bun add cursorwith-ts
```

---

## Usage

> [!TIP]
> cursorwith-ts only supports **ESM** (native modules) and **CDN** usage.

### ES6 Modules

```ts
import { CreateCursorWith } from 'cursorwith-ts';

const cw = new CreateCursorWith({
  style: { 
    radius: 10, 
    color: 'rgba(0,0,0,0.1)', 
    borderWidth: 1, 
    borderColor: '#000000' 
    }
  follow: { 
    type: 'time', 
    timeRatio: 0.04 
    }
})
```

### CDN (unpkg)

```html
<script type="module">
  import { CreateCursorWith } from 'https://unpkg.com/cursorwith-ts@latest/dist/index.js';
  const cw = new CreateCursorWith({
    style: { radius: 10, color: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: '#000000' },
    follow: { type: 'time', timeRatio: 0.04 }
  });
</script>
```

### TypeScript Support 

`cursorwith-ts` ships full declaration files – no extra config needed.

```ts
import { CreateCursorWith } from 'cursorwith-ts';
import type { CursorWithOptions } from 'cursorwith-ts';

const options:CursorWithOptions = {
  style: { 
    radius: 10, 
    color: 'rgba(0,0,0,0.1)', 
    borderWidth: 1, 
    borderColor: '#000000' 
    },
  follow: { 
    type: 'time', 
    timeRatio: 0.04 
    }
}
const cw = new CreateCursorWith(options);
```

## 🌍 Environment Requirements 

- Modern browsers supporting ES modules & Canvas
- No IE (and no plan to support it)

## ⚙️ Minimal API (Quick Reference)

```ts
import { CreateCursorWith } from 'cursorwith-ts';

const instance = new CreateCursorWith({
  style: { radius: 10, color: 'rgba(0,0,0,0.1)' },
  follow: { type: 'time', timeRatio: 0.04 }
});

// Later
instance.destroy();
```

| Option Path            | Type / Values                 | Description                         |
|------------------------|-------------------------------|-------------------------------------|
| `style.radius`         | `number`                      | Circle radius in px                 |
| `style.color`          | `string` (CSS color)          | Fill color                          |
| `style.borderWidth`    | `number`                      | Border stroke width                 |
| `style.borderColor`    | `string`                      | Border stroke color                 |
| `follow.type`          | `'time' | 'gap'` (example)    | Follow strategy mode                |
| `follow.timeRatio`     | `number`                      | Time easing factor (for time mode)  |

> For full option details see the docs (coming soon / see `src/types`).

## 🗺 Roadmap

- [ ] Additional follow strategies
- [ ] Custom shape support
- [ ] Official Vue / React helper wrappers
- [ ] Accessibility / reduced motion tweak

## 🤝 Contributing

PRs welcome. Please run lint & build before submitting:

```bash
pnpm lint && pnpm build
```

## 📄 License

MIT © 2025-present

## 📝 Changelog

See [CHANGELOG](./CHANGELOG.md)

