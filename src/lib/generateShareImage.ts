/**
 * Generates a shareable image for a tarot reading using Canvas API.
 * Returns a Blob that can be shared or downloaded.
 */

export interface ShareImageData {
  cardName: string;
  orientation: string;
  message: string;
  position?: string;
}

const CANVAS_W = 1080;
const CANVAS_H = 1080;

export async function generateShareImage(data: ShareImageData): Promise<Blob> {
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
  ctx.fillText("YOUR READING", CANVAS_W / 2, 130);
  ctx.letterSpacing = "0px";

  // ─── Card symbol ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
  ctx.font = "180px serif";
  ctx.fillText("✧", CANVAS_W / 2, 340);

  // ─── Card name ───
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 48px serif";
  ctx.fillText(data.cardName, CANVAS_W / 2, 440);

  // ─── Orientation ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
  ctx.font = "22px sans-serif";
  ctx.fillText(data.orientation, CANVAS_W / 2, 480);

  // ─── Position (if any) ───
  if (data.position) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.font = "italic 20px sans-serif";
    ctx.fillText(data.position, CANVAS_W / 2, 515);
  }

  // ─── Divider ───
  const divGrad = ctx.createLinearGradient(CANVAS_W * 0.25, 0, CANVAS_W * 0.75, 0);
  divGrad.addColorStop(0, "transparent");
  divGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.5)");
  divGrad.addColorStop(1, "transparent");
  ctx.fillStyle = divGrad;
  ctx.fillRect(CANVAS_W * 0.25, 545, CANVAS_W * 0.5, 1);

  // ─── Message (wrapped) ───
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "22px sans-serif";
  const maxWidth = CANVAS_W - 200;
  const lines = wrapText(ctx, data.message, maxWidth);
  const lineHeight = 34;
  const startY = 600;
  lines.slice(0, 8).forEach((line, i) => {
    ctx.fillText(line, CANVAS_W / 2, startY + i * lineHeight);
  });

  // ─── Branding ───
  ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
  ctx.font = "500 16px sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("MYSTIC DIVINATION", CANVAS_W / 2, CANVAS_H - 100);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.font = "14px sans-serif";
  ctx.fillText("tarotguidance.lovable.app", CANVAS_W / 2, CANVAS_H - 70);

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
