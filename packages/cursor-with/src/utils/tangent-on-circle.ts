/**
 * 在 AB 延长线上求与圆 A 相切的点 C (远离B端)
 * @param {number} cx  圆心 x
 * @param {number} cy  圆心 y
 * @param {number} r   半径
 * @param {number} tx  点 B x
 * @param {number} ty  点 B y
 * @return {[number,number]}
 */
function tangentOnExtended(cx: number, cy: number, r: number, tx: number, ty: number): [number, number] {
  const dx = cx - tx;
  const dy = cy - ty;
  const dis = Math.sqrt(dx * dx + dy * dy);
  const tr = 1 + r / dis;
  const p = [tx + tr * dx, ty + tr * dy];
  const L = Math.hypot(cx - tx, cy - ty);
  const ux = (cx - tx) / L;
  const uy = (cy - ty) / L;
  return [p[0] + r / 2 * ux, p[1] + r / 2 * uy];
}

export { tangentOnExtended };
