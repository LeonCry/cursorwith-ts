---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CURSORWITH-TS"
  text: "一个小巧、高性能、跨框架的光标跟随效果。"
  tagline: 可定制且易于使用。
  image:
    alt: 标志
    src: /rrlogo.gif
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/
    - theme: alt
      text: API 文档
      link: /zh/api/
    - theme: alt
      text: GitHub
      link: https://github.com/LeonCry/cursorwith-ts

features:
  - title: 零依赖
    details: 不依赖第三方库，内部实现所有功能，降低工程复杂度与包体积。
  - title: TypeScript 支持
    details: 全量 TypeScript 编写，提供完备的类型定义，提升开发安全性。
  - title: 跨框架
    details: 原生实现，不绑定任何框架，可用于 Vue、React、Angular 等任意技术栈。
  - title: 高性能
    details: 采用 Canvas 原生实现，零 DOM 操作，避免阻塞渲染线程。
---
---
&nbsp;

# 🚀 快速开始

## 安装

::: code-group
```sh [npm]
npm install cursorwith-ts
```
```sh [pnpm]
pnpm add cursorwith-ts
```
:::

## 基本用法

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';
const container = document.getElementById('app');
// 创建一个 cursorwith 实例
const cw = new CreateCursorWith({
    style: {
      radius: 20,
      color: '#ddddddaa',
    },
    container,
  })
// 使用 follow 插件
cw.use(follow({ type: 'time' }));
```

**之后你将看到一个跟随移动的圆形☺️。**

<script setup>
import MiniDemo from '../components/MiniDemo.vue'
</script>

<ClientOnly>
  <MiniDemo />
</ClientOnly>

## 📄 许可

**MIT License**

---
&nbsp;

开始使用 **cursorwith-ts**，让你的网页更生动有趣吧。

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #D16BA5, #5B94FF,#E0FF9A);
  --vp-home-hero-image-background-image: -webkit-linear-gradient(-45deg,#D16BA5,#5B94FF,#E0FF9A);
  --vp-home-hero-image-filter:blur(68px);
}
</style>