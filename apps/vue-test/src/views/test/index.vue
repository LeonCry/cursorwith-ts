<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts';

const cursorWith = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  cursorWith.value = new CreateCursorWith({
    style: { radius: 10, color: 'rgba(0,0,0,0.2)', borderWidth: 1, borderColor: 'rgba(0,0,0,1)' },
    follow: { type: 'track', delay: 2000 },
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
  <section class="w-full h-full p-2">
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
  </section>
</template>
