# Create

--- 
### 类 CreateCursorWith

> 创建一个光标跟随实例。

#### constructor(options)

> 参数类型：
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