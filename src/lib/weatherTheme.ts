// src/lib/weatherTheme.ts
export type WeatherTheme = {
    bg: string;      // gradient for page background
    card: string;    // card surface tint
    ring?: string;   // optional accent (inputs, buttons)
  };
  
  export function weatherTheme(condition?: string): WeatherTheme {
    const c = (condition || "").toLowerCase();
  
    // Clear / Sunny
    if (c.includes("clear")) {
      return {
        bg: "bg-gradient-to-b from-yellow-300 via-orange-300 to-rose-300",
        card: "bg-white/70",
        ring: "focus:ring-yellow-400",
      };
    }
  
    // Clouds
    if (c.includes("cloud")) {
      return {
        bg: "bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700",
        card: "bg-white/10",
        ring: "focus:ring-slate-300",
      };
    }
  
    // Rain / Drizzle
    if (c.includes("rain") || c.includes("drizzle")) {
      return {
        bg: "bg-gradient-to-b from-sky-300 via-sky-500 to-indigo-700",
        card: "bg-white/10",
        ring: "focus:ring-sky-300",
      };
    }
  
    // Thunderstorm
    if (c.includes("thunder")) {
      return {
        bg: "bg-gradient-to-b from-indigo-700 via-purple-700 to-slate-900",
        card: "bg-white/10",
        ring: "focus:ring-purple-400",
      };
    }
  
    // Snow
    if (c.includes("snow")) {
      return {
        bg: "bg-gradient-to-b from-slate-100 via-blue-100 to-cyan-200",
        card: "bg-white/80",
        ring: "focus:ring-cyan-400",
      };
    }
  
    // Fog / Mist / Haze
    if (c.includes("fog") || c.includes("mist") || c.includes("haze")) {
      return {
        bg: "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400",
        card: "bg-white/60",
        ring: "focus:ring-gray-300",
      };
    }
  
    // Fallback (night-ish)
    return {
      bg: "bg-gradient-to-b from-slate-900 to-slate-800",
      card: "bg-white/5",
      ring: "focus:ring-indigo-400",
    };
  }
  