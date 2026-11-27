import type { PinterestPin, ProjectSettings } from '../types/contentEngine';
import { pinBrandText } from './pinBranding';

/** One shared lower-left layout for live preview, downloads and publication images. */
export function renderBottomLeftPin(ctx: CanvasRenderingContext2D, width: number, height: number, pin: PinterestPin, project: ProjectSettings): void {
  ctx.save();
  const scale = width / 1080;
  ctx.scale(scale, scale);
  const w = 1080, h = height / scale, x = 72, usable = w - x * 2;
  const top = h * 0.54, bottom = h - 70;
  const overlay = ctx.createLinearGradient(0, top - 120, 0, h);
  overlay.addColorStop(0, 'rgba(2,6,23,0)');
  overlay.addColorStop(0.22, 'rgba(2,6,23,0.94)');
  overlay.addColorStop(1, 'rgba(2,6,23,0.99)');
  ctx.fillStyle = overlay; ctx.fillRect(0, top - 120, w, h - top + 120);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#ffffff';
  function wrap(text: string, size: number): string[] {
    ctx.font = `800 ${size}px Arial, sans-serif`;
    const rows: string[] = []; let row = '';
    for (const word of text.trim().split(/\s+/)) {
      if (row && ctx.measureText(`${row} ${word}`).width > usable) { rows.push(row); row = word; }
      else row = row ? `${row} ${word}` : word;
    }
    if (row) rows.push(row);
    return rows;
  }
  function draw(text: string, size: number, y: number, maxLines: number, weight = 800): number {
    const rows = wrap(text, size); const visible = rows.slice(0, maxLines);
    if (rows.length > maxLines) visible[maxLines - 1] = visible[maxLines - 1].replace(/\s+\S*$/, '') + '…';
    ctx.font = `${weight} ${size}px Arial, sans-serif`;
    visible.forEach((line, i) => ctx.fillText(line, x, y + i * size * 1.16, usable));
    return visible.length * size * 1.16;
  }
  // Fit into the lower region; fixed reservations keep branding, teaser and CTA separate.
  const titleBudget = bottom - top - 230;
  let size = 78;
  while (size > 32 && (wrap(pin.title, size).length > 4 || wrap(pin.title, size).length * size * 1.16 > titleBudget)) size -= 2;
  let y = top + 24;
  draw(pinBrandText(pin, project).slice(0, 65), 24, y, 1, 600); y += 44;
  if (pin.customBadge?.trim()) { draw(pin.customBadge.trim().slice(0, 80), 24, y, 1, 600); y += 38; }
  y += size;
  y += draw(pin.title, size, y, 4) - size + 28;
  if (pin.subHook?.trim()) draw(pin.subHook.trim(), 30, y, 2, 500);
  draw((pin.ctaButtonText || 'Mehr erfahren →').slice(0, 90), 28, bottom, 1);
  ctx.restore();
}
