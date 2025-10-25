# 插件：NativeCursor

::: info 说明
NativeCursor 插件会额外绘制一个“原生大小”的小圆点，直接位于真实鼠标位置，常用于增强定位或形成双层光标效果。
:::

## 类型定义

```ts
interface NativeCursorOptions extends CommonStyle {
  radius?: number // 默认 4，小圆点半径
}
```

> `CommonStyle` 包含常见样式：`color`、`borderColor`、`borderWidth`、`shadowBlur`、`shadowColor`、`shadowOffset` 等。

## 使用示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { nativeCursor } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 18, color: '#ddddddaa' } });

cw.use(nativeCursor({
  radius: 5,
  color: 'red',
}));
```
<script setup>
import NativeCursorDemo from '../../../components/NativeCursorDemo.vue'
</script>

<ClientOnly>
  <NativeCursorDemo />
</ClientOnly>




## 行为说明

- 小圆点始终位于真实鼠标位置，与大圆的跟随策略互不影响；
- 小圆点样式独立于全局圆形样式；
- 在 `hoverEffect`、`tail` 等插件作用下仍会绘制，不参与矩形过渡或拖尾变化。

## 组合提示

- 与 `clickEffect` 搭配可形成点击时“外圈变化 + 内点定位”的双层反馈；
- 与 `inverse` 搭配时，整体画布的混合模式会影响视觉效果，可根据需要开启或关闭。