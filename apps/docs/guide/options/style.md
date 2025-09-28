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
  img?:string
}
```

## Usage

- `radius` : Controls the radius of the cursor follower.

- `color` : Controls the fill color of the cursor follower.

- `borderWidth` : Controls the border width of the cursor follower.

- `borderColor` : Controls the border color of the cursor follower.

- `img` : Controls the fill image of the cursor follower.

  > Note : The rendering level of `img` will be above the cursor follower.


## Example
```ts
import { CreateCursorWith } from '@leoncry/cursorwith-ts';

// instance
const cw = new CreateCursorWith({
  style: { 
    radius: 10, 
    color: 'rgba(0,0,0,0.1)', 
    borderWidth: 1, 
    borderColor: '#000000',
    img: './picture.png'
    }
})
```