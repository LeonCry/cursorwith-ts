<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import {
  clickEffect,
  follow,
  hoverEffect,
  inverse,
  nativeCursor,
  tail,
  updateTargetInHover,
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
const ml = ref(160);
const width = ref(200);
setTimeout(() => {
  ml.value = 400;
  width.value = 50;
  updateTargetInHover();
}, 3000);
</script>

<template>
  <section ref="test" class=" border w-[1000px] h-[600px] ml-[250px] mt-[100px] p-2 bg-white overflow-auto">
    <div class="h-200 w-[2000px]" />
    <div
      id="1"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[50px] bg-blue-100 text-rounded mt-40"
      data-test
    >
      1
    </div>
    <div
      id="2"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[50px] bg-blue-100 text-rounded mt-5"
      data-test
    >
      2
    </div>
    <div
      id="3"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[50px] bg-blue-100 text-rounded mt-5"
      data-test
    >
      3
    </div>
    <div
      id="4"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[50px] bg-blue-100 text-rounded mt-5"
      data-test
    >
      4
    </div>
    <div
      id="5"
      :style="`margin-left: ${ml}px;width:${width}px;`"
      class="h-[50px] bg-blue-100 text-rounded mt-5"
      data-test
    >
      5
    </div>
    <div class="h-200" />
  </section>
</template>

<style scoped>
.text-rounded {
  border-radius: 10px 8px 6px 4px;
}
</style>
