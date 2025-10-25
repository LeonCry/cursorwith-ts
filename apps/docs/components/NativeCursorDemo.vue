<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, nativeCursor } from 'cursorwith-ts/use';
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
  cw.value.use(nativeCursor({
    radius: 5,
    color: 'red',
  }));
});
</script>

<template>
  <div ref="container" class="demo" />
</template>

<style scoped>
.demo {
  cursor: none;
  position: relative;
  perspective: 0;
  width: 100%;
  height: 400px;
  background-color: #f6f6f754;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo > h1 {
  letter-spacing: 10px;
  text-align: center;
  color: #444444;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: #ebebeb83;
  line-height: 2;
  font-size: 24px;
}
</style>
