<script setup lang="ts">
import { CreateCursorWith } from 'cursorwith-ts/core';
import { follow, tail } from 'cursorwith-ts/use';
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
  cw.value.use(tail({
    length: 20,
    color: '#ddddddaa',
    firstDockGap: 0,
    dockGap: 0,
  }));
});
const type = ref<'default' | 'use:dockGap' | 'use:firstDockGap'>('default');
function changeType(t: 'default' | 'use:dockGap' | 'use:firstDockGap') {
  type.value = t;
  if (t === 'default') {
    cw.value?.use(tail({
      length: 20,
      color: '#ddddddaa',
      firstDockGap: 0,
      dockGap: 0,
    }));
  }
  if (t === 'use:dockGap') {
    cw.value?.use(tail({
      length: 20,
      color: '#ddddddaa',
      firstDockGap: 0,
      dockGap: 2,
    }));
  }
  else if (t === 'use:firstDockGap') {
    cw.value?.use(tail({
      length: 20,
      color: '#ddddddaa',
      firstDockGap: 5,
      dockGap: 0,
    }));
  }
}
</script>

<template>
  <div ref="container" class="demo">
    <div class="btn-group">
      <button :class="{ active: type === 'default' }" @click="changeType('default')">
        default
      </button>
      <button :class="{ active: type === 'use:dockGap' }" @click="changeType('use:dockGap')">
        use:dockGap
      </button>
      <button :class="{ active: type === 'use:firstDockGap' }" @click="changeType('use:firstDockGap')">
        use:firstDockGap
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
