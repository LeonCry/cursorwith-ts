interface CommonOptions {
  radius: number
  color: string
}
interface DelayOptions extends CommonOptions {
  // 跟踪方式，time：定时
  type?: 'time'
  timeRatio?: number
}
interface GapOptions extends CommonOptions {
  // 跟踪方式，gap：定长
  type?: 'gap'
  distance?: number
}

type CursorWithOptions = DelayOptions | GapOptions;

interface Point {
  x: number
  y: number
}

export { CursorWithOptions, Point };
