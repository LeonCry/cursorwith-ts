# Create

--- 
### Class CreateCursorWith

> Create a cursor follower instance.

#### constructor(options)

> *params type:*
```ts
interface StyleOptions {
  radius: number
  color: string
  img?: string
  borderWidth?: number
  borderColor?: string
}

interface TimeFollow {
  type: 'time'
  timeRatio?: number
}

interface GapFollow {
  type: 'gap'
  distance?: number
}

type Follow = TimeFollow | GapFollow;

options: {
    style: StyleOptions,
    follow?: Follow
}

```