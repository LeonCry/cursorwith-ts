# 创建实例

使用 ES6 Modules 引入并创建一个 CursorWith 实例。

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: {
    radius: 20,
    color: '#ddddddaa',
  },
  // 可选：指定容器，默认 document.body
  // container: document.body,
});

// 可选：使用跟随插件
cw.use(follow({ type: 'time', timeRatio: 0.04 }));
```

## 容器（`container`）

- 默认容器为 `document.body`。
- 可以传入任意 `Element` 作为容器，实例会在该容器中创建一个 `canvas`，并以固定定位覆盖页面。
::: danger 请注意
如果你使用了自定义的`Element`,请确保该`Element`上设置了`transform / perspective / filter`非 none 值,
否则可能会导致光标跟随圆无法正常显示。
:::
- 实例会在容器 `进入/离开` 时自动 `挂载/卸载` 事件。

```ts
const cw = new CreateCursorWith({
  style: { radius: 16, color: 'rgba(0,0,0,0.15)' },
  container: document.querySelector('#app')!,
});
```

## 样式（`style`）

::: info 说明
Style 配置主要用于调整光标跟随圆的颜色、边框、阴影、半径以及图像填充与动态变形效果。
:::

## 类型定义

```ts
// CursorWithOptions['style'] 
interface StyleOptions {
  // 基础
  radius: number
  color: string
  borderWidth?: number
  borderColor?: string
  // 阴影
  shadowBlur?: number
  shadowColor?: string
  shadowOffset?: [number, number]
  // 图像
  img?: string
  // 动态变形（随移动方向拉伸）
  deform?: { decay?: number }
}
```

## 使用说明

- `radius`：控制光标跟随圆的半径。
- `color`：控制填充颜色。
- `borderWidth` / `borderColor`：控制边框宽度与颜色。
- `shadowBlur` / `shadowColor` / `shadowOffset`：控制阴影模糊、阴影颜色与偏移量（`[x, y]`）。
  - 当设置了阴影且颜色非透明时，绘制会应用阴影效果。
- `img`：使用图片填充圆，渲染层级在基础圆形之上。
- `deform.decay`：根据鼠标移动方向，将圆动态拉伸为椭圆。
  - 值越小拉伸越明显（更易变形），值越大越接近圆形；未配置或为 `0` 时不变形。

## 示例
```ts
import { CreateCursorWith } from 'cursorwith-ts';

const cw = new CreateCursorWith({
  style: {
    // 基础外观
    radius: 16,
    color: 'rgba(0,0,0,0.12)',
    borderWidth: 2,
    borderColor: '#000',
    // 阴影
    shadowBlur: 20,
    shadowColor: 'rgba(0,0,0,0.35)',
    shadowOffset: [2, 4],
    // 图像填充（可选）
    img: '/assets/cursor.png',
    // 动态变形：随移动方向拉伸
    deform: { decay: 12 },
  },
});
```

> 说明：当启用 `deform` 且鼠标移动速度较快时，圆会沿着移动方向拉伸为椭圆；停下后回到圆形。

::: info 建议
在使用cursorwith-ts时,建议将全局样式设置为`* { cursor: none; }`.
:::

## 生命周期

- `cw.destroy()`：销毁实例并移除画布与事件。
- `cw.pause()` / `cw.resume()`：暂停/恢复绘制。

> 提示：组件卸载时务必调用 `destroy()` 以释放资源。