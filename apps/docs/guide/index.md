# Introduction to cursorwith-ts

cursorwith-ts is a tiny, zero-dependency, TypeScript-driven, framework-agnostic, high-performance library for cursor-following effects.

## 🎈 Tiny

Only ≈ 7 kB, zero-dependency, low configuration — a few lines of code bring a smooth cursor-following effect.

```ts
// Just ~6.9kb (≈2.4kb gzipped)
import { CreateCursorWith } from 'cursorwith-ts/core';
```

## 🚀 Zero-dependency

No third-party libraries required. All features are implemented internally, reducing project complexity and bundle size.

## 🔒 TypeScript support

Written in TypeScript end-to-end, with complete type declarations for safer development.

```ts
import type { CursorWithOptions } from 'cursorwith-ts/types';
```

## 🍭 Framework-agnostic

Works in any stack without framework bindings. Pure native implementation that drops into Vue, React, Angular, and more.

::: code-group
```ts [Vue]
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const cw = ref<InstanceType<typeof CreateCursorWith> | null>(null);
const container = ref<HTMLElement | null>(null);

onMounted(() => {
  cw.value = new CreateCursorWith({
    style: { radius: 20, color: '#ddddddaa' },
    container: container.value ?? document.body,
  });
  cw.value.use(follow({ type: 'time' }));
});

onBeforeUnmount(() => {
  cw.value?.destroy();
});
```
```tsx [React]
import { useEffect, useRef } from 'react';
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

export default function App() {
  const cursorRef = useRef<InstanceType<typeof CreateCursorWith> | null>(null);
  const container = document.body;

  useEffect(() => {
    cursorRef.current = new CreateCursorWith({
      style: { radius: 20, color: '#ddddddaa' },
      container,
    });
    cursorRef.current.use(follow({ type: 'time' }));
    return () => {
      cursorRef.current?.destroy();
    };
  }, []);

  return <></>;
}
```
:::

## ⚡️ High performance

Implemented natively using Canvas — zero DOM manipulation and no render-thread blocking.