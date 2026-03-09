/**
 * Generates a shareable image for a tarot reading using Canvas API.
 * Supports full spread display with all cards.
 */

export interface ShareCardData {
  cardName: string;
  orientation: string;
  position?: string;
  symbol?: string;
}

export interface ShareImageData {
  cards: ShareCardData[];
  message: string;
}

/** @deprecated Use ShareImageData with cards array */
export interface LegacyShareImageData {
  cardName: string;
  orientation: string;
  message: string;
  position?: string;
}

const CANVAS_W = 1080;
const CANVAS_H = 1080;

export async function generateShareImage(data: ShareImageData | LegacyShareImageData): Promise<Blob> {
  // Normalize legacy single-card format
  const cards: ShareCardData[] = "cards" in data
    ? data.cards
    : [{ cardName: data.cardName, orientation: data.orientation, position: data.position }];
  const message = data.message;

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

  // ─── Title ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
  ctx.font = "500 18px sans-serif";
  ctx.letterSpacing = "8px";
  ctx.textAlign = "center";
  ctx.fillText("YOUR TAROT READING", CANVAS_W / 2, 120);
  ctx.letterSpacing = "0px";

  // ─── Cards spread ───
  const cardCount = cards.length;
  const cardWidth = Math.min(280, (CANVAS_W - 160) / cardCount - 20);
  const totalWidth = cardCount * cardWidth + (cardCount - 1) * 24;
  const startX = (CANVAS_W - totalWidth) / 2;
  const cardY = 160;
  const cardHeight = cardCount <= 3 ? 340 : 280;

  cards.forEach((card, i) => {
    const cx = startX + i * (cardWidth + 24) + cardWidth / 2;

    // Card background
    const cardBg = ctx.createLinearGradient(cx - cardWidth / 2, cardY, cx - cardWidth / 2, cardY + cardHeight);
    cardBg.addColorStop(0, "rgba(212, 175, 55, 0.08)");
    cardBg.addColorStop(1, "rgba(212, 175, 55, 0.02)");
    ctx.fillStyle = cardBg;

    // Rounded rect
    const r = 12;
    const x = cx - cardWidth / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, cardY);
    ctx.lineTo(x + cardWidth - r, cardY);
    ctx.quadraticCurveTo(x + cardWidth, cardY, x + cardWidth, cardY + r);
    ctx.lineTo(x + cardWidth, cardY + cardHeight - r);
    ctx.quadraticCurveTo(x + cardWidth, cardY + cardHeight, x + cardWidth - r, cardY + cardHeight);
    ctx.lineTo(x + r, cardY + cardHeight);
    ctx.quadraticCurveTo(x, cardY + cardHeight, x, cardY + cardHeight - r);
    ctx.lineTo(x, cardY + r);
    ctx.quadraticCurveTo(x, cardY, x + r, cardY);
    ctx.closePath();
    ctx.fill();

    // Card border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Position label
    if (card.position) {
      ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
      ctx.font = "bold 13px sans-serif";
      ctx.letterSpacing = "3px";
      ctx.fillText(card.position.toUpperCase(), cx, cardY + 32);
      ctx.letterSpacing = "0px";
    }

    // Symbol
    const sym = card.symbol || "✧";
    ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
    const symSize = cardCount <= 3 ? 100 : 70;
    ctx.font = `${symSize}px serif`;
    ctx.fillText(sym, cx, cardY + cardHeight / 2 + symSize * 0.15);

    // Card name (wrapped if needed)
    ctx.fillStyle = "#d4af37";
    const nameSize = cardCount <= 3 ? 22 : 16;
    ctx.font = `bold ${nameSize}px serif`;
    const nameLines = wrapText(ctx, card.cardName, cardWidth - 24);
    const nameStartY = cardY + cardHeight - 70;
    nameLines.forEach((line, li) => {
      ctx.fillText(line, cx, nameStartY + li * (nameSize + 4));
    });

    // Orientation
    ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
    const oriSize = cardCount <= 3 ? 14 : 12;
    ctx.font = `${oriSize}px sans-serif`;
    const arrow = card.orientation === "Reversed" ? "↻" : "↑";
    ctx.fillText(`${arrow} ${card.orientation}`, cx, cardY + cardHeight - 18);
  });

  // ─── Divider ───
  const divY = cardY + cardHeight + 30;
  const divGrad = ctx.createLinearGradient(CANVAS_W * 0.2, 0, CANVAS_W * 0.8, 0);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.5)");
  divGrad.addColorStop(1, "transparent");
  ctx.fillStyle = divGrad;
  ctx.fillRect(CANVAS_W * 0.2, divY, CANVAS_W * 0.6, 1);

  // ─── Message ───
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "20px sans-serif";
  const maxWidth = CANVAS_W - 180;
  const lines = wrapText(ctx, message, maxWidth);
  const lineHeight = 30;
  const msgStartY = divY + 40;
  const maxLines = Math.min(lines.length, Math.floor((CANVAS_H - msgStartY - 130) / lineHeight));
  lines.slice(0, maxLines).forEach((line, i) => {
    ctx.fillText(line, CANVAS_W / 2, msgStartY + i * lineHeight);
  });

  // ─── Teaser ───
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "italic 16px sans-serif";
  ctx.fillText("The cards revealed something meaningful about this situation.", CANVAS_W / 2, CANVAS_H - 130);

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
