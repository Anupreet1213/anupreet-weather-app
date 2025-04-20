// import { FaCloudSun } from "react-icons/fa6";
import { RiMistFill } from "react-icons/ri";
import { LuDroplets } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import { WiThermometer } from "react-icons/wi";
import WeatherContext from "../../contexts/WeatherContext";
import { useContext } from "react";
import Sunny from "../weather-animations/Sunny";
import PartlyCloudy from "../weather-animations/PartlyCloudy";
import Cloudy from "../weather-animations/Cloudy";
import Rainy from "../weather-animations/Rainy";
import Thunder from "../weather-animations/Thunder";

const CurrentWeather = () => {
  const { cityData } = useContext(WeatherContext)!;
  const toCelsius = (k: number) => Math.round((k - 273.15) * 10) / 10;

  const getWeatherAnimation = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sunny />;
      case "clouds":
        return <Cloudy />;
      case "rain":
        return <Rainy />;
      case "thunderstorm":
        return <Thunder />;
      case "drizzle":
        return <Rainy />;
      case "mist":
        return <Cloudy />;
      case "fog":
        return <Cloudy />;
      case "haze":
        return <Cloudy />;
      case "snow":
        return <Cloudy />;
      case "partly cloudy":
        return <PartlyCloudy />
      default:
        return <Cloudy />;
    }
  };
  

  return (
    <div className="rounded-3xl p-4 relative glass col-span-1">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Current Weather</h2>
        <p className="text-sm">
          {new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6 mb-8">
        <div className="w-20 h-20">
          {cityData && getWeatherAnimation(cityData.weather[0].main)}
        </div>
        <div className="flex flex-col">
          <div className="flex items-start">
            <span className="text-7xl font-bold">
              {cityData ? `${toCelsius(cityData.main.temp)}` : "--"}
            </span>
            <span className="text-2xl mt-2">°C</span>
          </div>
          <span className="capitalize">
            {cityData ? cityData.weather[0].description : "Weather"}
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full grid grid-cols-4 gap-2 mt-4">
        <div className="flex flex-col items-center">
          <RiMistFill className="mb-1" size={20} />
          <span className="text-lg font-semibold">
            {cityData ? cityData.main?.pressure : "--"}
          </span>
          <span className="text-xs">hPa</span>
        </div>
        <div className="flex flex-col items-center">
          <LuDroplets className="mb-1" size={20} />
          <span className="text-lg font-semibold">
            {cityData ? `${cityData.main.humidity}%` : "--"}
          </span>
          <span className="text-xs">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <FaWind className="mb-1" size={20} />
          <span className="text-lg font-semibold">
            {cityData ? cityData.wind.speed : "--"}
          </span>
          <span className="text-xs">m/s</span>
        </div>
        <div className="flex flex-col items-center">
          <WiThermometer className="mb-1" size={20} />
          <span className="text-lg font-semibold">{cityData ? `${toCelsius(cityData.main.feels_like)}` : "--"}</span>
          <span className="text-xs">Feels like</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
