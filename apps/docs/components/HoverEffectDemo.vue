<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, hoverEffect } from 'cursorwith-ts/use';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

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
  cw.value.use(hoverEffect({
    scope: { dataset: ['demo'] },
    padding: 10,
    duration: 1000,
    offset: 20,
    easing: 'bounce-out',
    style: {
      color: 'rgba(0,0,255,0.1)',
      borderColor: 'rgba(0,0,255,0.1)',
      shadowBlur: 40,
      shadowColor: 'rgba(0,0,255,0.1)',
      shadowOffset: [0, 0],
      borderWidth: 5,
    },
  }));
});
onBeforeUnmount(() => {
  if (!container.value) return;
  cw.value?.destroy();
});
</script>

<template>
  <div ref="container" class="demo">
    <h1 data-demo>
      WELCOME TO USE CURSORWITH-TS
    </h1>
  </div>
</template>

<style scoped>
.demo {
  position: relative;
  perspective: 0;
  width: 100%;
  height: 500px;
  background-color: #f6f6f754;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo > h1 {
  letter-spacing: 10px;
  width: 80%;
  text-align: center;
  color: #444444;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: #ebebeb83;
  line-height: 2;
  font-size: 24px;
}
</style>
