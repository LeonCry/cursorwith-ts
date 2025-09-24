# Cursorwith Install

::: code-group
```bash [npm]
npm install cursorwith
```
```bash [pnpm]
pnpm add cursorwith
```
```bash [yarn]
yarn add cursorwith
```
:::

## Usage

> [!TIP]
> cursorwith only support **ES6 Modules** and **CDN**.

### ES6 Modules

```ts
import { CreateCursorWith } from 'cursorwith-core';

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

cursorwith fully support TypeScript, with complete type definitions for all functions.

```ts
import { CreateCursorWith } from 'cursorwith-core';
import type { CursorWithOptions } from 'cursorwith-core';

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