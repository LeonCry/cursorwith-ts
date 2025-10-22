export { follow } from './follow';
export { hoverEffect } from './hover-effect';
export { inverse } from './inverse';
// 可使用的use函数名
export const USEABLE_USE_FN_NAMES_SYMBOLS = {
  hoverEffect: Symbol('hoverEffect'),
  inverse: Symbol('inverse'),
  follow: Symbol('follow'),
};
export function isNameLegal(name: symbol) {
  return Object.values(USEABLE_USE_FN_NAMES_SYMBOLS).includes(name);
}
