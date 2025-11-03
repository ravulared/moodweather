// src/lib/mood.ts
export type Mood = { label: "Positive" | "Neutral" | "Negative"; deltaF: number; emoji: string };

function seedFrom(city: string, dayISO: string) {
  return [...(city + dayISO)].reduce((a, c) => a + c.charCodeAt(0), 0);
}

export function moodFor(city: string, tempF: number): Mood {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const s = Math.sin(seedFrom(city, day)) * 1000;
  const t = (s % 100) / 100; // [-1,1)ish after modulo/scale

  // map t to a vibe
  if (t > 0.25) return { label: "Positive", deltaF: Math.round(8 + t * 6), emoji: "🌈" };
  if (t < -0.25) return { label: "Negative", deltaF: Math.round(-8 + t * 6), emoji: "🌧️" };
  return { label: "Neutral", deltaF: 0, emoji: "⛅" };
}
