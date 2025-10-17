import type { CursorWithOptions } from '../types';
import { notNone, throwError } from '../utils';

function handleDealDefault(options: CursorWithOptions) {
  // 默认跟踪方式，定时:r = 0.01
  if (!options.follow) options.follow = { type: 'time', timeRatio: 0.01 };
  if (!notNone(options.style.borderWidth)) options.style.borderWidth = 0;
  if (!notNone(options.style.borderColor)) options.style.borderColor = 'transparent';
  if (options.hoverEffect && !notNone(options.hoverEffect.duration)) options.hoverEffect.duration = 1000;
  if (options.follow.type === 'time' && !options.follow.timeRatio) options.follow.timeRatio = 0.01;
  if (options.follow.type === 'gap' && !options.follow.distance) options.follow.distance = 5;
  if (options.follow.type === 'track' && !notNone(options.follow.delay)) options.follow.delay = 500;
  if (options.follow.type === 'spring' && !notNone(options.follow.stiffness)) options.follow.stiffness = 0.05;
  if (options.follow.type === 'spring' && !notNone(options.follow.damping)) options.follow.damping = 0.25;
  if (options.deform && !notNone(options.deform.strength)) options.deform.strength = 6;
}

function handleDealError(options: CursorWithOptions) {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
  const { style, follow, deform } = options as Required<CursorWithOptions>;
  const errorList: [() => boolean, string][] = [
    [() => style.radius <= 0, 'Radius must be a positive number.'],
    [() => notNone(options?.hoverEffect?.duration) && options.hoverEffect.duration <= 0, 'Duration must be a positive number.'],
    [() => typeof style.borderWidth === 'number' && style.borderWidth < 0, 'BorderWidth must be a positive number.'],
    [() => follow.type === 'time' && notNone(follow.timeRatio) && follow.timeRatio <= 0, 'TimeRatio must be a positive number.'],
    [() => follow.type === 'gap' && notNone(follow.distance) && follow.distance <= 0, 'Distance must be a positive number.'],
    [() => follow.type === 'track' && notNone(follow.delay) && follow.delay <= 0, 'Delay must be a positive number.'],
    [() => follow.type === 'spring' && notNone(follow.stiffness) && follow.stiffness <= 0, 'Stiffness must be a positive number.'],
    [() => follow.type === 'spring' && notNone(follow.damping) && follow.damping <= 0, 'Damping must be a positive number.'],
    [() => notNone(deform?.strength) && deform.strength < 0, 'DeformStrength must be a positive number.'],
  ];
  errorList.forEach(([condition, msg]) => {
    if (condition()) throwError(msg);
  });
}
export { handleDealDefault, handleDealError };
