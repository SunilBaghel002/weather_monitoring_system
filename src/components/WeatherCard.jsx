import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const getWeatherIcon = (code) => {
    const iconProps = {
      size: 70,
      className: "mx-auto mb-3 transition-transform group-hover:scale-110",
    };
    if (code === 0)
      return <WiDaySunny {...iconProps} className="text-yellow-400" />;
    if (code >= 1 && code <= 3)
      return <WiCloud {...iconProps} className="text-gray-300" />;
    if (code >= 51 && code <= 67)
      return <WiRain {...iconProps} className="text-blue-400" />;
    if (code >= 71 && code <= 77)
      return <WiSnow {...iconProps} className="text-white" />;
    if (code >= 95)
      return <WiThunderstorm {...iconProps} className="text-purple-400" />;
    return <WiCloud {...iconProps} className="text-gray-300" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* TEMPERATURE */}
      <div className="white-glassmorphism p-6 text-center group flex justify-center flex-col items-center">
        {getWeatherIcon(data.condition)}
        <h3 className="text-3xl font-bold mt-2">{data.temperature}°C</h3>
        <p className="text-sm opacity-80">Temperature</p>
      </div>

      {/* HUMIDITY */}
      <div className="white-glassmorphism p-6 text-center group flex justify-center flex-col items-center">
        <WiHumidity
          size={70}
          className="mx-auto mb-3 text-cyan-400 transition-transform group-hover:scale-110"
        />
        <div className="text-3xl font-bold">{data.humidity}%</div>
        <p className="text-sm opacity-80 mt-1">Humidity</p>
      </div>

      {/* WIND SPEED */}
      <div className="white-glassmorphism p-6 text-center group flex justify-center flex-col items-center">
        <WiStrongWind
          size={70}
          className="mx-auto mb-3 text-teal-400 transition-transform group-hover:scale-110"
        />
        <div className="text-3xl font-bold">{data.windSpeed} m/s</div>
        <p className="text-sm opacity-80 mt-1">Wind Speed</p>
      </div>

      {/* PRESSURE */}
      <div className="white-glassmorphism p-6 text-center group flex justify-center flex-col items-center">
        <WiBarometer
          size={70}
          className="mx-auto mb-3 text-indigo-400 transition-transform group-hover:scale-110"
        />
        <div className="text-3xl font-bold">{data.pressure} hPa</div>
        <p className="text-sm opacity-80 mt-1">Pressure</p>
      </div>
    </div>
  );
};

export default WeatherCard;
