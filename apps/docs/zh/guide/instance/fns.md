# 实例方法

以下为 `CreateCursorWith` 实例的常用方法与事件。

## 使用/停用插件
- `cw.use(fn | fn[])`：安装一个或多个插件（如 `follow`、`hoverEffect`、`tail` 等）。
- `cw.stopUse(fn | fn[])`：卸载一个或同时卸载多个插件。

## 事件
- `cw.on(eventName, fn, uniqueId?)`：注册事件监听.
- `cw.off(eventName, fn | null, uniqueId?)`：注销事件监听。
::: warning 注意
其中`uniqueId`为可选参数,用于在注销事件时指定具体的监听函数。

如果不提供`uniqueId`,则默认使用`fn.name`作为`uniqueId`,请确保 `fn`不为箭头函数且`fn.name`唯一。
:::
- `cw.getEventResult(eventName, id)`：当监听函数返回 `{ id, result }` 时，可通过此方法根据 `id` 读取事件监听的结果。

可用事件名：
- `'mousemove'`:鼠标移动时事件
- `'mousedown'`:鼠标按下时事件
- `'mouseup'`:鼠标松开时事件
- `'mousewheel'`:鼠标滚轮滚动时事件
- `'loopBeforeDraw'`:每帧绘制前事件
- `'loopAfterDraw'`:每帧绘制后事件
- `'optionSetter'`:设置选项时事件
- `'optionGetter'`:获取选项时事件

示例：
```ts
cw.on('loopBeforeDraw', (t) => {
  // 每帧绘制前触发，可用于更新样式或计算
});

cw.on('mousedown', () => {
  // 鼠标按下
});
```

## 选项操作
- `cw.setOptions(options: CursorWithOptions)`：批量设置选项（会触发 `optionSetter` 事件）。
- `cw.getOptions()`：获取当前选项（访问时会触发 `optionGetter` 事件）。

## 位置与画布
- `cw.getCurrentPoint()`：获取当前圆心位置 `{ x, y }`。
- `cw.getTargetPoint()`：获取当前鼠标位置 `{ x, y }`。
- `cw.getCanvas()`：获取实例内部的 `canvas` 元素。
- `cw.updateBound()`：手动更新画布尺寸与容器边界。
::: warning 注意
如果你的容器尺寸发生变化（如窗口resize或容器尺寸变化），请手动调用 `updateBound()` 以更新画布尺寸与容器边界。
:::
