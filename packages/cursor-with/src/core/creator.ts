function canvasCreator(rect: DOMRect, container: Element) {
  const canvas = document.createElement('canvas');
  canvas.width = rect.width;
  canvas.height = rect.height;
  canvas.style.setProperty('position', 'fixed', 'important');
  canvas.style.setProperty('top', '0px', 'important');
  canvas.style.setProperty('left', '0px', 'important');
  canvas.style.setProperty('z-index', '114514', 'important');
  canvas.style.setProperty('pointer-events', 'none', 'important');
  canvas.style.setProperty('will-change', 'transform', 'important');
  canvas.style.setProperty('overflow', 'visible', 'important');
  canvas.style.setProperty('opacity', '1', 'important');
  canvas.style.setProperty('mix-blend-mode', 'normal', 'important');
  container.appendChild(canvas);
  return canvas;
}

export { canvasCreator };
