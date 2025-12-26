import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";
import { getCurrentWeather } from "../services/apiWeather";
import { temperatureAtom, weatherIconAtom } from "../stores/weatherAtom";
import { getGeolocation } from "./useGeolocation";

export function useCurrentWeather() {
	const setTemperature = useSetAtom(temperatureAtom);
	const setWeatherIcon = useSetAtom(weatherIconAtom);

	async function loadDataApi(): Promise<void> {
		const position = await getGeolocation();

		const weatherData = await getCurrentWeather(
			position.latitude,
			position.longitude,
		);

		console.log(weatherData);

		setTemperature({
			min: weatherData.main.temp_min,
			max: weatherData.main.temp_max,
		});

		setWeatherIcon(weatherData.weather[0].icon);
	}

	const { mutate: loadData, isPending: isLoading } = useMutation({
		mutationFn: () => loadDataApi(),
		onSuccess: () => {
			toast.success("Data loaded");

			toast.dismiss(100);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		loadData();
	}, [loadData]);

	return { isLoading };
}
