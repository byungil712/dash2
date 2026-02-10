import React, { useCallback, useEffect, useState } from "react";
import {
   MapContainer,
   TileLayer,
   useMapEvents,
   Marker,
   Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ handleMapLocationChange }) {
   const [position, setPosition] = useState(null);

   useMapEvents({
      click(e) {
         const { lat, lng } = e.latlng;
         setPosition(e.latlng);
         handleMapLocationChange(lat, lng);
      },
   });

   return position === null ? null : (
      <Marker position={position}>
         <Popup>날씨를 가져오는 중...</Popup>
      </Marker>
   );
}

const Map = ({ handleMapLocationChange, currentLat, currentLon }) => {
   return (
      <div className="map_container">
         <MapContainer
            center={[currentLat || 37.5665, currentLon || 126.978]} // 기본: 서울
            zoom={10}
            className="map"
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker handleMapLocationChange={handleMapLocationChange} />
         </MapContainer>
      </div>
   );
};

export default Map;
