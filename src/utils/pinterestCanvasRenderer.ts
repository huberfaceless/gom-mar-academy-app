import { PinterestPin, PinTemplateStyle, PinColorTheme, ProjectSettings } from '../types/contentEngine';
import JSZip from 'jszip';
import { pinterestTrackingUrl } from './pinterestTargetUrl';

export interface CanvasRenderOptions {
  width?: number; // default 1080
  height?: number; // default 1620
  customBgUrl?: string;
  watermark?: boolean;
}

const THEME_PALETTES: Record<PinColorTheme, {
  primary: string;
  accent: string;
  gradientStart: string;
  gradientEnd: string;
  badgeBg: string;
  badgeText: string;
  highlightBg: string;
  highlightText: string;
  ctaBg: string;
  ctaText: string;
}> = {
  emerald: {
    primary: '#064e3b',
    accent: '#10b981',
    gradientStart: 'rgba(4, 47, 46, 0.88)',
    gradientEnd: 'rgba(2, 44, 34, 0.94)',
    badgeBg: '#10b981',
    badgeText: '#ffffff',
    highlightBg: '#34d399',
    highlightText: '#064e3b',
    ctaBg: '#059669',
    ctaText: '#ffffff',
  },
  teal: {
    primary: '#134e4a',
    accent: '#14b8a6',
    gradientStart: 'rgba(19, 78, 74, 0.88)',
    gradientEnd: 'rgba(15, 23, 42, 0.95)',
    badgeBg: '#14b8a6',
    badgeText: '#ffffff',
    highlightBg: '#2dd4bf',
    highlightText: '#134e4a',
    ctaBg: '#0d9488',
    ctaText: '#ffffff',
  },
  coral: {
    primary: '#7c2d12',
    accent: '#ea580c',
    gradientStart: 'rgba(124, 45, 18, 0.88)',
    gradientEnd: 'rgba(67, 20, 7, 0.95)',
    badgeBg: '#ea580c',
    badgeText: '#ffffff',
    highlightBg: '#fb923c',
    highlightText: '#431407',
    ctaBg: '#c2410c',
    ctaText: '#ffffff',
  },
  amber: {
    primary: '#78350f',
    accent: '#d97706',
    gradientStart: 'rgba(120, 53, 15, 0.88)',
    gradientEnd: 'rgba(69, 26, 3, 0.95)',
    badgeBg: '#d97706',
    badgeText: '#ffffff',
    highlightBg: '#fde047',
    highlightText: '#451a03',
    ctaBg: '#b45309',
    ctaText: '#ffffff',
  },
  berry: {
    primary: '#701a75',
    accent: '#c026d3',
    gradientStart: 'rgba(112, 26, 117, 0.88)',
    gradientEnd: 'rgba(59, 7, 100, 0.95)',
    badgeBg: '#c026d3',
    badgeText: '#ffffff',
    highlightBg: '#f472b6',
    highlightText: '#701a75',
    ctaBg: '#a21caf',
    ctaText: '#ffffff',
  },
  dark: {
    primary: '#090d16',
    accent: '#38bdf8',
    gradientStart: 'rgba(15, 23, 42, 0.90)',
    gradientEnd: 'rgba(2, 6, 23, 0.97)',
    badgeBg: '#38bdf8',
    badgeText: '#0f172a',
    highlightBg: '#7dd3fc',
    highlightText: '#0f172a',
    ctaBg: '#0284c7',
    ctaText: '#ffffff',
  },
  ocean: {
    primary: '#1e3a8a',
    accent: '#3b82f6',
    gradientStart: 'rgba(30, 58, 138, 0.88)',
    gradientEnd: 'rgba(15, 23, 42, 0.95)',
    badgeBg: '#3b82f6',
    badgeText: '#ffffff',
    highlightBg: '#60a5fa',
    highlightText: '#1e3a8a',
    ctaBg: '#2563eb',
    ctaText: '#ffffff',
  },
};

// Curated HD stock health & vitality photos for pins
export const CURATED_HEALTH_PHOTOS = [
  {
    id: 'vitality_nature',
    title: 'Frische Natur & Vitalität',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1080&q=80',
    tags: ['gesundheit', 'vitalität', 'energie'],
  },
  {
    id: 'healthy_food_bowl',
    title: 'Gesunde Ernährung & Nährstoffe',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1080&q=80',
    tags: ['ernährung', 'gemüse', 'abnehmen'],
  },
  {
    id: 'citrus_water_metabolism',
    title: 'Stoffwechsel & Zitrone',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1080&q=80',
    tags: ['stoffwechsel', 'fasten', 'trinken'],
  },
  {
    id: 'avocado_omega_plate',
    title: 'Anti-Entzündlich & Fette',
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1080&q=80',
    tags: ['anti-aging', 'gelenke', 'vital50'],
  },
  {
    id: 'active_walking_sun',
    title: 'Aktive Bewegung 50+',
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1080&q=80',
    tags: ['bewegung', 'fitness', 'ausdauer'],
  },
  {
    id: 'berries_antioxidants',
    title: 'Beeren & Antioxidantien',
    url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1080&q=80',
    tags: ['beeren', 'immunsystem', 'superfood'],
  },
];

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 5
): { endY: number; linesDrawn: number } {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      if (linesDrawn + 1 >= maxLines && n < words.length - 1) {
        // truncate with ellipsis
        ctx.fillText(line.trim() + '...', x, currentY);
        linesDrawn++;
        currentY += lineHeight;
        return { endY: currentY, linesDrawn };
      }
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      linesDrawn++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  linesDrawn++;
  currentY += lineHeight;

  return { endY: currentY, linesDrawn };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Loads an image with CORS handling
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Main 1080x1620 Pin Rendering Engine
 */
export async function renderPinToCanvas(
  canvas: HTMLCanvasElement,
  pin: PinterestPin,
  projectSettings: ProjectSettings,
  options: CanvasRenderOptions = {}
): Promise<void> {
  const width = options.width || 1080;
  const height = options.height || 1620;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2d context');

  const themeName = pin.colorTheme || (
    pin.angle === 'problem' ? 'coral' :
    pin.angle === 'solution' ? 'emerald' :
    pin.angle === 'mistake' ? 'amber' :
    pin.angle === 'list' ? 'teal' : 'berry'
  );
  const palette = THEME_PALETTES[themeName] || THEME_PALETTES.emerald;
  const templateStyle: PinTemplateStyle = pin.templateStyle || 'vital50_clean';

  // 1. Draw Background Image or Fallback Gradient
  const bgUrl = options.customBgUrl || pin.imageUrl || CURATED_HEALTH_PHOTOS[0].url;
  let hasImage = false;

  try {
    const bgImg = await loadImage(bgUrl);
    // Draw image centered and cover
    const hRatio = canvas.width / bgImg.width;
    const vRatio = canvas.height / bgImg.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (canvas.width - bgImg.width * ratio) / 2;
    const centerShiftY = (canvas.height - bgImg.height * ratio) / 2;

    ctx.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height, centerShiftX, centerShiftY, bgImg.width * ratio, bgImg.height * ratio);
    hasImage = true;
  } catch {
    // Gradient fallback
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, palette.primary);
    grad.addColorStop(1, '#021814');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. High-Contrast Overlay Gradient
  const overlayGrad = ctx.createLinearGradient(0, 0, 0, height);
  if (templateStyle === 'vital50_dark') {
    overlayGrad.addColorStop(0, 'rgba(10, 15, 29, 0.85)');
    overlayGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.92)');
    overlayGrad.addColorStop(1, 'rgba(2, 6, 23, 0.98)');
  } else if (templateStyle === 'vital50_bold') {
    overlayGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    overlayGrad.addColorStop(0.3, palette.gradientStart);
    overlayGrad.addColorStop(0.85, palette.gradientEnd);
    overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  } else {
    overlayGrad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    overlayGrad.addColorStop(0.35, palette.gradientStart);
    overlayGrad.addColorStop(0.85, palette.gradientEnd);
    overlayGrad.addColorStop(1, 'rgba(0, 0, 0, 0.90)');
  }
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Top Branding Header Bar
  const brandText = pin.customBrandText || projectSettings.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').toUpperCase() || 'VITAL50.AT';
  const categoryBadge = pin.customBadge || (
    pin.angle === 'problem' ? 'RATGEBER AB 50' :
    pin.angle === 'solution' ? '3-SCHRITTE-LÖSUNG' :
    pin.angle === 'mistake' ? 'DIESEN FEHLER VERMEIDEN' :
    pin.angle === 'list' ? 'CHECKLISTE & TIPPS' : 'TRANSFORMATION AB 50'
  );

  // Top pill badge container
  ctx.save();
  drawRoundedRect(ctx, 60, 60, width - 120, 80, 40);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Brand Name on Left
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`✨ ${brandText}`, 95, 110);

  // Category Tag on Right
  drawRoundedRect(ctx, width - 420, 72, 340, 56, 28);
  ctx.fillStyle = palette.badgeBg;
  ctx.fill();
  ctx.fillStyle = palette.badgeText;
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(categoryBadge, width - 250, 107);
  ctx.restore();

  // 4. Main Body Content Based on Template Style
  const contentWidth = width - 140;
  const startX = 70;

  if (templateStyle === 'vital50_list') {
    // Checklist Style
    ctx.save();
    // Angle Eyebrow
    ctx.fillStyle = palette.highlightBg;
    ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText((pin.angleLabel || 'WICHTIGE CHECKLISTE').toUpperCase(), startX, 220);

    // Big Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 56px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const { endY } = wrapText(ctx, pin.title, startX, 290, contentWidth, 68, 3);

    // Divider Line
    ctx.fillStyle = palette.accent;
    ctx.fillRect(startX, endY + 10, 180, 8);

    // List Items Box
    const bulletItems = pin.bulletPoints && pin.bulletPoints.length > 0 
      ? pin.bulletPoints 
      : [
          'Schritt 1: Stoffwechsel sanft aktivieren',
          'Schritt 2: Blutzucker-Spitzen stoppen',
          'Schritt 3: Entzündungen im Körper senken',
          'Schritt 4: Energie & Vitalität steigern'
        ];

    let listY = endY + 60;
    bulletItems.slice(0, 4).forEach((item, idx) => {
      // Pill Background
      drawRoundedRect(ctx, startX, listY, contentWidth, 100, 24);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Number Circle
      drawRoundedRect(ctx, startX + 20, listY + 20, 60, 60, 30);
      ctx.fillStyle = palette.highlightBg;
      ctx.fill();
      ctx.fillStyle = palette.highlightText;
      ctx.font = '900 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${idx + 1}`, startX + 50, listY + 62);

      // Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(item, startX + 100, listY + 62);

      listY += 120;
    });
    ctx.restore();

  } else if (templateStyle === 'vital50_bold') {
    // High-Impact Bold Box
    ctx.save();
    let currentY = 240;

    // Eyebrow Tag
    drawRoundedRect(ctx, startX, currentY, 360, 52, 26);
    ctx.fillStyle = palette.highlightBg;
    ctx.fill();
    ctx.fillStyle = palette.highlightText;
    ctx.font = '900 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ SOFORT-WISSEN FÜR 50+', startX + 180, currentY + 34);

    currentY += 90;

    // Solid Contrast Container for Main Headline
    drawRoundedRect(ctx, startX, currentY, contentWidth, 420, 32);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fill();
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Headline inside Box
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    wrapText(ctx, pin.title, startX + 40, currentY + 90, contentWidth - 80, 76, 4);

    currentY += 470;

    // Sub-Hook Highlight Box
    if (pin.subHook || pin.description) {
      const subText = pin.subHook || pin.description.split('.')[0] + '.';
      drawRoundedRect(ctx, startX, currentY, contentWidth, 180, 24);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();

      ctx.fillStyle = palette.highlightBg;
      ctx.font = '800 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      wrapText(ctx, `👉 ${subText}`, startX + 30, currentY + 65, contentWidth - 60, 48, 2);
    }
    ctx.restore();

  } else {
    // Default & Clean Editorial Style
    ctx.save();
    let currentY = 250;

    // Angle Eyebrow Tag
    ctx.fillStyle = palette.highlightBg;
    ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText((pin.angleLabel || 'VITAL50 GESUNDHEITSTIPP').toUpperCase(), startX, currentY);

    currentY += 70;

    // Massive Main Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    const { endY } = wrapText(ctx, pin.title, startX, currentY, contentWidth, 82, 4);

    // Vibrant Accent Divider Bar
    ctx.fillStyle = palette.accent;
    ctx.fillRect(startX, endY + 20, 240, 10);

    // Subtitle / SubHook Card
    const subText = pin.subHook || (pin.description ? pin.description.slice(0, 140) + '...' : 'Wissenschaftlich geprüfte Methoden für mehr Vitalität und Wohlbefinden ab 50.');
    const cardY = endY + 70;

    drawRoundedRect(ctx, startX, cardY, contentWidth, 200, 28);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '600 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    wrapText(ctx, subText, startX + 35, cardY + 65, contentWidth - 70, 48, 3);
    ctx.restore();
  }

  // 5. Bottom Call to Action Card & Button (Fixed at Bottom 1380px)
  const bottomCardY = height - 230;
  ctx.save();
  drawRoundedRect(ctx, 60, bottomCardY, width - 120, 160, 32);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // CTA Text on Left
  ctx.fillStyle = palette.highlightBg;
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('KOSTENLOSER RATGEBER:', 95, bottomCardY + 60);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const displayUrl = projectSettings.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'vital50.gomo-marketing.at';
  ctx.fillText(displayUrl, 95, bottomCardY + 105);

  // High-Conversion CTA Button on Right
  const ctaBtnText = pin.ctaButtonText || 'Jetzt lesen →';
  const btnWidth = 320;
  const btnX = width - 60 - btnWidth - 25;
  drawRoundedRect(ctx, btnX, bottomCardY + 35, btnWidth, 90, 45);
  ctx.fillStyle = palette.ctaBg;
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = palette.ctaText;
  ctx.font = '900 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(ctaBtnText, btnX + btnWidth / 2, bottomCardY + 92);
  ctx.restore();
}

/**
 * Downloads a single Pin as a 1080x1620 HD PNG image
 */
export async function downloadPinAsImage(
  pin: PinterestPin,
  projectSettings: ProjectSettings,
  filename?: string
): Promise<void> {
  const canvas = document.createElement('canvas');
  await renderPinToCanvas(canvas, pin, projectSettings, {
    customBgUrl: pin.imageUrl,
  });

  const link = document.createElement('a');
  link.download = filename || `pin-${pin.angle}-${pin.title.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}-1080x1620.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Batch downloads all 5 Pinterest Pins as a single .ZIP package
 */
export async function downloadAllPinsAsZip(
  pins: PinterestPin[],
  projectSettings: ProjectSettings,
  topicName: string
): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder(`Pinterest-Kampagne-${topicName.replace(/[^a-zA-Z0-9]/g, '_')}`);

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    const canvas = document.createElement('canvas');
    await renderPinToCanvas(canvas, pin, projectSettings, {
      customBgUrl: pin.imageUrl,
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const cleanAngle = pin.angle || `pin_${i + 1}`;
    const cleanTitle = pin.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');

    folder?.file(`Pin_${i + 1}_${cleanAngle}_${cleanTitle}_1080x1620.png`, base64Data, { base64: true });
  }

  // Also include a README & Pinterest CSV Bulk Upload inside the zip
  const csvContent = generatePinterestBulkUploadCsv(pins, projectSettings);
  folder?.file(`Pinterest_Bulk_Upload_${topicName.replace(/[^a-zA-Z0-9]/g, '_')}.csv`, csvContent);

  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `Pinterest-Set-Vital50-${topicName.replace(/[^a-zA-Z0-9]/g, '_')}-1080x1620.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

/**
 * Generates official Pinterest Business Bulk Upload CSV format
 */
export function generatePinterestBulkUploadCsv(
  pins: PinterestPin[],
  projectSettings: ProjectSettings
): string {
  const headers = ['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords'];
  const rows = pins.map((pin, idx) => {
    const utmUrl = pinterestTrackingUrl(pin.targetUrl, projectSettings.name, pin.angle);
    const escapedTitle = `"${(pin.title || '').replace(/"/g, '""')}"`;
    const escapedDesc = `"${(pin.description || '').replace(/"/g, '""')}"`;
    const escapedBoard = `"${(pin.board || projectSettings.pinterestBoardDefault || 'Gesundheit ab 50').replace(/"/g, '""')}"`;
    const mediaUrl = pin.imageUrl || '';
    const keywords = `"${(pin.keywords || []).join(', ')}"`;
    const scheduledDate = pin.scheduledDate || '';

    return [escapedTitle, mediaUrl, escapedBoard, '', escapedDesc, `"${utmUrl.replace(/"/g, '""')}"`, scheduledDate, keywords].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
