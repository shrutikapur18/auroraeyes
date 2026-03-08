// Horary Astrology types and utilities

export interface HoraryQuestion {
  question: string;
  location: string;
  latitude: number;
  longitude: number;
  dateTime: Date;
  timezone: number; // UTC offset in hours
}

export interface PlanetPosition {
  name: string;
  sign: string;
  signNumber: number;
  fullDegree: number;
  normDegree: number;
  isRetro: boolean;
  house: number;
}

export interface HouseCusp {
  house: number;
  sign: string;
  signNumber: number;
  degree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
  applying: boolean;
}

export interface HoraryChartData {
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  svgChart?: string;
  ascendantSign: string;
  moonSign: string;
  moonPhase: string;
}

export interface HoraryReading {
  chartData: HoraryChartData;
  interpretation: string;
  question: string;
  timestamp: string;
}

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const ZODIAC_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓"
];

export const PLANET_SYMBOLS: Record<string, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
  "North Node": "☊",
  "South Node": "☋",
  Ascendant: "Asc",
  Midheaven: "MC",
};

export const ZODIAC_COLORS: Record<string, string> = {
  Aries: "#e74c3c",
  Taurus: "#27ae60",
  Gemini: "#f39c12",
  Cancer: "#3498db",
  Leo: "#e67e22",
  Virgo: "#2ecc71",
  Libra: "#9b59b6",
  Scorpio: "#c0392b",
  Sagittarius: "#8e44ad",
  Capricorn: "#34495e",
  Aquarius: "#1abc9c",
  Pisces: "#2980b9",
};

export const HORARY_HOUSES_MEANINGS: Record<number, string> = {
  1: "The querent (you), your body, appearance",
  2: "Money, possessions, values",
  3: "Communication, siblings, short trips",
  4: "Home, family, roots, real estate",
  5: "Romance, creativity, children, pleasure",
  6: "Health, daily work, service, pets",
  7: "Partners, marriage, open enemies, contracts",
  8: "Shared resources, death, transformation, occult",
  9: "Travel, education, philosophy, law",
  10: "Career, reputation, authority, public status",
  11: "Friends, hopes, wishes, groups",
  12: "Hidden enemies, secrets, isolation, spirituality",
};

export function getTimezoneOffset(): number {
  return -(new Date().getTimezoneOffset() / 60);
}

export function formatDegree(degree: number): string {
  const sign = ZODIAC_SIGNS[Math.floor(degree / 30)];
  const deg = Math.floor(degree % 30);
  const min = Math.floor((degree % 1) * 60);
  return `${deg}° ${sign} ${min}'`;
}
