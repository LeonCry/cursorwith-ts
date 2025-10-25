<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, inverse } from 'cursorwith-ts/use';
import { onMounted, ref, useTemplateRef } from 'vue';

const container = useTemplateRef<HTMLDivElement>('container');
const cw = ref<InstanceType<typeof CreateCursorWith> | null>(null);
onMounted(() => {
  if (!container.value) return;
  cw.value = new CreateCursorWith({
    style: {
      radius: 40,
      color: 'white',
      borderColor: 'black',
      borderWidth: 20,
      shadowBlur: 40,
      shadowColor: 'white',
    },
    container: container.value,
  });
  cw.value.use(follow({ type: 'time' }));
  cw.value.use(inverse());
});
const type = ref<'normal' | 'inverse'>('inverse');
function changeType(t: 'normal' | 'inverse') {
  type.value = t;
  if (t === 'normal') {
    cw.value?.stopUse(inverse());
  }
  else {
    cw.value?.use(inverse());
  }
}
</script>

<template>
  <div ref="container" class="demo">
    <div class="btn-group">
      <button :class="{ active: type === 'normal' }" @click="changeType('normal')">
        normal
      </button>
      <button :class="{ active: type === 'inverse' }" @click="changeType('inverse')">
        inverse
      </button>
    </div>
    <div class="demo-content">
      <p>this is a demo, and you can switch between normal and inverse mode.</p>
      <br>
      <p class="demo-text">
        you can switch between normal and inverse mode by clicking the buttons above.
      </p>
    </div>
  </div>
</template>

<style scoped>
.demo {
  position: relative;
  perspective: 0;
  width: 100%;
  height: 400px;
  background-color: rgb(250, 201, 255);
  color: black;
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

.demo-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.demo-text {
  background-color: #00ffea;
  color: blue;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>
