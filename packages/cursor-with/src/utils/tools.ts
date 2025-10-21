interface DebounceFunction<TArgs extends any[]> {
  (...args: TArgs): void
  cancel: () => void
  isPending: () => boolean
  flush: (...args: TArgs) => void
}
export function debounce<TArgs extends any[]>({ delay }: { delay: number }, func: (...args: TArgs) => any) {
  let timer: NodeJS.Timeout | undefined;
  let active = true;

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        active && func(...args);
        timer = undefined;
      }, delay);
    }
    else {
      func(...args);
    }
  };
  debounced.isPending = () => {
    return timer !== undefined;
  };
  debounced.cancel = () => {
    active = false;
  };
  debounced.flush = (...args: TArgs) => func(...args);

  return debounced;
}
