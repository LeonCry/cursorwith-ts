let tig = false;
let lt = 0;
let f = 0;
let fps = 0;
function getFPS() {
  const t = performance.now();
  if (!tig) {
    lt = t;
    tig = true;
  }
  f++;
  if (t >= lt + 1000) {
    fps = Math.round(f * 1000 / (t - lt));
    f = 0;
    lt = t;
  }
  return fps;
}
export { getFPS };
