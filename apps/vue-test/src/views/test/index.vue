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
const container = useTemplateRef('test');
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: 'black',
      borderWidth: 10,
      borderColor: 'yellow',
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
    offset: 20,
    padding: 5,
    duration: 1000,
    easing: 'bounce-out',
    style: {
      color: 'rgba(0,0,0,0.5)',
      borderColor: 'rgba(255,0,0,0.5)',
      borderWidth: 2,
    },
    container: container.value!,
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
onUnmounted(() => {
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
const ml = ref(160);
const width = ref(200);
</script>

<template>
  <section
    ref="test"
    class=" border w-[1000px] h-[600px] ml-[25px] mt-[100px] p-2 bg-white overflow-auto grid grid-cols-4 gap-4"
  >
    <div
      v-for="v in 100"
      id="1"
      :key="v"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[300px] bg-blue-100 text-rounded "
      data-test
    >
      {{ v }}
    </div>
  </section>
  <div class="h-300" />
</template>

<style scoped>
.text-rounded {
  border-radius: 10px 8px 6px 4px;
}
</style>
