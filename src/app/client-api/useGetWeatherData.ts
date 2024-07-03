import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WeatherData } from "./types";

const useGetWeatherData = (location: null | { lat: number; lon: number }) => {
  return useQuery({
    queryKey: ["use-get-weather-data", location],
    queryFn: async (): Promise<WeatherData | null> => {
      try {
        if (!location) return null;

        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: location.lat,
              lon: location.lon,
              units: "metric",
              appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
            },
          },
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch weather data");
      }
    },
    retry: 1,
  });
};

export default useGetWeatherData;
