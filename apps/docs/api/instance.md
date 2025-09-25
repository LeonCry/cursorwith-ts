# Instance Public Methods

```ts{2}
const cw = new CreateCursorWith({
//...
})
```
--- 

### cw.getCurrentPoint()

> *return type: `{ x:number,y:number }`*

Get the current position of the cursor follower.


### cw.setStyle(style)

> *params type:*
```ts
style:CursorWithOptions['style']
```

> *return type: `void`*

Modify the style of the current cursor follower.

### cw.setFollow(follow)

> *params type:*
```ts
follow:CursorWithOptions['follow']
```

> *return type: `void`*

Change the follow mode of the current cursor follower.


### cw.pause()

> *return type: `void`*

Pause the movement effects and all style modifications of the current instance.



### cw.resume()

> *return type: `void`*

Resume the movement effects of the current instance.

::: warning 
Any changes made to the cursor follower’s style, follow type, or other options while paused will be applied the instant it is resumed.
:::


### cw.destroy()

> *return type: `void`*

Destroy the current instance and remove the canvas.

...
