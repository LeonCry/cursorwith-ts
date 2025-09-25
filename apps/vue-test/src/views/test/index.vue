<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-core';
import img from './my.png';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: { radius: 10, color: 'rgba(0,0,0,0.5)', borderWidth: 1, borderColor: 'rgba(0,0,0,1)', img },
    follow: { type: 'time', timeRatio: 0.1 },
  });
});
function handlePause() {
  cursorWith.value?.pause();
}
function handleResume() {
  cursorWith.value?.resume();
}
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
});
</script>

<template>
  <section class="w-full h-full p-2">
    <ElButton @click="handlePause">
      暂停
    </ElButton>
    <ElButton @click="handleResume">
      恢复
    </ElButton>
    <img :src="img">
  </section>
</template>
