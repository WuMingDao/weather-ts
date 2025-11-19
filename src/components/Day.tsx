import { useAtomValue } from "jotai";
import { temperatureAtom, weatherIconAtom } from "../stores/weatherAtom";

function Day() {
  const temperature = useAtomValue(temperatureAtom);
  const weatherIcon = useAtomValue(weatherIconAtom);

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  function formatDay(dateStr: string) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  return (
    <li className="day">
      <img src={weatherIconUrl} />
      <p>Today</p>
      <p>
        {Math.floor(temperature.min)}&deg; &mdash; {Math.ceil(temperature.max)}
        &deg;
      </p>
    </li>
  );
}
export default Day;
