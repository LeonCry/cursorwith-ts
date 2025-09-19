// 防抖ref
import { customRef } from 'vue';

export default function useDebounceRef(value: any, delay = 1000) {
  let timer: NodeJS.Timeout | null = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
