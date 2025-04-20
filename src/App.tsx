import { useEffect, useState } from "react";
import "./App.css";
import WeatherContainer from "./components/weather/WeatherContainer";
import WeatherContext, { CityWeatherData } from "./contexts/WeatherContext";
import { Sidebar } from "./components/sidebar/Sidebar";

function App() {
  const [cityName, setCityName] = useState("");
  const [activeLocation, setActiveLocation] = useState("");
  const [cityData, setCityData] = useState<CityWeatherData | null>(null);

  const [favouriteCities, setFavouriteCities] = useState<string[]>([]);

  useEffect(() => {
    const getUserLocation = async () => {
      if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by your browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const res = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=531d62e11e4d72edc7e225909b3b5c32`
            );
            const data = await res.json();
            const city = data?.[0]?.name;
  
            if (city) {
              setCityName(city); // ✅ Set cityName from context
            }
          } catch (error) {
            console.error("Failed to reverse geocode coordinates:", error);
          }
        },
        (error) => {
          console.warn("User denied location access or error occurred:", error);
        }
      );
    };
  
    getUserLocation();
  }, []);
  

  useEffect(()=>{
    const local = localStorage.getItem("favouriteCities");
    const savedCities: string[] = local ? JSON.parse(local) : [];
    setFavouriteCities(savedCities)
  },[])
  return (
    <WeatherContext.Provider
      value={{
        cityName,
        setCityName,
        cityData,
        setCityData,
        favouriteCities,
        setFavouriteCities,
      }}
    >
      <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white overflow-hidden">
        <Sidebar
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
        />
        <main className="flex-1 overflow-y-auto p-4">
          <WeatherContainer />
        </main>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
