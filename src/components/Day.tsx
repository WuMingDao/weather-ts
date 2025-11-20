import { useAtomValue } from "jotai";
import { temperatureAtom, weatherIconAtom } from "../stores/weatherAtom";

function Day() {
  const temperature = useAtomValue(temperatureAtom);
  const weatherIcon = useAtomValue(weatherIconAtom);

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

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
