# 插件：Tail

::: info 说明
Tail 插件会在光标圆后绘制一条“丝带式”拖尾曲线，支持长度、颜色与点状间隔配置。
:::

## 类型定义

```ts
interface Tail {
  length?: number       // 默认 10，记录的最大轨迹点数
  color?: string        // 默认 '#00000033'，拖尾颜色（透明度建议偏低）
  firstDockGap?: number // 默认 0，靠近圆心的首段间隔（跳过若干段）
  dockGap?: number      // 默认 0，后续段的间隔（形成点状效果）
}
```

## 使用示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { tail } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 18, color: '#ddddddaa' } });

cw.use(tail({
  length: 14,
  color: 'rgba(0,0,0,0.25)',
  firstDockGap: 0,
  dockGap: 0,
}));
```
<script setup>
import TailDemo from '../../../components/TailDemo.vue'
</script>

<ClientOnly>
  <TailDemo />
</ClientOnly>



## 行为说明

- 拖尾宽度与透明度会沿着轨迹渐变，靠近圆心的片段更粗更实，远端更细更淡；
- `length` 越大拖尾越长，但过大可能影响性能；
- `firstDockGap` 与 `dockGap` 可形成点状或断续拖尾：
  - `firstDockGap` 只影响最靠近圆心的若干段；
  - `dockGap` 影响后续所有段的间隔；
- 悬停到目标元素（`hoverEffect` 激活）时，拖尾会自动关闭，离开后恢复绘制。

## 组合提示

- 与 `follow` 模式搭配时可获得更丰富的拖尾动态效果；
- 与 `hoverEffect` 同时开启适合强调元素聚焦，避免绘制冲突由系统自动处理。