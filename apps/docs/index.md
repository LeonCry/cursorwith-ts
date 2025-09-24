---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CURSORWITH"
  text: "A Tiny, High Performance And Framework-Agnostic Cursor Following Effect."
  tagline: customizable and easy to use.
  image:
    light: /light.gif
    dark: /dark.gif
    alt: sign
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: API
      link: /api/
    - theme: alt
      text: View on GitHub
      link: https://github.com/LeonCry/cursor-with

features:
  - title: Zero-dependency
    details: No third-party libraries are required; all functionality is implemented internally, minimizing project complexity.
  - title: TypeScript Support
    details: Written entirely in TypeScript across the stack, complete with type definitions to enhance development safety.
  - title: Framework-Agnostic
    details: Built without any framework dependencies—pure native implementation that can be dropped into Vue, React, Angular, or any other stack.
  - title: High Performance
    details: Implemented natively with Canvas—zero DOM manipulation, zero render-thread blocking.
---
---
&nbsp;

# 🚀 Get Started 

## Install

::: code-group
```bash [npm]
npm install cursorwith
```
```bash [pnpm]
pnpm add cursorwith
```
:::

## Basic usage

```ts
import { CreateCursorWith } from 'cursorwith-core';

// create a cursorwith instance
const cw = new CreateCursorWith({
  style: { radius: 10, color: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: '#000000' },
  follow: { type: 'time', timeRatio: 0.04 },
})
```

**Then you will get a following circle. ☺️**

## 📄 License

**MIT License**

---
&nbsp;

Start using cursorwith to make your website more vivid and interesting.

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>