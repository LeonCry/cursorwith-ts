# Cursorwith 安装

::: code-group
```sh [npm]
npm install cursorwith-ts
```
```sh [pnpm]
pnpm add cursorwith-ts
```
```sh [yarn]
yarn add cursorwith-ts
```
:::

## 使用

> [!TIP]
> cursorwith 仅支持 **ES6 Modules** 与 **CDN** 引入方式。

### ES6 Modules

```ts
import { CreateCursorWith } from 'cursorwith-ts';

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

### TypeScript 支持

cursorwith 完整支持 TypeScript，所有函数均提供完备类型定义。

```ts
import { CreateCursorWith } from 'cursorwith-ts';
import type { CursorWithOptions } from 'cursorwith-ts';

const options: CursorWithOptions = {
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

## 环境要求

- 支持 ES6 Modules 的现代浏览器
- 不支持 IE 浏览器