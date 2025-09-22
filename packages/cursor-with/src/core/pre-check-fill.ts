import type { CursorWithOptions } from '../types';
import throwError from '../utils/global-error';

function handleDealDefault(options: CursorWithOptions) {
  // 默认跟踪方式，定时:r = 0.01
  if (!options.follow) options.follow = { type: 'time', timeRatio: 0.01 };
  if (options.follow.type === 'time' && !options.follow.timeRatio) options.follow.timeRatio = 0.01;
  if (options.follow.type === 'gap' && !options.follow.distance) options.follow.distance = 5;
}

function handleDealError(options: CursorWithOptions) {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
  if (!options.style?.radius) throwError('Radius is required.');
  if (!options.style?.color) throwError('Color is required.');
  const follow = options.follow!;
  if (follow.type === 'time' && typeof follow.timeRatio !== 'undefined' && follow.timeRatio <= 0) throwError('TimeRatio must be a positive number.');
  if (follow.type === 'gap' && typeof follow.distance !== 'undefined' && follow.distance && follow.distance <= 0) throwError('Distance must be a positive number.');
}
export { handleDealDefault, handleDealError };
