import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import Map from "./Map";
import PopularCities from "./PopularCities";
import WeatherActivities from "./WeatherActivities";

const WeatherDetails = () => {
  
  return (
    <section className="grid grid-rows-5 lg:grid-cols-4 lg:grid-rows-2 gap-4 text-white">
        <CurrentWeather />
        <Map />
        <PopularCities />
        <Forecast />
        <WeatherActivities />
    </section>
  )
};

export default WeatherDetails;
