# 实例 API

本文档介绍如何创建实例，以及实例可用的方法与事件。

## 创建实例

```ts
import { CreateCursorWith } from 'cursorwith-ts';
import { follow, hoverEffect, tail } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 18, color: 'rgba(255,255,255,0.85)' },
  container: document.body, // 可选，默认 document.body
});

// 启用插件示例
cw.use([
  follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }),
  tail({ length: 10, color: 'rgba(255,255,255,0.2)' }),
  hoverEffect({
    scope: { dataset: ['demo'], class: ['demo'] },
    style: { color: 'rgba(255,255,255,0.35)' },
  }),
]);
```

- 画布将自动追加到 `container`，并在 `mouseenter` 时注册监听，在 `mouseleave` 时移除监听。
- 样式默认项会自动填充（如 `borderWidth=0`、`shadowBlur=0`、`borderColor='transparent'` 等）。

## 公共方法

- `use(fn | fn[])`：启用插件。若重复启用同名插件，将先卸载旧实例再启用新实例。
- `stopUse(fn | fn[])`：卸载插件。会调用插件的 `execute(false)` 并清理相关事件。
- `on(eventName, fn, uniqueId?)`：注册监听，`uniqueId` 不传时取函数名作为键。
- `off(eventName, fn|null, uniqueId?)`：移除监听，键为 `uniqueId` 或函数名。
- `getEventResult(eventName, id)`：读取事件最近一轮调用中对应 `id` 的返回结果。
- `getCanvas()`：返回内部 `HTMLCanvasElement`。
- `pause()`：暂停主循环（`cancelAnimationFrame`）。
- `resume()`：恢复主循环（`requestAnimationFrame`）。
- `setOptions(options)`：深拷贝并合入当前选项。仅更新配置，不负责启停插件。
- `getOptions()`：取得当前选项（带代理，用于拦截 get/set 触发事件）。
- `getCurrentPoint()`：当前主要圆中心点（容器坐标系）。
- `getTargetPoint()`：当前鼠标目标点（容器坐标系）。
- `updateBound()`：同步容器尺寸到画布（宽高更新）。
- `destroy()`：销毁实例，停止循环、卸载所有插件、移除监听与画布。

## 事件系统

支持的事件名：
- `mousemove`：鼠标移动时触发，更新 `targetPoint`。
- `mousedown`、`mouseup`：鼠标按下/抬起。
- `mousewheel`：滚动时触发，内部会调用 `updateBound()`。
- `loopBeforeDraw`：每帧绘制前触发（参数为时间戳）。
- `loopAfterDraw`：每帧绘制后触发（参数为时间戳）。
- `optionSetter`：`options` 被设置属性时触发。
- `optionGetter`：`options` 被访问属性时触发。

示例：
```ts
cw.on('loopAfterDraw', (t) => {
  // 做一些统计或调试
  return { time: t };
}, 'debug');

const r = cw.getEventResult('loopAfterDraw', 'debug');
// r === { time: ... }
```

## 画布与渲染

- 画布样式固定为：`position: fixed`、`top: 0`、`left: 0`、`pointer-events: none`、`z-index: 114514`、`mix-blend-mode: normal`。
- 主圆在 `loop` 中按需绘制，开启 `hoverEffect` 时会在矩形态与圆形态间切换。
- 开启 `inverse` 插件时，`mix-blend-mode` 会切换为 `difference`，形成反相效果。

## 坐标说明

- `currentPoint` 与 `targetPoint` 均为相对容器的坐标。
- `mousemove` 时通过 `clientX/Y - containerRect.left/top` 转换为容器坐标。

## 选项代理说明

- `options` 为带代理的对象，访问或设置属性会触发 `optionGetter`/`optionSetter` 事件。
- 该机制用于插件/外部对配置变更与读取的观察（例如点击动画读取/修改半径）。

## 注意事项

- 启用/关闭插件请使用 `use`/`stopUse`，仅通过 `setOptions` 设置某插件配置不会自动启用。
- 当容器尺寸变化时可调用 `updateBound()` 以确保画布与坐标系一致。