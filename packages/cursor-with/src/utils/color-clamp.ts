// 颜色解析
function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
function parseHexChannel(ch: string) {
  return Number.parseInt(ch, 16);
}
function parseColorToRgba(input: string): [number, number, number, number] {
  const s = input.trim();
  if (s.startsWith('#')) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      const r = parseHexChannel(hex[0] + hex[0]);
      const g = parseHexChannel(hex[1] + hex[1]);
      const b = parseHexChannel(hex[2] + hex[2]);
      return [r, g, b, 1];
    }
    if (hex.length === 4) {
      const r = parseHexChannel(hex[0] + hex[0]);
      const g = parseHexChannel(hex[1] + hex[1]);
      const b = parseHexChannel(hex[2] + hex[2]);
      const a = parseHexChannel(hex[3] + hex[3]) / 255;
      return [r, g, b, clamp(a, 0, 1)];
    }
    if (hex.length === 6 || hex.length === 8) {
      const r = parseHexChannel(hex.slice(0, 2));
      const g = parseHexChannel(hex.slice(2, 4));
      const b = parseHexChannel(hex.slice(4, 6));
      const a = hex.length === 8 ? parseHexChannel(hex.slice(6, 8)) / 255 : 1;
      return [r, g, b, clamp(a, 0, 1)];
    }
  }
  const open = s.indexOf('(');
  const close = s.indexOf(')', open + 1);
  if (open !== -1 && close !== -1) {
    const parts = s.slice(open + 1, close).split(',').map(v => v.trim());
    const toRgbNum = (v: string) => v.endsWith('%') ? clamp(Number.parseFloat(v) * 2.55, 0, 255) : clamp(Number.parseFloat(v), 0, 255);
    const r = toRgbNum(parts[0] || '0');
    const g = toRgbNum(parts[1] || '0');
    const b = toRgbNum(parts[2] || '0');
    let a = 1;
    if (parts[3] != null) {
      const va = parts[3];
      a = va.endsWith('%') ? clamp(Number.parseFloat(va) / 100, 0, 1) : clamp(Number.parseFloat(va), 0, 1);
    }
    return [r, g, b, a];
  }
  return [0, 0, 0, 1];
}
function rgbaToString([r, g, b, a]: [number, number, number, number]): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
}
function mixColorString(c1: string, c2: string, t: number, alpha: number, inverse?: boolean): string {
  const [r1, g1, b1, a1] = parseColorToRgba(c1);
  const [r2, g2, b2, a2] = parseColorToRgba(c2);
  const lerp = (x: number, y: number, p: number) => x + (y - x) * p;
  const r = lerp(r1, r2, t);
  const g = lerp(g1, g2, t);
  const b = lerp(b1, b2, t);
  const a = lerp(a1, a2, t) * alpha;
  if (inverse) {
    return rgbaToString([255 - r, 255 - g, 255 - b, a]);
  }
  return rgbaToString([r, g, b, a]);
}

export { mixColorString };
