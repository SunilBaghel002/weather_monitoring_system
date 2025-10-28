import { createContext, useState, useEffect } from "react";
import {
  getWeatherData,
  getAQIData,
  getLocationFromCoords,
  getCoordsFromLocation,
} from "../services/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lon: null, city: "" });
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const city = await getLocationFromCoords(latitude, longitude);
            setLocation({
              lat: latitude,
              lon: longitude,
              city,
              key: Date.now(),
            });
          },
          () => {
            setLocation({
              lat: 28.6139,
              lon: 77.209,
              city: "Delhi, India",
              key: Date.now(),
            });
          }
        );
      } else {
        setLocation({
          lat: 28.6139,
          lon: 77.209,
          city: "Delhi, India",
          key: Date.now(),
        });
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon && location.key) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const weatherData = await getWeatherData(location.lat, location.lon);
          const aqiData = await getAQIData(location.lat, location.lon);

          console.log("Weather:", weatherData);
          console.log("AQI:", aqiData);

          setWeather(weatherData);
          setAqi(aqiData);
        } catch (err) {
          setError("Failed to load data");
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [location]);

  const searchLocation = async (query) => {
    try {
      const coords = await getCoordsFromLocation(query);
      if (coords) {
        setLocation({
          lat: coords.lat,
          lon: coords.lon,
          city: query,
          key: Date.now(), // ← Force refresh
        });
      } else {
        setError("Location not found.");
      }
    } catch (err) {
      setError("Search failed.");
    }
  };

  return (
    <DataContext.Provider
      value={{ location, weather, aqi, loading, error, searchLocation }}
    >
      {children}
    </DataContext.Provider>
  );
};
