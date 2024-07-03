"use client";
import { Button } from "@/components/Button";
import Input from "@/components/form/Input";
import { GeoDataSchema, geoDataInput } from "./schemas/Geodata.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useGetGeoData from "./client-api/useGetGeoData";
import useGetWeatherData from "./client-api/useGetWeatherData";

const Weather = () => {
  const [location, setLocation] = useState<null | {
    lat: number;
    lon: number;
    displayName: string;
  }>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<geoDataInput>({
    mode: "onTouched",
    resolver: zodResolver(GeoDataSchema),
  });

  const { mutateAsync: getGeoData, isPending: isGeoDataPending } =
    useGetGeoData();

  const { data: weatherdata, isPending: isWeatherDataPending } =
    useGetWeatherData(
      location ? { lat: location.lat, lon: location.lon } : null,
    );

  return (
    <div className="mx-auto flex max-w-xs flex-col items-center justify-start px-3 md:px-0">
      <form
        onSubmit={handleSubmit(async (values) => {
          const locations = await getGeoData(values.address);
          if (locations.length > 0) {
            const location = locations[0];

            setLocation({
              lat: parseFloat(location.lat),
              lon: parseFloat(location.lon),
              displayName: location.display_name,
            });
          } else {
            setError("address", {
              message: "Invalid address provided.",
            });
          }
        })}
        className="flex flex-col items-center justify-start gap-2 md:flex-row"
      >
        <Input
          type="text"
          placeholder="Enter address"
          {...register("address")}
          error={errors.address?.message}
          className="w-full"
        />

        <Button
          type="submit"
          wrapperClass="w-full md:w-auto"
          className={
            "mt-6 flex w-full items-center justify-center py-4 text-sm/none md:mt-0 md:w-auto md:py-4"
          }
          isSpinning={isGeoDataPending}
        >
          Find
        </Button>
      </form>

      {!location && (
        <p className="mt-8 max-w-xs text-center text-[0.65rem] text-gray-500">
          Enter the address of your desired location, we will feed you with the
          latest weather data.
        </p>
      )}

      {weatherdata && !isWeatherDataPending && (
        <div className="relative mt-10 flex flex-col items-center justify-center rounded-xl border p-5">
          <div className="absolute -right-7 -top-10 m-3">
            <div className="rounded-full bg-gray-50 p-3 shadow-md">
              {weatherdata.weather[0].main.toLowerCase().includes("clouds") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 text-gray-800"
                  viewBox="0 0 32.471 21.383"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M6.523 21.385h17.91c4.52 0 8.04-3.42 8.04-7.77 0-4.41-3.65-7.7-8.46-7.68-1.8-3.65-5.05-5.93-9.23-5.93-5.28 0-9.64 4.21-10.09 9.57-2.71.73-4.69 2.98-4.69 5.9 0 3.39 2.53 5.91 6.52 5.91z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : weatherdata.weather[0].main.toLowerCase().includes("rain") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 text-gray-800"
                  viewBox="0 0 30.98 31.17"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M6.233 20.44h17.06c4.38 0 7.69-3.31 7.69-7.44 0-4.24-3.5-7.35-8.05-7.35-1.71-3.44-4.79-5.65-8.84-5.65-5.04 0-9.2 4.03-9.64 9.12-2.51.7-4.45 2.79-4.45 5.66 0 3.12 2.28 5.66 6.23 5.66zm14.21 10.36l4.18-7.23c.19-.34.1-.71-.22-.9-.31-.19-.7-.1-.91.26l-4.16 7.22c-.19.35-.11.72.22.93.33.17.7.08.89-.28zm-3.2-3.88l1.93-3.34c.2-.34.1-.72-.22-.93-.33-.17-.71-.07-.92.28l-1.94 3.36c-.19.33-.11.71.23.9.33.19.73.08.92-.27zm-7.69 3.9l4.19-7.24c.2-.34.11-.72-.22-.91-.32-.18-.71-.09-.92.26l-4.15 7.22c-.19.35-.11.73.22.93.32.19.69.08.88-.26zm-3.2-3.89l1.93-3.33c.22-.36.11-.74-.22-.93-.32-.19-.71-.09-.91.27l-1.94 3.35c-.2.34-.1.72.23.92.33.19.72.06.91-.28z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 text-gray-800"
                  viewBox="0 0 29.326 29.395"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14.673 4.958c.49 0 .9-.39.9-.9V.898c0-.5-.41-.9-.9-.9-.51 0-.91.4-.91.9v3.16c0 .51.4.9.91.9zm6.86 2.88c.36.32.93.35 1.29 0l2.24-2.25c.34-.35.33-.93 0-1.28-.36-.34-.93-.34-1.27 0l-2.26 2.25a.93.93 0 000 1.28zm-13.74 0c.34-.36.34-.95.01-1.28l-2.24-2.25c-.34-.34-.91-.34-1.27 0-.34.35-.36.93-.01 1.27l2.24 2.26c.34.34.91.32 1.27 0zm6.86 13.59c3.71 0 6.73-3.01 6.73-6.73 0-3.72-3.02-6.74-6.73-6.74-3.72 0-6.74 3.02-6.74 6.74s3.02 6.73 6.74 6.73zm9.72-6.73c0 .49.41.9.91.9h3.15c.5 0 .89-.41.89-.9 0-.51-.39-.9-.89-.9h-3.15c-.5 0-.91.39-.91.9zm-19.42 0c0-.51-.4-.9-.91-.9H.903c-.51 0-.9.39-.9.9 0 .49.39.9.9.9h3.14c.51 0 .91-.41.91-.9zm2.85 6.88c-.35-.35-.94-.36-1.28 0l-2.24 2.22c-.36.35-.35.92-.02 1.28.36.34.95.35 1.29.01l2.24-2.24c.34-.36.34-.92.01-1.27zm13.73 0c-.34.35-.34.91 0 1.27l2.26 2.24c.34.36.91.34 1.27 0 .33-.36.34-.93 0-1.27l-2.26-2.24c-.34-.36-.91-.35-1.27 0zm-6.86 2.85c-.51 0-.91.4-.91.89v3.17c0 .5.4.91.91.91.49 0 .9-.41.9-.91v-3.17a.9.9 0 00-.9-.89z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <p className="max-w-44 text-balance text-center text-[0.6rem] uppercase tracking-wider text-gray-600">
            {location?.displayName.split(",").slice(0, 3).join(",")}
          </p>
          <h3 className="mt-2 text-6xl font-light text-gray-800">
            {weatherdata.main.temp.toFixed(1)}&deg;
          </h3>
          <p className="mt-2 text-center text-base text-gray-800">
            {weatherdata.weather[0].description}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <p>H: {weatherdata.main.temp_max.toFixed(1)}&deg;</p>
            <p>L: {weatherdata.main.temp_min.toFixed(1)}&deg;</p>
          </div>
        </div>
      )}

      {/* skeleton loading */}
      {location && isWeatherDataPending && (
        <div className="relative z-10 mt-10 h-52 w-56 animate-pulse rounded-xl bg-gray-300">
          <div className="absolute -right-6 -top-7 z-30 size-14 rounded-full bg-gray-300 shadow-md"></div>
        </div>
      )}
    </div>
  );
};

export default Weather;
