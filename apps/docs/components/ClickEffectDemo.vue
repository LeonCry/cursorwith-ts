<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { clickEffect, follow } from 'cursorwith-ts/use';
import { onMounted, ref, useTemplateRef } from 'vue';

const container = useTemplateRef<HTMLDivElement>('container');
const cw = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  if (!container.value) return;
  cw.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: '#ddddddaa',
    },
    container: container.value,
  });
  cw.value.use(follow({ type: 'time' }));
  cw.value.use(clickEffect());
});
const type = ref<'default' | 'custom'>('default');
function changeType(t: 'default' | 'custom') {
  type.value = t;
  if (t === 'default') {
    cw.value?.use(clickEffect());
  }
  else {
    cw.value?.use(clickEffect({
      customTrigger: () => [
        (p) => {
          // trigger：逐步加深颜色
          cw.value?.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 + 0.6 * p})` } });
        },
        (p) => {
          // restore：逐步回到原色
          const t = 1 - p;
          cw.value?.setOptions({ style: { radius: 20, color: `rgba(255,0,0,${0.4 * t})` } });
        },
      ],
    }));
  }
}
</script>

<template>
  <div ref="container" class="demo">
    <div class="btn-group">
      <button :class="{ active: type === 'default' }" @click="changeType('default')">
        default
      </button>
      <button :class="{ active: type === 'custom' }" @click="changeType('custom')">
        custom
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo {
  position: relative;
  perspective: 0;
  width: 100%;
  height: 500px;
  background-color: #f6f6f754;
}
.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.btn-group > button {
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #bbb9b940;
}
.active {
  border: 1px solid #ff7300;
  color: #ff7300;
}
</style>
