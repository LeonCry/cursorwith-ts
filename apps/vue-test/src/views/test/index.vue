<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-core';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: { radius: 10, color: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(0,0,0,1)' },
    follow: { type: 'time', timeRatio: 0.01 },
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
  </section>
</template>
