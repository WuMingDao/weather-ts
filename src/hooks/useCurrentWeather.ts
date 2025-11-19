import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { temperatureAtom, weatherIconAtom } from "../stores/weatherAtom";
import { useGeolocation } from "./useGeolocation";
import { getCurrentWeather } from "../services/apiWeather";

export function useCurrentWeather() {
  const setTemperature = useSetAtom(temperatureAtom);
  const setWeatherIcon = useSetAtom(weatherIconAtom);

  async function loadDataApi(): Promise<void> {
    const position = await useGeolocation();

    const weatherData = await getCurrentWeather(
      position.latitude,
      position.longitude
    );

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

      toast.dismiss();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  return { isLoading };
}
