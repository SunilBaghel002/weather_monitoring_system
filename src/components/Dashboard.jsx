import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import WeatherCard from "./WeatherCard";
import AQICard from "./AQICard";
import SunriseSunset from "./SunriseSunset";
import MapView from "./MapView";
import Prompt from "./Prompt"

const Dashboard = () => {
  const { location, weather, aqi, loading, error } = useContext(DataContext);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <span className="spinner mb-4"></span>
        <p className="text-lg">Fetching weather & air quality...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-300">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="center space-y-10 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gradient margin">
        {location.city} Weather & Air Quality
      </h1>

      <div className="w-full margin small">
        <WeatherCard data={weather} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 margin">
        <SunriseSunset data={weather} />
        <AQICard data={aqi} />
      </div>

      <div className="w-full">
        <div className="white-glassmorphism p-3 rounded-xl overflow-hidden">
          <MapView lat={location.lat} lon={location.lon} city={location.city} />
        </div>
      </div>
      <Prompt/>
    </div>
  );
};

export default Dashboard;
