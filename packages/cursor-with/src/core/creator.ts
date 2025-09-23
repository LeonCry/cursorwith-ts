function canvasCreator(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.setProperty('position', 'fixed', 'important');
  canvas.style.setProperty('top', '0px', 'important');
  canvas.style.setProperty('left', '0px', 'important');
  canvas.style.setProperty('z-index', '9999', 'important');
  canvas.style.setProperty('pointer-events', 'none', 'important');
  document.body.appendChild(canvas);
  return canvas;
}

export { canvasCreator };
