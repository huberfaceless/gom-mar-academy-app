// Kopfzeile und Seitenmenü teilen sich denselben, tatsächlich gemessenen Abstand.
export function observeNavigationHeader(element: HTMLElement): () => void {
  const style = document.documentElement.style;
  const update = () => {
    const height = Math.ceil(element.getBoundingClientRect().height);
    if (height > 0) style.setProperty('--academy-header-height', `${height}px`);
  };
  update();
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
  observer?.observe(element);
  window.addEventListener('resize', update);
  return () => {
    observer?.disconnect();
    window.removeEventListener('resize', update);
    style.removeProperty('--academy-header-height');
  };
}
