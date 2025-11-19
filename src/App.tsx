import { useEffect, useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import { getCurrentWeather } from "./services/apiWeather";
import Day from "./components/Day";
import { useSetAtom } from "jotai";
import { temperatureAtom, weatherIconAtom } from "./stores/weatherAtom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Loading from "./ui/Loading";

function App() {
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

  return (
    <>
      <div className="grid place-items-center h-screen">
        {isLoading && <Loading />}
        {!isLoading && (
          <div>
            <Day />
            <button className="btn btn-info">Get Start</button>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
