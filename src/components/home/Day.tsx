import { useAtomValue } from "jotai";
import { temperatureAtom, weatherIconAtom } from "../../stores/weatherAtom";

function Day() {
	const temperature = useAtomValue(temperatureAtom);
	const weatherIcon = useAtomValue(weatherIconAtom);

	const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

	return (
		<div className="flex flex-col items-center my-10">
			<img src={weatherIconUrl} alt="Weather icon" />
			<div>Today</div>
			<p>
				{Math.floor(temperature.min)}&deg; &mdash; {Math.ceil(temperature.max)}
				&deg;
			</p>
		</div>
	);
}
export default Day;
