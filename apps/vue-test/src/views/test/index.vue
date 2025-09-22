<script setup lang="ts">
import { CreateCursorWith } from '@cursor-with/core';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: { radius: 20, color: 'rgba(0,0,0,0.1)', borderWidth: 2, borderColor: 'rgba(0,0,0,1)' },
    follow: { type: 'time', timeRatio: 0.04 },
  });
  setTimeout(() => {
    cursorWith.value?.destroy();
  }, 3000);
});
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
});
</script>

<template>
  <section class="w-full h-full" />
</template>
