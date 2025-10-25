# Cursorwith-ts 介绍

cursorwith-ts 是一个小巧、零依赖、TypeScript 驱动、跨框架、高性能的鼠标光标跟随效果库。

## 🎈 小巧

仅 **≈ 7 kB**，零依赖,低配置 —— 几行代码即可让你的光标拥有跟随效果。

```ts
// 仅 6.9kb（gzip 后约 2.4kb）
import { CreateCursorWith } from 'cursorwith-ts/core';
```

## 🚀 零依赖

不依赖任何第三方库，所有功能均由内部实现，降低项目复杂度与打包体积。

## 🔒 TypeScript 支持

全量 TypeScript 编写，提供完整类型声明，让开发更安全。

```ts
import type { CursorWithOptions } from 'cursorwith-ts/types';
```

## 🍭 跨框架

无需绑定框架，原生实现，可直接用于 Vue、React、Angular 等任意技术栈。

::: code-group
```ts [app.vue]
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const cw = ref<InstanceType<typeof CreateCursorWith> | null>(null);

onMounted(() => {
  cw.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: '#ddddddaa',
    },
    container,
  });
});
cw.value.use(follow({ type: 'time' }));

onBeforeUnmount(() => {
  cw.value?.destroy();
});
```
```tsx [react.tsx]
import { useEffect, useRef } from 'react';
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

export default function App() {
  const cursorRef = useRef<InstanceType<typeof CreateCursorWith> | null>(null);

  useEffect(() => {
    cursorRef.current = new CreateCursorWith({
    style: {
      radius: 20,
      color: '#ddddddaa',
    },
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

## ⚡️ 高性能

基于 Canvas 的原生实现，零 DOM 操作，避免阻塞渲染线程。