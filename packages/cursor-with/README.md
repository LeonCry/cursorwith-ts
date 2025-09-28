# Cursorwith-ts

<img src="https://cdn.jsdelivr.net/gh/voidissss/picture-bed@main/images/logoTTwGbB.png" alt="logo" style="zoom:25%;" />

cursorwith-ts is a **tiny**, **zero-dependency**, **TypeScript-powered**, **framework-agnostic**, **high-performance** mouse-trailing effect.

## 🎈  Tiny

Just **≈ 4 kB**, zero-deps-one line and your cursor grows a tail.

```ts
// only 4.4kb gzipped 1.6kb (computed from vscode extension [Import Cost])
import { CreateCursorWith } from 'cursorwith-ts';
```

## 🚀  Zero-Dependency

**No third-party libraries** are required; all functionality is implemented internally, minimizing project complexity.

## 🔒  TypeScript Support

Written entirely in **TypeScript** across the stack, complete with type definitions to enhance development safety.

```ts
import type { CursorWithOptions } from 'cursorwith-ts';

```

## 🍭  Framework-Agnostic

Built without any framework dependencies—pure native implementation that can be dropped into Vue, React, Angular, or any other stack.

`IN app.vue`

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


`IN react.tsx`

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

Implemented natively with Canvas and zero DOM manipulation, zero render-thread blocking.





## Cursorwith Install

```sh [npm]
npm install cursorwith
```

## Usage

> [!TIP]
> cursorwith only support **ES6 Modules** and **CDN**.

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

### CDN

```ts
import { CreateCursorWith } from 'https://unpkg.com/cursorwith@latest/dist/index.esm.js';

const cw = new CreateCursorWith({
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
})
```

### TypeScript Support 

cursorwith fully support **TypeScript**, with complete type definitions for all functions.

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

## Environment Requirements 

- Modern browsers supporting ES6 modules.
- NO IE browser, thanks.

