import { useContext, useState } from "react";
import WeatherContext from "../../contexts/WeatherContext";

const Map = () => {
  const { cityData } = useContext(WeatherContext)!;
  const [isLoading, setIsLoading] = useState(true);
  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  return (
    <div className="md:col-span-3  lg:col-span-2 rounded-3xl relative overflow-hidden ">
      {isLoading && (
        <div className="absolute inset-0 z-10 rounded-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}

      <iframe
        style={{ border: "0" }}
        className={`w-full h-full rounded-3xl transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${cityData?.name}`}
      ></iframe>
    </div>
  );
};

export default Map;
