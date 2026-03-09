/**
 * Generates a shareable image for a tarot reading using Canvas API.
 * Supports multiple cards with full reading text.
 */

export interface ShareCardInfo {
  cardName: string;
  orientation: string;
  position?: string;
  symbol?: string;
}

export interface ShareImageData {
  // Legacy single-card support
  cardName: string;
  orientation: string;
  message: string;
  position?: string;
  // Multi-card support
  allCards?: ShareCardInfo[];
}

const CANVAS_W = 1080;
const CANVAS_H = 1350; // taller to fit multiple cards + full reading

export async function generateShareImage(data: ShareImageData): Promise<Blob> {
  const cards = data.allCards && data.allCards.length > 0
    ? data.allCards
    : [{ cardName: data.cardName, orientation: data.orientation, position: data.position }];

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;

  // ─── Background gradient ───
  const bg = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  bg.addColorStop(0, "#0c0a1a");
  bg.addColorStop(0.5, "#1a1333");
  bg.addColorStop(1, "#0c0a1a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // ─── Decorative border ───
  ctx.strokeStyle = "rgba(212, 175, 55, 0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, CANVAS_W - 80, CANVAS_H - 80);
  ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
  ctx.strokeRect(55, 55, CANVAS_W - 110, CANVAS_H - 110);

  // ─── Corner ornaments ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.fillText("✦", 70, 75);
  ctx.fillText("✦", CANVAS_W - 70, 75);
  ctx.fillText("✦", 70, CANVAS_H - 55);
  ctx.fillText("✦", CANVAS_W - 70, CANVAS_H - 55);

  // ─── Top label ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
  ctx.font = "500 18px sans-serif";
  ctx.letterSpacing = "8px";
  ctx.textAlign = "center";
  ctx.fillText("YOUR READING", CANVAS_W / 2, 120);
  ctx.letterSpacing = "0px";

  // ─── Cards section ───
  let y = 170;
  const cardWidth = Math.min(280, (CANVAS_W - 160) / cards.length);
  const totalWidth = cardWidth * cards.length + 20 * (cards.length - 1);
  const startX = (CANVAS_W - totalWidth) / 2;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardWidth + 20) + cardWidth / 2;

    // Card background
    const cardGrad = ctx.createLinearGradient(cx - cardWidth / 2, y, cx + cardWidth / 2, y + 140);
    cardGrad.addColorStop(0, "rgba(212, 175, 55, 0.08)");
    cardGrad.addColorStop(1, "rgba(212, 175, 55, 0.03)");
    ctx.fillStyle = cardGrad;
    roundRect(ctx, cx - cardWidth / 2, y, cardWidth, 140, 12);
    ctx.fill();

    // Card border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
    ctx.lineWidth = 1;
    roundRect(ctx, cx - cardWidth / 2, y, cardWidth, 140, 12);
    ctx.stroke();

    // Symbol
    if (card.symbol) {
      ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
      ctx.font = "36px serif";
      ctx.textAlign = "center";
      ctx.fillText(card.symbol, cx, y + 40);
    }

    // Position label
    if (card.position) {
      ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(card.position.toUpperCase(), cx, y + (card.symbol ? 65 : 45));
    }

    // Card name
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    const nameY = y + (card.position ? 90 : 70);
    // Wrap card name if needed
    const nameLines = wrapText(ctx, card.cardName, cardWidth - 20);
    nameLines.slice(0, 2).forEach((line, li) => {
      ctx.fillText(line, cx, nameY + li * 20);
    });

    // Orientation
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.font = "12px sans-serif";
    const orientY = nameY + nameLines.length * 20 + 5;
    ctx.fillText(card.orientation === "Reversed" ? "↻ Reversed" : "↑ Upright", cx, orientY);
  });

  y += 170;

  // ─── Divider ───
  const divGrad = ctx.createLinearGradient(CANVAS_W * 0.2, 0, CANVAS_W * 0.8, 0);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.5)");
  divGrad.addColorStop(1, "transparent");
  ctx.fillStyle = divGrad;
  ctx.fillRect(CANVAS_W * 0.2, y, CANVAS_W * 0.6, 1);
  y += 30;

  // ─── Full interpretation (wrapped) ───
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  const maxWidth = CANVAS_W - 160;
  const lines = wrapText(ctx, data.message, maxWidth);
  const lineHeight = 30;
  const maxLines = Math.floor((CANVAS_H - y - 120) / lineHeight);
  const displayLines = lines.slice(0, maxLines);

  displayLines.forEach((line, i) => {
    ctx.fillText(line, CANVAS_W / 2, y + i * lineHeight);
  });

  if (lines.length > maxLines) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("…", CANVAS_W / 2, y + maxLines * lineHeight);
  }

  // ─── Branding ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
  ctx.font = "500 16px sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("MYSTIC DIVINATION", CANVAS_W / 2, CANVAS_H - 90);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "14px sans-serif";
  ctx.fillText("tarotguidance.lovable.app", CANVAS_W / 2, CANVAS_H - 65);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const clean = text.replace(/\*\*/g, "").replace(/[✦🔮]/g, "");
  const words = clean.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
