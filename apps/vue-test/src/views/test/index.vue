<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: 'red',
      borderWidth: 10,
      borderColor: 'red',
      shadowBlur: 20,
      shadowColor: 'red',
      shadowOffset: [0, 0],
    },
    inverse: true,
    deform: { active: true, decay: 10 },
    tail: { show: true, length: 10, color: 'rgba(255,255,255,0.2)' },
    follow: { type: 'time', timeRatio: 0.1 },
    hoverEffect: {
      active: true,
      flash: {
        active: false,
        duration: 1000,
        easing: 'linear',
      },
      scope: { dataset: ['test'] },
      padding: 5,
      duration: 1000,
      easing: 'bounce-out',
      style: {
        color: 'green',
        borderColor: 'green',
        shadowBlur: 40,
        shadowColor: 'green',
        shadowOffset: [0, 0],
        borderWidth: 5,
      },
    },
    nativeCursor: {
      show: true,
      radius: 5,
      color: 'red',
      borderWidth: 2,
      borderColor: 'yellow',
      shadowBlur: 20,
      shadowColor: 'yellow',
      shadowOffset: [0, 0],
    },
    clickEffect: true,
  });
});

function handlePause() {
  cursorWith.value?.pause();
}
function handleResume() {
  cursorWith.value?.resume();
}
function handleStyleChange() {
  cursorWith.value?.setStyle({ color: 'rgba(255,0,0,0.2)', borderColor: 'rgba(255,0,0,1)', radius: 20 });
}
function handleFollowChange() {
  cursorWith.value?.setFollow({ type: 'gap', distance: 10 });
}
function handleDestroy() {
  cursorWith.value?.destroy();
  cursorWith.value = null;
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') handlePause();
  else if (e.code === 'Enter') handleResume();
});
</script>

<template>
  <section class="w-full h-full p-2 cursor-none bg-white">
    <ElButton @click="handlePause">
      暂停 (Space)
    </ElButton>
    <ElButton @click="handleResume">
      恢复 (Enter)
    </ElButton>
    <ElButton @click="handleStyleChange">
      更改style
    </ElButton>
    <ElButton @click="handleFollowChange">
      更改follow
    </ElButton>
    <ElButton type="danger" @click="handleDestroy">
      销毁
    </ElButton>

    <button data-test class="absolute bottom-25 left-1/2 border p-4 z-10 text-rounded">
      外元素
      <p class="px-4 border border-blue-100">
        内元素
      </p>
    </button>

    <button data-test class="absolute bottom-25 left-1/4 border p-4 z-10 text-rounded">
      外元素2
      <p class="px-4 border border-blue-100">
        内元素2
      </p>
    </button>

    <TestTable class=" absolute top-1/2 -translate-y-1/2" />
  </section>
</template>

<style scoped>
.text-rounded {
  border-radius: 10px 8px 6px 4px;
}
</style>
