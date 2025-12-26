import type { WeatherData } from "../types/weather";

const API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCurrentWeather(
	lat: number,
	lon: number,
): Promise<WeatherData> {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
		);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to fetch weather data, ${error.message}`);
	}
}

export async function getForecastWeather(
	lat: number,
	lon: number,
): Promise<WeatherData[]> {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
		);
		const data = await response.json();
		return data.list;
	} catch (error) {
		throw new Error(`Failed to fetch weather data, ${error.message}`);
	}
}
