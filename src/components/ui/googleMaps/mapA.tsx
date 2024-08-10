// MapComponent.tsx

import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  location: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!window.google) return;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results && results[0].geometry && results[0].geometry.location) {
        const newCenter = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setCenter(newCenter);
        if (mapRef.current) {
          mapRef.current.panTo(newCenter);
        }
      }
    });
  }, [location]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.setCenter(center);
  }, [center]);

  return (
    <div className="col-span-2">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={14}
        onLoad={onLoad}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;