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
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: 'black',
      borderWidth: 10,
      borderColor: 'black',
      shadowBlur: 20,
      shadowColor: 'black',
      shadowOffset: [0, 0],
      deform: { decay: 10 },
    },
  });
  cursorWith.value.use(follow({ type: 'spring', stiffness: 0.05, damping: 0.25 }));
  cursorWith.value.use(tail({ length: 10, color: 'rgba(0,0,0,0.2)' }));
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
      color: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(0,0,0,0.5)',
      shadowBlur: 40,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: [0, 0],
      borderWidth: 5,
    },
  }));
  cursorWith.value.use(clickEffect());
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
    <div class="h-[200px] w-[200px] bg-blue-100 text-rounded mt-20 ml-20" data-test />
  </section>
</template>

<style scoped>
.text-rounded {
  border-radius: 10px 8px 6px 4px;
}
</style>
