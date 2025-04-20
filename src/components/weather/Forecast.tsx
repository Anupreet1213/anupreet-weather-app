import { useState } from "react";
import { FaCloudSun } from "react-icons/fa6";

const Forecast = () => {
  const [forecastView, setForecastView] = useState<"7Days" | "10Days">("7Days");

  // Static Data for now as not this data is not free with OpenWeatherAPI
  const forecastData = [
    {
      condition: "cloudy",
      date: "Sat, Apr 25",
      temp: {
        min: "32",
        max: "37",
      },
    },
    {
      condition: "cloudy",
      date: "Sat, Apr 25",
      temp: {
        min: "32",
        max: "37",
      },
    },
    {
      condition: "cloudy",
      date: "Sat, Apr 25",
      temp: {
        min: "32",
        max: "37",
      },
    },
    {
      condition: "cloudy",
      date: "Sat, Apr 25",
      temp: {
        min: "32",
        max: "37",
      },
    },
    {
      condition: "cloudy",
      date: "Sat, Apr 25",
      temp: {
        min: "32",
        max: "37",
      },
    },
  ]!;

  return (
    <div className="rounded-3xl p-4 glass col-span-1  md:col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Forecast</h2>
        <div className="flex rounded-lg bg-blue-700/30 p-1">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              forecastView === "7Days" ? "bg-white/20" : ""
            }`}
            onClick={() => setForecastView("7Days")}
          >
            7 Days
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              forecastView === "10Days" ? "bg-white/20" : ""
            }`}
            onClick={() => setForecastView("10Days")}
          >
            10 Days
          </button>
        </div>
      </div>

      {forecastData.map((day, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <FaCloudSun size={25} />
            </div>
            <p className="text-sm">{day.date}</p>
          </div>
          <div className="text-sm">
            <span className="font-medium">{day.temp.max}°</span>
            <span className="text-blue-300">/{day.temp.min}°</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
