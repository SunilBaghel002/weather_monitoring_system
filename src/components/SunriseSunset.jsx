import { WiSunrise, WiSunset } from "react-icons/wi";

const SunriseSunset = ({ data }) => {
  if (!data) return null;

  return (
    <div className="white-glassmorphism p-6 md:p-8 text-center group h-fit">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient">
        Sunrise & Sunset
      </h3>

      <div className="flex justify-around items-center text-lg space-x-8">
        {/* SUNRISE */}
        <div className="flex flex-col items-center">
          <WiSunrise
            size={70}
            className="text-yellow-400 mb-3 transition-transform group-hover:scale-110"
          />
          <p className="text-3xl font-bold text-yellow-400">{data.sunrise}</p>
          <p className="text-sm opacity-70 mt-1">Sunrise</p>
        </div>

        {/* SUNSET */}
        <div className="flex flex-col items-center">
          <WiSunset
            size={70}
            className="text-orange-400 mb-3 transition-transform group-hover:scale-110"
          />
          <p className="text-3xl font-bold text-orange-400">{data.sunset}</p>
          <p className="text-sm opacity-70 mt-1">Sunset</p>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
