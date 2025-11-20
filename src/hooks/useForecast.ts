import { useSetAtom } from "jotai";
import { useGeolocation } from "./useGeolocation";
import { getForecastWeather } from "../services/apiWeather";
import { useEffect } from "react";
import { forecastAtom } from "../stores/weatherAtom";
import type { weather } from "../types/weather";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useForecast() {
  const setForecast = useSetAtom(forecastAtom);

  async function loadForecastDataApi() {
    const position = await useGeolocation();

    const ForecastData = await getForecastWeather(
      position.latitude,
      position.longitude
    );

    // console.log(ForecastData);

    const forecastList = ForecastData.list
      .map((item: any) => {
        const weather = item.weather[0];

        return {
          weatherIcon: weather.icon,
          weather: weather.main,
          min: item.main.temp_min,
          max: item.main.temp_max,
          data: item.dt_txt,
        };
      })
      .filter((item: weather) => item.data.includes("12:00:00"))
      .filter((item: weather) => {
        const currDate = new Date().getDate();
        const weatherDate = new Date(item.data).getDate();

        return currDate !== weatherDate;
      });

    // console.log(forecastList);

    setForecast(forecastList);
  }

  const { mutate: loadForecastData, isPending: isLoading } = useMutation({
    mutationFn: () => loadForecastDataApi(),
    onSuccess: () => {
      toast.success("Data loaded");

      toast.dismiss();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    loadForecastData();
  }, []);

  return { isLoading };
}
