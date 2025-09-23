interface StyleOptions {
  radius: number
  color: string
  borderWidth?: number
  borderColor?: string
}

// 定时跟踪方式
interface TimeFollow {
  type: 'time'
  timeRatio?: number
}
// 定长跟踪方式
interface GapFollow {
  type: 'gap'
  distance?: number
}
type Follow = TimeFollow | GapFollow;

interface CursorWithOptions { style: StyleOptions, follow?: Follow }

export { CursorWithOptions };
