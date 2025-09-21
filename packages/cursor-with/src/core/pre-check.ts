import type { CursorWithOptions } from '../types';
import throwError from '../utils/global-error';

function handleDealError(options: CursorWithOptions) {
  if (!window) throwError('This library only works in browser environments.');
  if (!window?.requestAnimationFrame) throwError('RequestAnimationFrame is not supported in this environment.');
  if (!options.radius) throwError('Radius is required.');
  if (!options.color) throwError('Color is required.');
  if (options.type === 'time' && options.timeRatio && options.timeRatio < 0) throwError('TimeRatio must be a positive number.');
  if (options.type === 'gap' && options.distance && options.distance < 0) throwError('Distance must be a positive number.');
}
function handleDealDefault(options: CursorWithOptions) {
  // 默认跟踪方式，定长(gap)
  if (!options.type) options.type = 'gap';
  // 时间系数，默认0.01
  if (options.type === 'time' && !options.timeRatio) options.timeRatio = 0.01;
  // 跟踪距离(px)，默认5px
  if (options.type === 'gap' && !options.distance) options.distance = 5;
}

export { handleDealDefault, handleDealError };
