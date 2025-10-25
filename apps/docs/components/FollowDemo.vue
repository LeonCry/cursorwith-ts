<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, hoverEffect } from 'cursorwith-ts/use';
import { onMounted, ref, useTemplateRef } from 'vue';

const container = useTemplateRef<HTMLDivElement>('container');
const cw = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  if (!container.value) return;
  cw.value = new CreateCursorWith({
    style: {
      radius: 20,
      color: '#ddddddaa',
    },
    container: container.value,
  });
  cw.value.use(follow({ type: 'time' }));
  cw.value.use(hoverEffect({
    scope: { dataset: ['demo'] },
    padding: 10,
    duration: 1000,
    offset: 20,
    easing: 'bounce-out',
    style: {
      color: 'rgba(0,0,255,0.1)',
      borderColor: 'rgba(0,0,255,0.1)',
      shadowBlur: 40,
      shadowColor: 'rgba(0,0,255,0.1)',
      shadowOffset: [0, 0],
      borderWidth: 5,
    },
  }));
});
const type = ref<'time' | 'gap' | 'track' | 'spring'>('time');
function changeType(t: 'time' | 'gap' | 'track' | 'spring') {
  type.value = t;
  cw.value?.use(follow({ type: t }));
}
</script>

<template>
  <div ref="container" class="demo">
    <div class="btn-group">
      <button :class="{ active: type === 'time' }" @click="changeType('time')">
        time
      </button>
      <button :class="{ active: type === 'gap' }" @click="changeType('gap')">
        gap
      </button>
      <button :class="{ active: type === 'track' }" @click="changeType('track')">
        track
      </button>
      <button :class="{ active: type === 'spring' }" @click="changeType('spring')">
        spring
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo {
  position: relative;
  perspective: 0;
  width: 100%;
  height: 500px;
  background-color: #f6f6f754;
}
.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.btn-group > button {
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #bbb9b940;
}
.active {
  border: 1px solid #ff7300;
  color: #ff7300;
}
</style>
