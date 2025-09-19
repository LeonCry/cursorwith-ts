import type { CursorWithOptions } from '../types';

class CreateCursorWith {
  options: CursorWithOptions;
  constructor(options: CursorWithOptions) {
    this.options = options;
  }

  getRadius() {
    return this.options?.radius;
  }
}

export { CreateCursorWith };
