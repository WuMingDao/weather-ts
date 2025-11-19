import Day from "./components/Day";
import Loading from "./ui/Loading";
import { useCurrentWeather } from "./hooks/useCurrentWeather";

function App() {
  const { isLoading } = useCurrentWeather();

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
