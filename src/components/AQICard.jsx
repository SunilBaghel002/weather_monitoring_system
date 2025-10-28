import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AQICard = ({ data }) => {
  if (!data || data.aqi === "N/A") {
    return (
      <div className="white-glassmorphism p-8 text-center">
        <h3 className="text-xl font-bold mb-4 text-gradient">
          Air Quality Index
        </h3>
        <p className="text-yellow-300">
          {data?.message || "No data available"}
        </p>
        <p className="text-sm opacity-70 mt-2">
          Try Delhi, New York, or London
        </p>
      </div>
    );
  }

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#22c55e";
    if (aqi <= 100) return "#eab308";
    if (aqi <= 150) return "#f97316";
    if (aqi <= 200) return "#ef4444";
    if (aqi <= 300) return "#a855f7";
    return "#7f1fa5";
  };

  const getTip = (aqi) => {
    if (aqi <= 50) return "Good: Enjoy the fresh air!";
    if (aqi <= 100) return "Moderate: Fine for most.";
    if (aqi <= 150) return "Unhealthy for sensitive groups.";
    if (aqi <= 200) return "Unhealthy: Limit outdoor time.";
    if (aqi <= 300) return "Very Unhealthy: Stay indoors.";
    return "Hazardous: Health emergency.";
  };

  return (
    <div className="white-glassmorphism p-6 md:p-8 flex  items-center flex-col gap-2">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-gradient text-center">
        Air Quality Index (AQI)
      </h3>

      <div className="eth-card mx-auto w-56 h-56 mb-6 flex items-center justify-center">
        <div className="w-44 h-44">
          <CircularProgressbar
            value={data.aqi}
            maxValue={500}
            text={`${data.aqi}`}
            styles={buildStyles({
              pathColor: getAQIColor(data.aqi),
              textColor: "#fff",
              trailColor: "rgba(255,255,255,0.2)",
              textSize: "24px",
              pathTransitionDuration: 1.5,
            })}
          />
        </div>
      </div>

      <p className="text-center text-lg font-medium mb-4 text-white/90 w-full">
        {getTip(data.aqi)}
      </p>

      <div className="space-y-3 w-full">
        <h4 className="text-lg font-semibold text-gradient">Pollutants</h4>
        {Object.entries(data.pollutants).map(([key, { value, unit }]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="font-medium">{key.toUpperCase()}</span>
            <span className="text-white/80">
              {value.toFixed(1)} {unit}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs opacity-60 mt-4 text-center">
        Data from: {data.locationName}
      </p>
    </div>
  );
};

export default AQICard;
