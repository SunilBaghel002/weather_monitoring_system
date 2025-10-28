import axios from "axios";

// PM2.5 to AQI (US EPA simplified)
// const calculateAQI = (pm25) => {
//   if (pm25 < 0) return 0;
//   if (pm25 <= 12.0) return Math.round((50 * pm25) / 12.0);
//   if (pm25 <= 35.4) return Math.round((50 * (pm25 - 12.1)) / 23.3 + 51);
//   if (pm25 <= 55.4) return Math.round((50 * (pm25 - 35.5)) / 19.9 + 101);
//   if (pm25 <= 150.4) return Math.round((50 * (pm25 - 55.5)) / 94.9 + 151);
//   if (pm25 <= 250.4) return Math.round((100 * (pm25 - 150.5)) / 99.9 + 201);
//   return Math.round((200 * (pm25 - 250.5)) / 249.9 + 301);
// };

export const getAQIData = async (lat, lon) => {
  try {
    // Use YOUR token from .env
    const token = import.meta.env.VITE_AQICN_TOKEN || 'demo';

    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;
    const res = await axios.get(url);

    console.log("AQICN Response:", res.data);

    const apiData = res.data.data;
    if (!apiData || res.data.status !== 'ok') {
      return { 
        aqi: 'N/A', 
        pollutants: {}, 
        message: 'No AQI data available' 
      };
    }

    // Extract AQI (real-time with your token)
    const aqi = apiData.aqi || 'N/A';

    // Extract pollutants
    const pollutants = {};
    if (apiData.iaqi) {
      if (apiData.iaqi.pm25)  pollutants.pm25 = { value: apiData.iaqi.pm25.v,  unit: 'µg/m³' };
      if (apiData.iaqi.pm10)  pollutants.pm10 = { value: apiData.iaqi.pm10.v,  unit: 'µg/m³' };
      if (apiData.iaqi.o3)    pollutants.o3   = { value: apiData.iaqi.o3.v,    unit: 'µg/m³' };
      if (apiData.iaqi.no2)   pollutants.no2  = { value: apiData.iaqi.no2.v,   unit: 'µg/m³' };
      if (apiData.iaqi.so2)   pollutants.so2  = { value: apiData.iaqi.so2.v,   unit: 'µg/m³' };
      if (apiData.iaqi.co)    pollutants.co   = { value: apiData.iaqi.co.v,    unit: 'mg/m³' };
    }

    const locationName = apiData.city?.name || 'Nearby Station';

    const result = {
      aqi,
      pollutants,
      locationName,
    };

    console.log("Final AQI Result:", result);

    return result;
  } catch (err) {
    console.error('AQICN fetch failed:', err.message);
    return { aqi: 'N/A', pollutants: {}, message: 'AQI unavailable' };
  }
};
export const getWeatherData = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure&daily=sunrise,sunset&timezone=auto`;
  const res = await axios.get(url);
  const data = res.data;
  return {
    temperature: data.current_weather.temperature,
    humidity: data.hourly.relative_humidity_2m[0],
    windSpeed: data.current_weather.windspeed,
    pressure: data.hourly.surface_pressure[0],
    sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sunset: new Date(data.daily.sunset[0]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    condition: data.current_weather.weathercode,
  };
};

export const getCoordsFromLocation = async (query) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=1`;
  const res = await axios.get(url);
  if (res.data.length > 0) {
    return {
      lat: parseFloat(res.data[0].lat),
      lon: parseFloat(res.data[0].lon),
    };
  }
  return null;
};

export const getLocationFromCoords = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await axios.get(url);
  return res.data.display_name || "Unknown";
};
