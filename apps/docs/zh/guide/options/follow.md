# 配置项：Follow

::: info 说明
Follow 配置主要用于调整光标跟随圆的跟随类型与参数。
:::

## 类型定义

```ts
// 固定时长跟随类型
interface TimeFollow {
  type: 'time'
  timeRatio?: number
}
// 固定距离跟随类型
interface GapFollow {
  type: 'gap'
  distance?: number
}

type Follow = TimeFollow | GapFollow;
```

## 使用说明

提供两种跟随策略：`固定距离` 与 `固定时长`，两者产生不同的运动体验。

- 固定距离

在每一帧中，跟随圆都会前进固定像素数，因而从起点到终点速度完全一致。

- 固定时长

跟随圆必须在设定时长内到达目标，由 `timeRatio` 进行时间缩放。由于每一帧的距离不同，速度曲线并非均匀，呈现缓动效果。

参数速查：

- `distance`：每一帧前进像素（固定距离模式）
- `timeRatio`：时间缩放因子；值越小移动越慢（固定时长模式）

## 示例

```ts{5,14}
import { CreateCursorWith } from 'cursorwith-ts';

// 固定时长跟随实例
const cw = new CreateCursorWith({
  //...
  follow: {
    type: 'time',
    timeRatio: 0.04
  }
})

// 固定距离跟随实例
const cw = new CreateCursorWith({
  //...
  follow: {
    type: 'gap',
    distance: 100,
  }
})
```