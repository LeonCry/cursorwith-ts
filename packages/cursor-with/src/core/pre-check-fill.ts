import type { CursorWithOptions } from '../types';
import { notNone, throwError } from '../utils';

function handleDealDefault(options: CursorWithOptions) {
  const { follow, hoverEffect, style, nativeCursor } = options;
  style.borderWidth ??= 0;
  style.borderColor ??= 'transparent';
  if (nativeCursor) {
    nativeCursor.borderWidth ??= 0;
    nativeCursor.borderColor ??= 'transparent';
  }
  options.follow ??= { type: 'time', timeRatio: 0.01 };
  switch (follow?.type) {
    case 'time':
      follow.timeRatio ??= 0.01;
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
  options.deform ??= { active: false };
  options.deform.decay ??= 6;
  if (notNone(hoverEffect)) {
    hoverEffect.duration ??= 1000;
    hoverEffect.padding ??= 10;
    hoverEffect.offset ??= 10;
    hoverEffect.easing ??= 'ease-out';
  }
}

function handleDealError(options: CursorWithOptions) {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
  const { style, follow, deform, hoverEffect, nativeCursor } = options as Required<CursorWithOptions>;
  const errorList: [() => boolean, string][] = [
    [() => style.radius <= 0, 'Radius must be a positive number.'],
    [() => notNone(nativeCursor?.radius) && nativeCursor.radius < 0, 'Radius must be a positive number.'],
    [() => notNone(hoverEffect?.duration) && hoverEffect.duration < 0, 'Duration must be a positive number.'],
    [() => notNone(hoverEffect?.padding) && hoverEffect.padding < 0, 'Padding must be a positive number.'],
    [() => notNone(hoverEffect?.offset) && hoverEffect.offset < 0, 'Offset must be a positive number.'],
    [() => typeof style.borderWidth === 'number' && style.borderWidth < 0, 'BorderWidth must be a positive number.'],
    [() => follow.type === 'time' && notNone(follow.timeRatio) && follow.timeRatio <= 0, 'TimeRatio must be a positive number.'],
    [() => follow.type === 'gap' && notNone(follow.distance) && follow.distance <= 0, 'Distance must be a positive number.'],
    [() => follow.type === 'track' && notNone(follow.delay) && follow.delay < 0, 'Delay must be a positive number.'],
    [() => follow.type === 'spring' && notNone(follow.stiffness) && follow.stiffness < 0, 'Stiffness must be a positive number.'],
    [() => follow.type === 'spring' && notNone(follow.damping) && follow.damping < 0, 'Damping must be a positive number.'],
    [() => notNone(deform?.decay) && deform.decay < 0, 'DeformStrength must be a positive number.'],
  ];
  errorList.forEach(([condition, msg]) => {
    if (condition()) throwError(msg);
  });
}
export { handleDealDefault, handleDealError };
