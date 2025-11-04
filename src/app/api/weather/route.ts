import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "New York";
  const key = process.env.OPENWEATHER_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "Missing OPENWEATHER_API_KEY (check .env.local & restart dev server)" },
      { status: 500 }
    );
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${key}&units=metric`;

  try {
    const r = await fetch(url, { cache: "no-store" });

    // If OpenWeather returns an error (401/404/429/etc), forward details
    if (!r.ok) {
      let details: any;
      try {
        details = await r.json();
      } catch {
        details = await r.text();
      }
      return NextResponse.json(
        { error: "Upstream OpenWeather error", status: r.status, details },
        { status: r.status }
      );
    }

    const data = await r.json();
    return NextResponse.json({
      city: data.name,
      tempC: data.main?.temp,
      tempF: Math.round((data.main?.temp ?? 0) * 9 / 5 + 32),
      condition: data.weather?.[0]?.main ?? "—",
      humidity: data.main?.humidity ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Network/Fetch failed", message: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
