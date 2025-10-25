# Instance API

This document explains how to create an instance and all available methods and events.

## Create an Instance

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, hoverEffect, tail } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({
  style: { radius: 18, color: 'rgba(255,255,255,0.85)' },
  container: document.body, // optional; defaults to document.body
});

// Enable plugins
cw.use([
  follow({ type: 'spring', stiffness: 0.06, damping: 0.3 }),
  tail({ length: 10, color: 'rgba(255,255,255,0.2)' }),
  hoverEffect({
    scope: { dataset: ['demo'], class: ['demo'] },
    style: { color: 'rgba(255,255,255,0.35)' },
  }),
]);
```

- The canvas is appended to `container` automatically, listeners attach on `mouseenter` and detach on `mouseleave`.
- Style defaults are auto-filled (e.g. `borderWidth=0`, `shadowBlur=0`, `borderColor='transparent'`).

## Public Methods

- `use(fn | fn[])`: enable plugins. Re-enabling the same plugin first uninstalls the old instance then enables the new one.
- `stopUse(fn | fn[])`: uninstall plugins. Calls `execute(false)` for the plugin and cleans related events.
- `on(eventName, fn, uniqueId?)`: register a listener. If `uniqueId` is omitted, the function name is used as the key.
- `off(eventName, fn|null, uniqueId?)`: remove a listener by `uniqueId` or the function name.
- `getEventResult(eventName, id)`: read the return value keyed by `id` from the latest event call.
- `getCanvas()`: get the internal `HTMLCanvasElement`.
- `pause()`: pause the main loop (`cancelAnimationFrame`).
- `resume()`: resume the main loop (`requestAnimationFrame`).
- `setOptions(options)`: deep-clone and merge options. This updates config only; it does not auto-start or stop plugins.
- `getOptions()`: get the current options (proxied object that intercepts get/set to trigger events).
- `getCurrentPoint()`: current main circle center (container coordinates).
- `getTargetPoint()`: current mouse target (container coordinates).
- `updateBound()`: sync container size to the canvas (update width/height).
- `destroy()`: destroy the instance, stop loop, uninstall all plugins, remove listeners and canvas.

## Event System

Supported event names:
- `mousemove`: fires on mouse move; updates `targetPoint`.
- `mousedown`, `mouseup`: mouse down/up.
- `mousewheel`: fires on scroll; internally calls `updateBound()`.
- `loopBeforeDraw`: fires before each frame draw (argument is timestamp).
- `loopAfterDraw`: fires after each frame draw (argument is timestamp).
- `optionSetter`: fires when setting option properties.
- `optionGetter`: fires when accessing option properties.

Example:
```ts
cw.on('loopAfterDraw', (t) => {
  // do some logging or debugging
  return { time: t };
}, 'debug');

const r = cw.getEventResult('loopAfterDraw', 'debug');
// r === { time: ... }
```

## Canvas & Rendering

- Canvas style is fixed: `position: fixed`, `top: 0`, `left: 0`, `pointer-events: none`, `z-index: 114514`, `mix-blend-mode: normal`.
- The main circle draws in the `loop`; when `hoverEffect` is enabled, it transitions between rectangle and circle.
- When `inverse` is enabled, `mix-blend-mode` switches to `difference` to produce inverse contrast.

## Coordinates

- `currentPoint` and `targetPoint` are both container-relative coordinates.
- On `mousemove`, values are computed using `clientX/Y - containerRect.left/top`.

## Options Proxy

- `options` is proxied; getting or setting properties triggers `optionGetter`/`optionSetter` events.
- This mechanism lets plugins or external code observe changes and reads (e.g. click animation adjusts radius).

## Notes

- Use `use`/`stopUse` to enable/disable plugins. Merely setting a plugin’s options via `setOptions` does not auto-enable it.
- Call `updateBound()` when container size changes to keep canvas and coordinates in sync.