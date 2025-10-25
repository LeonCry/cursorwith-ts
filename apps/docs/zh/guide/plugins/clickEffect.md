# 插件：ClickEffect

::: info 说明
ClickEffect 插件在鼠标按下与抬起时触发两段动画：按下（trigger）阶段与还原（restore）阶段。支持自定义缓动、时长及触发逻辑。
:::

## 类型定义

```ts
interface ClickEffectOptions {
  customTrigger?: () => [
    (progress: number) => any, // trigger 阶段自定义动画（0→1）
    (progress: number) => any, // restore 阶段自定义动画（0→1）
    // progress为当前动画进度（0~1）
  ]
  //ease?: [trigger阶段动画效果配置, restore阶段动画效果配置] 
  ease?: [EasingInput, EasingInput] // 默认 ['ease-out', 'spring-out']
  duration?: number                 // 动画持续时间,默认 600(ms)
}
```

> 默认行为：
> - trigger 阶段：圆半径向 0.8× 原始半径收缩；
> - restore 阶段：圆半径从收缩状态回归原始半径；
> - 两段动画均使用独立的缓动与统一的时长（可覆盖）。

## 使用示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { clickEffect } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: { radius: 20, color: '#ddddddaa' } });

// 简单启用（默认缓动与时长）
cw.use(clickEffect());

// 自定义缓动与时长
cw.use(clickEffect({ ease: ['quad-out', 'spring-out'], duration: 800 }));

// 自定义触发逻辑（示例：按下变红、抬起恢复）
cw.use(clickEffect({
  customTrigger: () => [
    (p) => {
      // trigger：逐步加深颜色
      cw.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 + 0.6 * p})` } });
    },
    (p) => {
      // restore：逐步回到原色
      const t = 1 - p;
      cw.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 * t})` } });
    },
  ],
}));
```

<script setup>
import ClickEffectDemo from '../../../components/ClickEffectDemo.vue'
</script>

<ClientOnly>
  <ClickEffectDemo />
</ClientOnly>




## 组合提示

- 与 `nativeCursor` 搭配可形成“外圈动画 + 内点定位”的点击反馈；
- 与 `hoverEffect` 不冲突，矩形覆盖期间仍会响应点击；
- 建议适度调整 `duration` 与 `ease` 以匹配整体动效节奏。