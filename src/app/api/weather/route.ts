// src/app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "New York";
  const key = process.env.OPENWEATHER_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "Missing OPENWEATHER_API_KEY" }, { status: 500 });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${key}&units=metric`;

  const r = await fetch(url, { cache: "no-store" }); // avoid stale data during dev
  if (!r.ok) {
    return NextResponse.json({ error: "Weather fetch failed" }, { status: 400 });
  }

  const data = await r.json();

  return NextResponse.json({
    city: data.name,
    tempC: data.main?.temp,
    tempF: Math.round((data.main?.temp ?? 0) * 9/5 + 32),
    condition: data.weather?.[0]?.main ?? "—",
    humidity: data.main?.humidity ?? null,
  });
}
