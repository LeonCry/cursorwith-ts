# Install cursorwith

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

## Usage

> cursorwith supports ES6 Modules and CDN imports.

### ES6 Modules

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 20, color: '#ddddddaa' },
  container: document.body,
});

cw.use(follow({ type: 'time' }));
```

### CDN

```ts
import { CreateCursorWith } from 'https://unpkg.com/cursorwith-ts@latest/dist/core/index.js';
import { follow } from 'https://unpkg.com/cursorwith-ts@latest/dist/use/index.js';

const cw = new CreateCursorWith({
  style: { radius: 20, color: '#ddddddaa' },
  container: document.body,
});

cw.use(follow({ type: 'time' }));
```

### TypeScript support

cursorwith fully supports TypeScript with complete type definitions for all functions.

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import type { CursorWithOptions } from 'cursorwith-ts/types';

const style: CursorWithOptions['style'] = {
  radius: 20,
  color: '#ddddddaa',
};

const cw = new CreateCursorWith({ style });
```

## Environment requirements

- Modern browsers that support ES6 Modules