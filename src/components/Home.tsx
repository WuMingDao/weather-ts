import { useCurrentWeather } from "../hooks/useCurrentWeather";
import Loading from "../ui/Loading";
import Day from "./Day";

function Home() {
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
export default Home;
