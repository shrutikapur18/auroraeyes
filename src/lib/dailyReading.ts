import { tarotDeck, type TarotCard } from "@/data/tarotDeck";
import { tarotInterpretations } from "@/data/tarotInterpretations";

/**
 * Deterministic daily card selection using a date-based seed.
 * Same date always produces the same card + reversed state.
 */
function dateSeed(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  // Simple hash that distributes well across the deck
  return ((y * 367 + (m + 1) * 31 + d) * 2654435761) >>> 0;
}

export interface DailyReading {
  card: TarotCard;
  isReversed: boolean;
  date: Date;
  dateSlug: string; // e.g. "july-10"
  dateLabel: string; // e.g. "July 10, 2026"
  guidance: string;
  keywords: string[];
}

const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function dateToSlug(date: Date): string {
  return `${months[date.getMonth()]}-${date.getDate()}`;
}

export function dateToLabel(date: Date): string {
  return `${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function slugToDate(slug: string, year?: number): Date | null {
  const match = slug.match(/^([a-z]+)-(\d+)$/);
  if (!match) return null;
  const mi = months.indexOf(match[1]);
  if (mi === -1) return null;
  const day = parseInt(match[2], 10);
  const y = year ?? new Date().getFullYear();
  const d = new Date(y, mi, day);
  if (d.getMonth() !== mi || d.getDate() !== day) return null;
  return d;
}

export function getDailyReading(date: Date): DailyReading {
  const seed = dateSeed(date);
  const cardIndex = seed % tarotDeck.length;
  const isReversed = (seed >> 7) % 3 === 0; // ~33% chance reversed
  const card = tarotDeck[cardIndex];
  const interp = tarotInterpretations.find(i => i.id === card.id);

  const guidance = isReversed
    ? interp?.general_rev || card.meaning_rev
    : interp?.general_up || card.meaning_up;

  return {
    card,
    isReversed,
    date,
    dateSlug: dateToSlug(date),
    dateLabel: dateToLabel(date),
    guidance,
    keywords: card.keywords,
  };
}

/**
 * Generate readings for the past N days (for the archive).
 */
export function getRecentReadings(count: number): DailyReading[] {
  const readings: DailyReading[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    readings.push(getDailyReading(d));
  }
  return readings;
}
