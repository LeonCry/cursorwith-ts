# 插件：Inverse

::: info 说明
Inverse 插件可以让光标图形与页面内容产生反相效果，适合在浅色或深色背景上提升可读性与对比度。
:::

## 类型定义

```ts
interface InverseOptions {}
```

> 插件本身无需额外参数，使用 `cw.use(inverse())` 即可开启， `cw.stopUse(inverse())` 后即关闭。

## 使用示例

```ts
import { CreateCursorWith } from 'cursorwith-ts/core';
import { inverse } from 'cursorwith-ts/use';

const cw = new CreateCursorWith({ style: {
    radius: 40,
    color: 'white',
    borderColor: 'black',
    borderWidth: 20,
    shadowBlur: 40,
    shadowColor: 'white',
    } 
});

cw.use(inverse()); // 开启反相
// cw.stopUse(inverse()); // 如需关闭（示例）
```
<script setup>
import InverseDemo from '../../../components/InverseDemo.vue'
</script>

<ClientOnly>
  <InverseDemo />
</ClientOnly>





## 行为说明

- 开启后，画布的混合模式将会改变，光标颜色与背景产生反相对比；
- 与其他绘制类插件（如 `nativeCursor`、`tail`）叠加时，整体视觉风格统一受混合模式影响；
- 关闭插件后，画布将会恢复为普通混合模式。

## 组合提示

- 在色彩复杂或图像背景上使用可显著提升光标可见性；
- 如页面本身使用了特殊混合模式，建议先在局部测试，避免影响整体设计。