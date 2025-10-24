<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import {
  clickEffect,
  follow,
  hoverEffect,
  inverse,
  nativeCursor,
  tail,
} from 'cursorwith-ts/use';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
const container = ref<HTMLDivElement | null>(null);
onMounted(() => {
  if (!container.value) return;
  cursorWith.value = new CreateCursorWith({
    config: {
      radius: 20,
      color: 'black',
      borderWidth: 10,
      borderColor: 'black',
      shadowBlur: 20,
      shadowColor: 'black',
      shadowOffset: [0, 0],
      deform: { decay: 10 },
    },
    container: container.value,
  });
  cursorWith.value.use(follow({ type: 'time', timeRatio: 0.1 }));
  cursorWith.value.use(hoverEffect({
    flash: {
      active: false,
      duration: 1000,
      easing: 'linear',
    },
    scope: { dataset: ['test'] },
    offset: 10,
    padding: 5,
    duration: 1000,
    easing: 'bounce-out',
    style: {
      color: 'black',
      borderColor: 'black',
      shadowBlur: 40,
      shadowColor: 'black',
      shadowOffset: [0, 0],
      borderWidth: 5,
    },
  }));
  cursorWith.value.use(clickEffect());
  cursorWith.value.use(tail({ length: 10, color: 'rgba(0,0,0,0.2)' }));
  cursorWith.value.use(nativeCursor({
    radius: 5,
    color: 'red',
    borderWidth: 2,
    borderColor: 'yellow',
    shadowBlur: 20,
    shadowColor: 'yellow',
    shadowOffset: [0, 0],
  }));
  cursorWith.value.use(inverse());
  cursorWith.value.stopUse(inverse());
  setTimeout(() => {
    container.value!.style.width = '2000px';
    cursorWith.value?.updateBound();
  }, 3000);
});
onBeforeUnmount(() => {
  cursorWith.value?.destroy();
  cursorWith.value = null;
});

function handlePause() {
  cursorWith.value?.pause();
}
function handleResume() {
  cursorWith.value?.resume();
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') handlePause();
  else if (e.code === 'Enter') handleResume();
});
</script>

<template>
  <section class="w-full h-full p-2 bg-white overflow-auto">
    <div class="h-[200px]" />
    <div ref="container" class="w-[8000px] h-[400px] bg-red-50 relative ml-40 mt-40 perspective-[0]" />
  </section>
</template>

<style scoped>
.text-rounded {
  border-radius: 10px 8px 6px 4px;
}
</style>
