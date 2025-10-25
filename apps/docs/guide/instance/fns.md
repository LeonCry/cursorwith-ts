# Instance Methods

Common methods and events of a `CreateCursorWith` instance.

## Use/Stop Plugins
- `cw.use(fn | fn[])`: install one or more plugins (e.g. `follow`, `hoverEffect`, `tail`).
- `cw.stopUse(fn | fn[])`: uninstall one or more plugins.

## Events
- `cw.on(eventName, fn, uniqueId?)`: register an event listener.
- `cw.off(eventName, fn | null, uniqueId?)`: unregister an event listener.

::: warning
`uniqueId` is optional and can be used to identify a specific listener when unregistering.

If `uniqueId` is not provided, the system uses `fn.name` as the key. Ensure `fn` is not an arrow function and `fn.name` is unique.
:::

- `cw.getEventResult(eventName, id)`: when a listener returns `{ id, result }`, use this to read the result by `id` from the latest event call.

Available event names:
- `'mousemove'`: fired on mouse move
- `'mousedown'`: fired on mouse down
- `'mouseup'`: fired on mouse up
- `'mousewheel'`: fired on wheel scroll
- `'loopBeforeDraw'`: fired before each frame draw
- `'loopAfterDraw'`: fired after each frame draw
- `'optionSetter'`: fired when options are set
- `'optionGetter'`: fired when options are accessed

Example:
```ts
cw.on('loopBeforeDraw', (t) => {
  // runs before each frame; use for style updates or calculations
});

cw.on('mousedown', () => {
  // mouse down
});
```

## Options Ops
- `cw.setOptions(options: CursorWithOptions)`: batch set options (triggers `optionSetter`).
- `cw.getOptions()`: get current options (reads trigger `optionGetter`).

## Position & Canvas
- `cw.getCurrentPoint()`: get current circle center `{ x, y }`.
- `cw.getTargetPoint()`: get current mouse position `{ x, y }`.
- `cw.getCanvas()`: get the internal `canvas` element.
- `cw.updateBound()`: manually update canvas size and container bounds.

::: warning
If the container size changes (window resize or container resize), call `updateBound()` to sync canvas size and bounds.
:::