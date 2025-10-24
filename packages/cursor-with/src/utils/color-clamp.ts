function formatColorString(color: string) {
  const cv = document.createElement('canvas').getContext('2d')!;
  cv.fillStyle = color;
  const norm = cv.fillStyle as string;
  if (norm.startsWith('#')) {
    let hex = norm.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = hex[0];
      const g = hex[1];
      const b = hex[2];
      const a = hex.length === 4 ? hex[3] : 'F';
      hex = r + r + g + g + b + b + (a ? a + a : '');
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return [r, g, b, a];
    }
  }
  if (norm.startsWith('rgb')) {
    const nums = norm.match(/\d+\.?\d*/g)!.map(Number);
    const [r, g, b, a = 1] = nums;
    return [r, g, b, a];
  }
  if (norm === 'transparent') return [0, 0, 0, 0];
  throw new Error(`${norm} unexpected color format`);
}

// 颜色解析
function mixColorString(c1: string, c2: string, t: number, alpha: number): string {
  const [r1, g1, b1, a1 = 1] = formatColorString(c1);
  const [r2, g2, b2, a2 = 1] = formatColorString(c2);
  const lerp = (x: number, y: number, p: number) => x + (y - x) * p;
  const r = lerp(r1, r2, t);
  const g = lerp(g1, g2, t);
  const b = lerp(b1, b2, t);
  const a = lerp(a1, a2, t) * alpha;
  return `rgba(${r},${g},${b},${a})`;
}

export { formatColorString, mixColorString };
