import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ lat, lon, city }) => {
  if (!lat || !lon) return null;

  return (
    <div className="map-container">
      <MapContainer
        center={[lat, lon]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
