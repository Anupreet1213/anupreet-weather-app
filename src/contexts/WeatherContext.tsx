import { createContext } from "react";

export interface CityWeatherData {
  name: string;
  weather: WeatherInterface[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure:number;
  };

  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export interface WeatherInterface {

    main: string;
    description: string;
    icon: string;

}
export interface WeatherContextType {
  cityName: string;
  setCityName: (name: string) => void;
  favouriteCities: string[];
  setFavouriteCities: React.Dispatch<React.SetStateAction<string[]>>;
  cityData: CityWeatherData | null;
  setCityData: (data: CityWeatherData) => void;
}


const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export default WeatherContext;
