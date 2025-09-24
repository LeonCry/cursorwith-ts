# Option: Style

::: info INTRODUCE
Style configuration mainly adjusts the cursor follower’s color, border, and radius...
:::

## Type

```ts
// CursorWithOptions['style'] 
interface StyleOptions {
  radius: number
  color: string
  borderWidth?: number
  borderColor?: string
}
```

## Example
```ts
import { CreateCursorWith } from 'cursorwith-core';

// instance
const cw = new CreateCursorWith({
  style: { 
    radius: 10, 
    color: 'rgba(0,0,0,0.1)', 
    borderWidth: 1, 
    borderColor: '#000000' 
    }
})
```