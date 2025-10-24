# Cursorwith 介绍

cursorwith 是一个小巧、零依赖、TypeScript 驱动、跨框架、高性能的鼠标光标跟随效果库。

## 🎈 小巧

仅 **≈ 4 kB**，零依赖 —— 一行代码即可让你的光标拥有拖尾效果。

```ts
// 仅 4.4kb（gzip 后约 1.6kb）（基于 VSCode 扩展 Import Cost 估算）
import { CreateCursorWith } from 'cursorwith-ts';
```

## 🚀 零依赖

不依赖任何第三方库，所有功能均由内部实现，降低项目维护成本与复杂度。

## 🔒 TypeScript 支持

全量 TypeScript 编写，提供完整类型声明，让开发更安全。

```ts
import type { CursorWithOptions } from 'cursorwith-ts';
```

## 🍭 跨框架

无需绑定框架，原生实现，可直接用于 Vue、React、Angular 等任意技术栈。

::: code-group
```ts [app.vue]
import { CreateCursorWith } from 'cursorwith-ts';
import { onMounted, onBeforeUnmount, ref } from 'vue';
const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
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
});
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
});
```
```tsx [react.tsx]
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
:::

## ⚡️ 高性能

基于 Canvas 的原生实现，零 DOM 操作，避免阻塞渲染线程。