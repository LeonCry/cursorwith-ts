import type { CursorWithOptions } from '../types';
import { notNone, throwError } from '.';

function fillDefaultStyle(style: CursorWithOptions['style']) {
  style.borderWidth ??= 0;
  style.shadowBlur ??= 0;
  style.borderColor ??= 'transparent';
  style.shadowColor ??= 'transparent';
  style.shadowOffset ??= [0, 0];
}
function fillDefaultFollow(follow: Required<CursorWithOptions>['follow']) {
  switch (follow.type) {
    case 'time':
      follow.timeRatio ??= 0.1;
      break;
    case 'gap':
      follow.distance ??= 5;
      break;
    case 'track':
      follow.delay ??= 500;
      break;
    case 'spring':
      follow.stiffness ??= 0.05;
      follow.damping ??= 0.25;
      break;
  }
}

function fillDefaultTail(tail: Required<CursorWithOptions>['tail']) {
  tail.length ??= 10;
  tail.color ??= 'rgba(255,255,255,0.2)';
  tail.firstDockGap ??= 0;
  tail.dockGap ??= 0;
}
function fillDefaultNativeCursor(nativeCursor: Required<CursorWithOptions>['nativeCursor']) {
  nativeCursor.borderWidth ??= 0;
  nativeCursor.shadowBlur ??= 0;
  nativeCursor.borderColor ??= 'transparent';
  nativeCursor.shadowColor ??= 'transparent';
  nativeCursor.shadowOffset ??= [0, 0];
}

function fillDefaultHoverEffect(hoverEffect: Required<CursorWithOptions>['hoverEffect']) {
  hoverEffect.padding ??= 10;
  hoverEffect.offset ??= 10;
  hoverEffect.duration ??= 1000;
  hoverEffect.easing ??= 'bounce-out';
  if (notNone(hoverEffect.flash)) {
    hoverEffect.flash.active ??= false;
    hoverEffect.flash.duration ??= 1000;
    hoverEffect.flash.easing ??= 'linear';
  }
}
function handleDealError() {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
}
export {
  fillDefaultFollow,
  fillDefaultHoverEffect,
  fillDefaultNativeCursor,
  fillDefaultStyle,
  fillDefaultTail,
  handleDealError,
};
