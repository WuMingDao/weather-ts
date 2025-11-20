import { useNavigate } from "react-router";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import Loading from "../ui/Loading";
import Day from "./Day";

function Home() {
  const navigate = useNavigate();

  const { isLoading } = useCurrentWeather();

  return (
    <>
      <div className="grid place-items-center my-40">
        {isLoading && <Loading />}
        {!isLoading && (
          <div>
            <Day />
            <button
              className="btn btn-info"
              onClick={() => navigate("/forecast")}
            >
              Get Start
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
