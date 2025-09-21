<script setup lang="ts">
import { CreateCursorWith } from '@cursor-with/core';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    radius: 20,
    color: '#42a5f5',
    type: 'time',
  });
});
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
});
</script>

<template>
  <section class="w-full h-full" />
</template>
