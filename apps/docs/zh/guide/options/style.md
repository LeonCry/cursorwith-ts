# 配置项：Style

::: info 说明
Style 配置主要用于调整光标跟随圆的颜色、边框与半径等样式。
:::

## 类型定义

```ts
// CursorWithOptions['style'] 
interface StyleOptions {
  radius: number
  color: string
  borderWidth?: number
  borderColor?: string
  img?: string
}
```

## 使用说明

- `radius`：控制光标跟随圆的半径。
- `color`：控制光标跟随圆的填充颜色。
- `borderWidth`：控制边框宽度。
- `borderColor`：控制边框颜色。
- `img`：控制光标跟随圆的填充图片。

  > 注意：`img` 的渲染层级会在光标跟随圆之上。

## 示例
```ts
import { CreateCursorWith } from 'cursorwith-ts';

// 实例
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