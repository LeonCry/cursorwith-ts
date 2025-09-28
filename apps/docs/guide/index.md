
# Cursorwith Introduction

cursorwith is a tiny, zero-dependency, TypeScript-powered, framework-agnostic, high-performance mouse-trailing effect.

## 🎈  Tiny

Just **≈ 4 kB**, zero-deps-one line and your cursor grows a tail.

```ts
// only 4.4kb gzipped 1.6kb (computed from vscode extension [Import Cost])
import { CreateCursorWith } from '@leoncry/cursorwith-ts';
```

## 🚀  Zero-Dependency

No third-party libraries are required; all functionality is implemented internally, minimizing project complexity.

## 🔒  TypeScript Support

Written entirely in TypeScript across the stack, complete with type definitions to enhance development safety.

```ts
import type { CursorWithOptions } from '@leoncry/cursorwith-ts';

```

## 🍭  Framework-Agnostic

Built without any framework dependencies—pure native implementation that can be dropped into Vue, React, Angular, or any other stack.


::: code-group
```ts [app.vue]
import { CreateCursorWith } from '@leoncry/cursorwith-ts';
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
```tsx [react.tsx]
import { useEffect, useRef } from 'react';
import { CreateCursorWith } from '@leoncry/cursorwith-ts';

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
:::


## ⚡️  High Performance

Implemented natively with Canvas and zero DOM manipulation, zero render-thread blocking.

