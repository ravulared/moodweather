"use client";

import { useState } from "react";
import { moodFor } from "@/lib/mood";
import { weatherEmoji } from "@/lib/weatherIcons";
import {weatherTheme} from "@/lib/weatherTheme";

type Weather = { city: string; tempF: number; tempC: number; condition: string; humidity: number | null };

export default function Home() {
  const [city, setCity] = useState("New York");
  const [loading, setLoading] = useState(false);
  const [w, setW] = useState<Weather | null>(null);
  const [line, setLine] = useState<string>("");
  const theme = weatherTheme(w?.condition);

  async function checkVibe() {
    setLoading(true);
    setLine("");
    try {
      const r = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await r.json();
      if (data.error) throw new Error(data.error);

      const weather: Weather = data;
      setW(weather);

      const m = moodFor(weather.city, weather.tempF);
      const weatherIcons = weatherEmoji(data.condition);
      const emotional = weather.tempF + m.deltaF;
      const oneLiner = `${weatherIcons}  ${weather.city} feels ${Math.round(weather.tempF)}°F but emotionally ${Math.round(
        emotional
      )}°F — ${m.label} ${m.emoji}`;
      setLine(oneLiner);
    } catch (e: any) {
      setLine(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4">
      <div className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-white/5 backdrop-blur">
        <h1 className="text-2xl font-semibold mb-3">MoodWeather</h1>
      
        

        <label className="block text-sm mb-2">City</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full rounded-xl bg-cyan-500 px-3 py-2 text-slate-900 mb-4"
        />

        <button
          onClick={checkVibe}
          disabled={loading}
          className="w-full rounded-xl py-2 font-medium bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check today’s vibe"}
        </button>

        {w && (
          <div className="mt-5 text-sm opacity-90">
            <div>Temp: <b>{Math.round(w.tempF)}°F</b> ({Math.round(w.tempC)}°C)</div>
            <div>Condition: <b>{w.condition}</b></div>
            {w.humidity != null && <div>Humidity: <b>{w.humidity}%</b></div>}
          </div>
        )}

        {line && <p className="mt-4 text-lg">{line}</p>}

        <p className="mt-6 text-xs opacity-70">Prototype — data via OpenWeather, mood is a seeded demo.</p>
      </div>
    </main>
  );
}
