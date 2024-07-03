import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GeoData } from "./types";

const useGetGeoData = () => {
  return useMutation({
    mutationKey: ["use-get-geo-data"],
    mutationFn: async (address: string): Promise<GeoData[]> => {
      try {
        const response = await axios.get("https://geocode.maps.co/search", {
          params: {
            q: address,
            api_key: process.env.NEXT_PUBLIC_GEO_CODE_API_KEY,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch geocode data");
      }
    },
  });
};

export default useGetGeoData;
