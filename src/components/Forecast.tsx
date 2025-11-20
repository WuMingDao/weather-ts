import { useAtomValue } from "jotai";
import { forecastAtom } from "../stores/weatherAtom";
import { useForecast } from "../hooks/useForecast";
import type { weather } from "../types/weather";
import { formatDay } from "../utils/formatDayHelper";
import Loading from "../ui/Loading";

function Forecast() {
  const { isLoading } = useForecast();

  const forecastList = useAtomValue(forecastAtom);

  return (
    <div className="grid place-items-center h-screen">
      {isLoading && <Loading />}
      {!isLoading && (
        <ul className="list bg-base-100 rounded-box">
          {forecastList.map((weather: weather) => (
            <li className="list-row mx-auto gap-60" key={weather.data}>
              <div className="flex items-center gap-4">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={`https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
                  />
                </div>
                <div>
                  <div>{weather.weather}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {formatDay(weather.data)}
                  </div>
                </div>
              </div>

              <div className="text-2xl">
                <p>
                  {Math.floor(weather.min)}&deg; &mdash;{" "}
                  {Math.ceil(weather.max)}
                  &deg;
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      ;
    </div>
  );
}
export default Forecast;
