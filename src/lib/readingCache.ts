/**
 * Reading Cache System
 * Stores and retrieves generated readings by card combination + spread type.
 * Uses localStorage with LRU eviction to keep cache bounded.
 */

import type { DrawnCard } from "@/data/tarotDeck";

const CACHE_KEY = "reading_cache";
const MAX_ENTRIES = 200;
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedReading {
  key: string;
  spread: string;
  cards: string[];
  reading: string;
  timestamp: number;
  source: "ai" | "local";
}

// ─── Key Generation ───

export function generateCacheKey(cards: DrawnCard[], spreadType?: string): string {
  const cardParts = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => {
      const orientation = dc.isReversed ? "R" : "U";
      const position = dc.position || "sel";
      return `${dc.card.id}:${orientation}:${position}`;
    })
    .sort();

  const spread = spreadType || inferSpreadType(cards);
  return `${spread}|${cardParts.join(",")}`;
}

function inferSpreadType(cards: DrawnCard[]): string {
  const revealed = cards.filter((dc) => dc.isRevealed);
  if (revealed.length === 1) return "single";
  if (revealed.length === 3) {
    const positions = revealed.map((c) => c.position).filter(Boolean);
    if (positions.includes("Past")) return "three-card";
    return "pick-a-card";
  }
  if (revealed.length >= 10) return "celtic-cross";
  return `spread-${revealed.length}`;
}

// ─── Cache Operations ───

function loadCache(): Map<string, CachedReading> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return new Map();
    const entries: CachedReading[] = JSON.parse(raw);
    const now = Date.now();
    const valid = entries.filter((e) => now - e.timestamp < TTL_MS);
    return new Map(valid.map((e) => [e.key, e]));
  } catch {
    return new Map();
  }
}

function saveCache(cache: Map<string, CachedReading>): void {
  try {
    const entries = Array.from(cache.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_ENTRIES);
    localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full — clear oldest half
    try {
      const entries = Array.from(cache.values())
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, Math.floor(MAX_ENTRIES / 2));
      localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
    } catch {
      // Give up silently
    }
  }
}

export function getCachedReading(cards: DrawnCard[], spreadType?: string): string | null {
  const key = generateCacheKey(cards, spreadType);
  const cache = loadCache();
  const entry = cache.get(key);
  if (entry) {
    // Touch timestamp for LRU
    entry.timestamp = Date.now();
    saveCache(cache);
    return entry.reading;
  }
  return null;
}

export function setCachedReading(
  cards: DrawnCard[],
  reading: string,
  source: "ai" | "local",
  spreadType?: string
): void {
  const key = generateCacheKey(cards, spreadType);
  const cache = loadCache();

  const cardNames = cards
    .filter((dc) => dc.isRevealed)
    .map((dc) => dc.card.name);

  cache.set(key, {
    key,
    spread: spreadType || inferSpreadType(cards),
    cards: cardNames,
    reading,
    timestamp: Date.now(),
    source,
  });

  saveCache(cache);
}

export function clearReadingCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

export function getCacheStats(): { entries: number; aiCount: number; localCount: number } {
  const cache = loadCache();
  let aiCount = 0;
  let localCount = 0;
  for (const entry of cache.values()) {
    if (entry.source === "ai") aiCount++;
    else localCount++;
  }
  return { entries: cache.size, aiCount, localCount };
}
