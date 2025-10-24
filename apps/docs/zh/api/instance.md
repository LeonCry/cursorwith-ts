# 实例公共方法

```ts{2}
const cw = new CreateCursorWith({
  //...
})
```
--- 

### cw.getCurrentPoint()

> 返回类型：`{ x:number, y:number }`

获取光标跟随圆的当前位置。

### cw.setStyle(style)

> 参数类型：
```ts
style: CursorWithOptions['style']
```

> 返回类型：`void`

修改当前光标跟随实例的样式。

### cw.setFollow(follow)

> 参数类型：
```ts
follow: CursorWithOptions['follow']
```

> 返回类型：`void`

修改当前光标跟随实例的跟随类型配置。

### cw.pause()

> 返回类型：`void`

暂停当前实例的运动效果及样式修改。

### cw.resume()

> 返回类型：`void`

恢复当前实例的运动效果。

::: warning
当实例处于暂停期间，若你更改了样式、跟随类型或其他配置，这些更改会在恢复瞬间立即生效。
:::

### cw.destroy()

> 返回类型：`void`

销毁当前实例并移除画布。

...