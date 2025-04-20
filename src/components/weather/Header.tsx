import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import WeatherContext from "../../contexts/WeatherContext";
import { Bounce, toast } from "react-toastify";
import { BsTwitter } from "react-icons/bs";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Header = () => {
  const { cityName, setCityName, setCityData, setFavouriteCities, cityData } =
    useContext(WeatherContext)!;

  const [bookmarked, setBookmarked] = useState(false);
  const [debouncedCity, setDebouncedCity] = useState(cityName);

  // Debounce input to reduce API calls while typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(cityName);
    }, 500);
    return () => clearTimeout(handler);
  }, [cityName]);

  // Reset bookmark icon when search is cleared
  useEffect(() => {
    if (debouncedCity === "") {
      setBookmarked(false);
    }
  }, [debouncedCity]);

  // Fetch weather data when the debounced city changes
  useEffect(() => {
    if (!debouncedCity) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await res.json();

        if (res.ok) {
          setCityData(data);
        } else {
          console.warn("City not found or API error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  const handleBookmark = () => {
    if (!debouncedCity) return;

    const local = localStorage.getItem("favouriteCities");
    const savedCities: string[] = local ? JSON.parse(local) : [];

    if (savedCities.includes(debouncedCity)) {
      toast.error("City already bookmarked!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      setBookmarked(true);
      return;
    }

    // Limit to 5 cities; remove the oldest if necessary
    if (savedCities.length >= 5) {
      savedCities.shift();
    }

    savedCities.push(debouncedCity);
    localStorage.setItem("favouriteCities", JSON.stringify(savedCities));
    setFavouriteCities(savedCities);
    setBookmarked(true);

    toast.success("City bookmarked", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const weatherDescription = cityData?.weather?.[0]?.main?.toLowerCase();
  const city = cityName || "your city";

  const tweetText = `Hey, it's a ${weatherDescription} day in ${city}! What's your plan for the day? ☁️\nCheck the weather here 👉 https://anupreet-weather-app.vercel.app/`;

  return (
    <nav className="flex justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative glass">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg" />
          <input
            type="text"
            placeholder="Search for location"
            className="w-full rounded-md py-2 pl-10 pr-4 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>

        {debouncedCity ? (
          bookmarked ? (
            <FaBookmark onClick={() => setBookmarked(false)} size={25} />
          ) : (
            <IoBookmarkOutline onClick={handleBookmark} size={25} />
          )
        ) : null}
      </div>

      <div className="flex justify-center items-center gap-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitter className="hidden md:block hover:translate-x-1 transition-all" size={25} />
        </a>
        <IoIosNotifications className="hidden md:block " size={28} />
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
