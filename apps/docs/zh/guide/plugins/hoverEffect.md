# 插件：HoverEffect

::: info 说明
当鼠标悬停于指定元素时，圆形将过渡为带圆角矩形覆盖目标区域，并可设置过渡时长、动画、边距与位移，同时支持闪烁（flash）与独立样式。
:::

## 类型定义

```ts
interface HoverEffectScope {
  dataset?: string[] // 通过 data-* 选择，如 data-demo
  class?: string[]   // 通过 class 选择，如 .demo
}

interface HoverEffect {
  scope?: HoverEffectScope
  padding?: number        // 默认 0，矩形相对目标元素的额外内边距
  offset?: number         // 默认 0，目标元素的轻微位移（模拟跟随）
  duration?: number       // 默认 600(ms)，过渡时长
  easing?: EasingInput    // 默认 'ease-out'，过渡缓动
  flash?: {
    active?: boolean      // 默认 false，开启后在悬停期间进行闪烁
    duration?: number     // 默认 600(ms)，闪烁周期
    easing?: EasingInput  // 默认 'sine-in-out'，闪烁缓动
  }
  style?: CommonStyle     // 独立样式
}
```

## 选择生效元素（scope）

- `dataset`：根据元素的 `data-*` 选择，例如 `data-demo`；
- `class`：根据元素的类名选择，例如 `.demo`；
- 两者可同时使用，满足任一条件即匹配目标。

示例 HTML：
```html
<div data-demo class="demo">hover me</div>
```

## 使用示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { hoverEffect } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 18, color: '#e0e0e0', borderColor: '#222', borderWidth: 1 },
});

cw.use(hoverEffect({
  scope: { dataset: ['demo'] },
  padding: 10,
  duration: 1000,
  offset: 20,
  easing: 'bounce-out',
  style: {
    color: 'rgba(0,0,255,0.1)',
    borderColor: 'rgba(0,0,255,0.1)',
    shadowBlur: 40,
    shadowColor: 'rgba(0,0,255,0.1)',
    shadowOffset: [0, 0],
    borderWidth: 5,
  },
}));
```

<script setup>
import HoverEffectDemo from '../../../components/HoverEffectDemo.vue'
</script>

<ClientOnly>
  <HoverEffectDemo />
</ClientOnly>



## 行为说明

- 进入目标元素：圆形过渡为带圆角(`根据触发元素圆角的大小计算`)矩形覆盖目标区域；
- 离开目标元素：矩形平滑过渡回圆形；
- `padding` 扩展覆盖范围；`offset` 为目标元素制造轻微位移以增强跟随感；
- `flash` 开启后，在悬停期间做周期性亮度/透明度变化；
- `style` 仅在悬停期间生效，不影响全局圆形样式。

## 组合提示

- 与 `tail` 插件一起使用时，悬停期间拖尾会自动关闭，离开后恢复；
- 可与 `follow` 各模式同时使用，矩形过渡期间仍会平滑衔接定位。