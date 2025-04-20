import { useContext, useEffect, useRef, useState, } from "react";
import { FaCloudSun } from "react-icons/fa6";
import WeatherContext, { CityWeatherData } from "../../contexts/WeatherContext";

const API_KEY = "531d62e11e4d72edc7e225909b3b5c32";

const PopularCities =() => {
  const { favouriteCities } = useContext(WeatherContext)!;
  const [weatherData, setWeatherData] = useState<Record<string, CityWeatherData>>({});
  const fetchedCitiesRef = useRef<Set<string>>(new Set());

  const toCelsius = (k: number) => Math.round((k - 273.15) * 10) / 10;

  // For fetching weather details of all FavouriteCities
  useEffect(() => {
    if (!favouriteCities || favouriteCities.length === 0) return;

    localStorage.setItem("favouriteCities", JSON.stringify(favouriteCities));

    const fetchNewCityData = async () => {
      const updatedData: Record<string, CityWeatherData> = { ...weatherData };
      const citiesToFetch = favouriteCities.filter(
        (city) => !fetchedCitiesRef.current.has(city)
      );

      await Promise.all(
        citiesToFetch.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            const result = await res.json();
            updatedData[city] = result;
            fetchedCitiesRef.current.add(city);
          } catch (error) {
            console.error("Error fetching weather for city:", city, error);
          }
        })
      );

      setWeatherData(updatedData);
    };

    fetchNewCityData();
  }, [favouriteCities]);

  return (
    <div className="rounded-3xl p-4 glass md:col-span-4 lg:col-span-1">
      <h2 className="text-xl font-semibold mb-4">Favourite Cities</h2>
      <div className="flex flex-col gap-6">
        {favouriteCities?.map((city) => {
          const cityWeather = weatherData[city];
          const condition =
            cityWeather?.weather?.[0]?.description || "Loading...";
          const temp = cityWeather?.main?.temp
            ? `${toCelsius(cityWeather.main.temp)}°C`
            : "--";

          return (
            <div key={city} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaCloudSun size={25} />
                <span className="text-lg">{city}</span>
              </div>
              <div className="flex flex-col text-right text-sm">
                <span className="capitalize">{condition}</span>
                <span className="font-medium">{temp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCities;
