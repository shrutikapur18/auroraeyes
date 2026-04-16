/**
 * Generates a premium shareable tarot reading image using Canvas API.
 * 1080×1080 social-media-ready with mystical cosmic theme.
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

const W = 1080;
const H = 1080;
const GOLD = "#d4af37";
const GOLD_LIGHT = "#e8d48b";

export async function generateShareImage(data: ShareImageData | LegacyShareImageData): Promise<Blob> {
  const cards: ShareCardData[] = "cards" in data
    ? data.cards
    : [{ cardName: data.cardName, orientation: data.orientation, position: data.position }];
  const message = data.message;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ═══════════════════════════════════════
  // BACKGROUND — deep cosmic gradient
  // ═══════════════════════════════════════
  const bg = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, W * 0.9);
  bg.addColorStop(0, "#1e1640");
  bg.addColorStop(0.4, "#120e2a");
  bg.addColorStop(1, "#08061a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle secondary glow at bottom
  const bg2 = ctx.createRadialGradient(W / 2, H * 0.85, 0, W / 2, H * 0.85, W * 0.5);
  bg2.addColorStop(0, "rgba(100, 60, 160, 0.12)");
  bg2.addColorStop(1, "transparent");
  ctx.fillStyle = bg2;
  ctx.fillRect(0, 0, W, H);

  // ═══════════════════════════════════════
  // STARS — scattered ambient dots
  // ═══════════════════════════════════════
  const rng = mulberry32(42); // deterministic seed
  for (let i = 0; i < 90; i++) {
    const sx = rng() * W;
    const sy = rng() * H;
    const sr = 0.4 + rng() * 1.2;
    const sa = 0.15 + rng() * 0.4;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${sa})`;
    ctx.fill();
  }
  // A few brighter stars
  for (let i = 0; i < 8; i++) {
    const sx = rng() * W;
    const sy = rng() * H;
    const sr = 1 + rng() * 1.5;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${0.2 + rng() * 0.3})`;
    ctx.fill();
  }

  // ═══════════════════════════════════════
  // DECORATIVE FRAME
  // ═══════════════════════════════════════
  // Outer border
  ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
  ctx.lineWidth = 1;
  roundRect(ctx, 36, 36, W - 72, H - 72, 16);
  ctx.stroke();
  // Inner border
  ctx.strokeStyle = "rgba(212, 175, 55, 0.1)";
  roundRect(ctx, 50, 50, W - 100, H - 100, 12);
  ctx.stroke();

  // Corner stars
  ctx.fillStyle = "rgba(212, 175, 55, 0.35)";
  ctx.font = "22px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const corners = [[68, 68], [W - 68, 68], [68, H - 68], [W - 68, H - 68]];
  corners.forEach(([cx, cy]) => ctx.fillText("✦", cx, cy));

  // ═══════════════════════════════════════
  // TITLE
  // ═══════════════════════════════════════
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = GOLD;
  ctx.font = "600 32px serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("YOUR TAROT READING", W / 2, 118);
  ctx.letterSpacing = "0px";

  // Decorative line under title
  drawGoldDivider(ctx, 148, 0.35);

  // ═══════════════════════════════════════
  // CARD SPREAD — horizontal layout
  // ═══════════════════════════════════════
  const count = cards.length;
  const cardW = Math.min(280, (W - 180) / count - 30);
  const cardH = count <= 3 ? 360 : 280;
  const gap = 32;
  const totalW = count * cardW + (count - 1) * gap;
  const baseX = (W - totalW) / 2;
  const cardTop = 180;

  cards.forEach((card, i) => {
    const x = baseX + i * (cardW + gap);
    const cx = x + cardW / 2;

    // Card panel with subtle glow
    const glowGrad = ctx.createRadialGradient(cx, cardTop + cardH / 2, 0, cx, cardTop + cardH / 2, cardW * 0.9);
    glowGrad.addColorStop(0, "rgba(212, 175, 55, 0.06)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(x - 20, cardTop - 10, cardW + 40, cardH + 20);

    // Card background
    const panelGrad = ctx.createLinearGradient(x, cardTop, x, cardTop + cardH);
    panelGrad.addColorStop(0, "rgba(212, 175, 55, 0.07)");
    panelGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.03)");
    panelGrad.addColorStop(1, "rgba(212, 175, 55, 0.06)");
    ctx.fillStyle = panelGrad;
    roundRect(ctx, x, cardTop, cardW, cardH, 14);
    ctx.fill();

    // Card border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.22)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, cardTop, cardW, cardH, 14);
    ctx.stroke();

    // Inner glow line
    ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
    ctx.lineWidth = 1;
    roundRect(ctx, x + 6, cardTop + 6, cardW - 12, cardH - 12, 10);
    ctx.stroke();

    // ── Position label ──
    if (card.position) {
      ctx.fillStyle = "rgba(212, 175, 55, 0.55)";
      ctx.font = "bold 14px sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText(card.position.toUpperCase(), cx, cardTop + 38);
      ctx.letterSpacing = "0px";

      // Small divider under position
      const dw = 40;
      const dGrad = ctx.createLinearGradient(cx - dw, 0, cx + dw, 0);
      dGrad.addColorStop(0, "transparent");
      dGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.3)");
      dGrad.addColorStop(1, "transparent");
      ctx.fillStyle = dGrad;
      ctx.fillRect(cx - dw, cardTop + 48, dw * 2, 1);
    }

    // ── Symbol ──
    const sym = card.symbol || "✧";
    ctx.fillStyle = "rgba(212, 175, 55, 0.12)";
    const symSize = count <= 3 ? 110 : 80;
    ctx.font = `${symSize}px serif`;
    ctx.fillText(sym, cx, cardTop + cardH * 0.48 + symSize * 0.15);

    // ── Card name ──
    ctx.fillStyle = GOLD_LIGHT;
    const nameSize = count <= 3 ? 24 : 18;
    ctx.font = `bold ${nameSize}px serif`;
    const nameLines = wrapText(ctx, card.cardName, cardW - 30);
    const nameY = cardTop + cardH - 80;
    nameLines.forEach((line, li) => {
      ctx.fillText(line, cx, nameY + li * (nameSize + 6));
    });

    // ── Orientation badge ──
    const isReversed = card.orientation === "Reversed";
    const badgeY = cardTop + cardH - 28;
    const badgeText = `${isReversed ? "↻" : "↑"} ${card.orientation}`;
    ctx.font = `500 13px sans-serif`;
    const badgeW = ctx.measureText(badgeText).width + 20;
    // Badge background
    ctx.fillStyle = isReversed ? "rgba(200, 60, 60, 0.2)" : "rgba(212, 175, 55, 0.12)";
    roundRect(ctx, cx - badgeW / 2, badgeY - 12, badgeW, 20, 10);
    ctx.fill();
    ctx.strokeStyle = isReversed ? "rgba(200, 60, 60, 0.35)" : "rgba(212, 175, 55, 0.25)";
    ctx.lineWidth = 1;
    roundRect(ctx, cx - badgeW / 2, badgeY - 12, badgeW, 20, 10);
    ctx.stroke();
    ctx.fillStyle = isReversed ? "rgba(255, 140, 140, 0.85)" : "rgba(212, 175, 55, 0.7)";
    ctx.fillText(badgeText, cx, badgeY + 2);
  });

  // ═══════════════════════════════════════
  // DIVIDER
  // ═══════════════════════════════════════
  const divY = cardTop + cardH + 36;
  drawGoldDivider(ctx, divY, 0.45);

  // ═══════════════════════════════════════
  // INTERPRETATION SUMMARY
  // ═══════════════════════════════════════
  ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
  ctx.font = "20px sans-serif";
  const msgMaxW = W - 200;
  const msgLines = wrapText(ctx, message, msgMaxW);
  const msgLineH = 30;
  const msgTop = divY + 36;
  const msgMax = Math.min(msgLines.length, Math.floor((H - msgTop - 180) / msgLineH));
  msgLines.slice(0, msgMax).forEach((line, i) => {
    ctx.fillText(line, W / 2, msgTop + i * msgLineH);
  });

  // ═══════════════════════════════════════
  // CTA + BRANDING FOOTER
  // ═══════════════════════════════════════
  // Divider above footer
  drawGoldDivider(ctx, H - 155, 0.25);

  // CTA
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "italic 17px sans-serif";
  ctx.fillText("✦  Try your own tarot reading  ✦", W / 2, H - 120);

  // Brand name
  ctx.fillStyle = GOLD;
  ctx.font = "600 17px sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("AURORA EYES", W / 2, H - 88);
  ctx.letterSpacing = "0px";

  // URL
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.font = "14px sans-serif";
  ctx.fillText("auroraeyes.com", W / 2, H - 62);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

// ─── Helpers ───────────────────────────────

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

function drawGoldDivider(ctx: CanvasRenderingContext2D, y: number, opacity: number) {
  const grad = ctx.createLinearGradient(W * 0.15, 0, W * 0.85, 0);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.3, `rgba(212, 175, 55, ${opacity})`);
  grad.addColorStop(0.5, `rgba(212, 175, 55, ${opacity * 1.3})`);
  grad.addColorStop(0.7, `rgba(212, 175, 55, ${opacity})`);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(W * 0.15, y, W * 0.7, 1);
}

/** Simple seedable PRNG for deterministic star placement */
function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
