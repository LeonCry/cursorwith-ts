import type { CursorWithOptions } from '../types';
import { notNone, throwError } from '../utils';

function handleDealDefault(options: CursorWithOptions) {
  // 默认跟踪方式，定时:r = 0.01
  if (!options.follow) options.follow = { type: 'time', timeRatio: 0.01 };
  if (options.follow.type === 'time' && !options.follow.timeRatio) options.follow.timeRatio = 0.01;
  if (options.follow.type === 'gap' && !options.follow.distance) options.follow.distance = 5;
  if (options.follow.type === 'track' && !options.follow.delay) options.follow.delay = 200;
}

function handleDealError(options: CursorWithOptions) {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
  const { style, follow } = options as Required<CursorWithOptions>;
  const errorList: [() => boolean, string][] = [
    [() => style.radius <= 0, 'Radius must be a positive number.'],
    [() => typeof style.borderWidth === 'number' && style.borderWidth <= 0, 'BorderWidth must be a positive number.'],
    [() => follow.type === 'time' && notNone(follow.timeRatio) && follow.timeRatio <= 0, 'TimeRatio must be a positive number.'],
    [() => follow.type === 'gap' && notNone(follow.distance) && follow.distance <= 0, 'Distance must be a positive number.'],
  ];
  errorList.forEach(([condition, msg]) => {
    if (condition()) throwError(msg);
  });
}
export { handleDealDefault, handleDealError };
