# 插件：Follow

::: info 说明
Follow 插件用于控制光标跟随圆的运动策略。现支持 4 种模式：`time`（固定时长）、`gap`（固定距离）、`track`（轨迹回放）、`spring`（弹簧）。
:::

## 类型定义

```ts
interface TimeFollow { type: 'time'; timeRatio?: number }      // 默认 0.1
interface GapFollow { type: 'gap'; distance?: number }         // 默认 5(px/帧)
interface TrackFollow { type: 'track'; delay?: number }        // 默认 500(ms)
interface SpringFollow { type: 'spring'; stiffness?: number; damping?: number } // 默认 0.05 / 0.25

type Follow = TimeFollow | GapFollow | TrackFollow | SpringFollow;
```

> 内部会根据实际设备的 FPS 对 `timeRatio` 和 `distance` 进行归一化处理，保持不同设备的运动感受一致。

## 使用说明

- 固定时长（`time`）
  - 通过 `timeRatio` 控制每帧向目标逼近的系数（默认 `0.1`）。值越小，移动越慢；值越大，越快。
  - 由于每帧的距离不同，速度曲线呈现缓动效果。

- 固定距离（`gap`）
  - 每一帧以固定像素数向目标移动（默认 `5px/帧`），整体速度恒定。

- 轨迹回放（`track`）
  - 记录鼠标移动轨迹并以 `delay` 延时进行回放（默认 `500ms`），
  - 效果类似“幽灵拖尾”沿着历史路径移动，适合制造回溯感。

- 弹簧（`spring`）
  - 以二阶弹簧模型向目标移动，`stiffness`（默认 `0.05`）控制“弹性”，`damping`（默认 `0.25`）控制“阻尼”。
  - 常见表现为稍许超调后回归稳定。

## 示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 20, color: '#ddddddaa' },
  container: document.getElementById('app')!,
});

// 1) 固定时长
cw.use(follow({ type: 'time', timeRatio: 0.1 }));

// 2) 固定距离
cw.use(follow({ type: 'gap', distance: 8 }));

// 3) 轨迹回放（延迟 400ms）
cw.use(follow({ type: 'track', delay: 400 }));

// 4) 弹簧（更强弹性与更大阻尼）
cw.use(follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }));
```

<script setup>
import FollowDemo from '../../../components/FollowDemo.vue'
</script>

<ClientOnly>
  <FollowDemo />
</ClientOnly>



## 小贴士
- 可随时切换或卸载：
  ```ts
  const f = follow({ type: 'time' });
  cw.use(f);
  cw.stopUse(f); // 卸载该插件
  ```
- 在使用同种插件时,不需要先卸载再使用新的配置,直接调用 `use` 即可默认替换旧配置。
- 在激活 `hoverEffect` 时，圆形会过渡为矩形覆盖目标元素；`follow` 仍会更新内部位置用于后续绘制与过渡。