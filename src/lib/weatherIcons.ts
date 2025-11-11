export function weatherEmoji(condition: string): string{
    const main = condition.toLowerCase();

    if(main.includes("snow")) return "❄️";
    if(main.includes("rain")) return "🌧️";
    if(main.includes("drizzle")) return "🌦️";
    if(main.includes("thunder")) return "⛈️";
    if(main.includes("cloud")) return "☁️";
    if(main.includes("clear")) return "☀️";
    if(main.includes("fog") || main.includes("mist") || main.includes("haze")) return "🌫️";

    return "🌈";



}