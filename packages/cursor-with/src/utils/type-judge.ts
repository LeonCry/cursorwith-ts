function notNone<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

export { notNone };
