export { clickEffect } from './click-effect';
export { follow } from './follow';
export { hoverEffect } from './hover-effect';
export { inverse } from './inverse';
export { nativeCursor } from './native-cursor';
export { tail } from './tail';

// 可使用的use函数名
export const USEABLE_USE_FN_NAMES_SYMBOLS = {
  hoverEffect: Symbol('hoverEffect'),
  inverse: Symbol('inverse'),
  follow: Symbol('follow'),
  tail: Symbol('tail'),
  clickEffect: Symbol('clickEffect'),
  nativeCursor: Symbol('nativeCursor'),
};
export function isNameLegal(name: symbol) {
  return Object.values(USEABLE_USE_FN_NAMES_SYMBOLS).includes(name);
}
