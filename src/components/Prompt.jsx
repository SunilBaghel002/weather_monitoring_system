function Prompt(){
    return(
        <div>
            Create a **beautiful, responsive, standalone web app** using **only HTML, CSS, and vanilla JavaScript** (no React, no frameworks, no build tools) that displays:

---

### FEATURES REQUIRED:
1. **Search Bar**  
   - Input field to search any city (e.g., "Delhi", "New York", "London")
   - On Enter or button click → fetch data

2. **Weather Card (4 Metrics)**  
   - Temperature (°C) with sun/cloud/rain icon
   - Humidity (%) with water droplet icon
   - Wind Speed (m/s) with wind icon
   - Pressure (hPa) with barometer icon
   - Use **react-icons/wi** style icons via CDN or SVG

3. **Sunrise & Sunset Card**  
   - Two columns: Sunrise + Sunset
   - Icons: sunrise (yellow), sunset (orange)
   - Time in 12-hour format (e.g., 06:30 AM)

4. **Air Quality Index (AQI) Card**  
   - **Circular progress gauge** showing AQI (0–500)
   - Color-coded: Green (0–50), Yellow (51–100), Orange (101–150), Red (151–200), Purple (201–300), Maroon (301+)
   - Text tip below: "Good", "Moderate", "Unhealthy", etc.
   - List of pollutants: PM2.5, PM10, NO2, O3, SO2, CO with values and units
   - Source: "Data from: [City/Station]"

5. **Map View**  
   - Embedded **Leaflet.js map** centered on searched city
   - Marker with popup showing city name

---

"### APIs to Use (Free):
- **Weather**: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=...`
- **AQI**: `https://api.waqi.info/feed/geo:{lat};{lon}/?token=demo`  
  → Use **demo token** (replaceable later)
- **Geocoding**: `https://nominatim.openstreetmap.org/search?q={city}&format=json`
"
---

### DESIGN & STYLE:
- **Glassmorphism cards** (blur, transparency, border)
- **Dark gradient background** (deep blue → purple)
- **Gradient text** for titles
- **Hover animations** (scale, shadow lift)
- **Fully responsive** (mobile, tablet, desktop)
- **Loading spinner** while fetching
- **Error message** if city not found or API fails

---

### TECH STACK:
- **HTML5**
- **Tailwind CSS via CDN** (or pure CSS if preferred)
- **Vanilla JS** (async/await, fetch)
- **Leaflet.js** for map (CDN)
- **Circular Progress Bar**: Use `progressbar.js` or pure CSS/SVG
- **Icons**: Font Awesome or SVG inline

---

### FOLDER STRUCTURE (Single File OK):
        </div>
    )
}

export default Prompt;