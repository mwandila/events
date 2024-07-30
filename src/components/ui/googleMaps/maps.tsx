
// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   useLoadScript,
//   GoogleMap,
//   Marker,
//   DirectionsService,
//   DirectionsRenderer,
// } from "@react-google-maps/api";

// interface MapComponentProps {
//   location: string;
//   travelMode: google.maps.TravelMode;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ location, travelMode }) => {
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
//   const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

//   useEffect(() => {
//     if (!window.google) return;
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address: location }, (results, status) => {
//       if (status === "OK" && results && results[0].geometry && results[0].geometry.location) {
//         const newCenter = {
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng(),
//         };
//         setCenter(newCenter);
//         if (mapRef.current) {
//           mapRef.current.panTo(newCenter);
//         }
//       }
//     });
//   }, [location]);

//   const onLoad = useCallback((map: google.maps.Map) => {
//     mapRef.current = map;
//     map.setCenter(center);
//   }, [center]);

//   const calculateRoute = () => {
//     if (center) {
//       const directionsService = new google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: center,
//           destination: location,
//           travelMode: travelMode,
//         },
//         (result, status) => {
//           if (status === "OK" && result) {
//             setDirectionsResponse(result);
//           } else {
//             console.error(`error fetching directions ${result}`);
//           }
//         }
//       );
//     }
//   };

//   useEffect(() => {
//     calculateRoute();
//   }, [travelMode]);

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "400px" }}
//         zoom={14}
//         onLoad={onLoad}
//         center={center}
//       >
//         <Marker position={center} />
//         {directionsResponse && (
//           <DirectionsRenderer directions={directionsResponse} />
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapComponent;

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";

interface MapComponentProps {
  location: string;
  travelMode: google.maps.TravelMode;
}

const MapComponent: React.FC<MapComponentProps> = ({ location, travelMode }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [userCountry, setUserCountry] = useState<string>("US"); // Default to US

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

        // Reverse geocode to get the country
        geocoder.geocode({ location: newCenter }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const countryComponent = results[0].address_components.find(
              component => component.types.includes("country")
            );
            if (countryComponent) {
              setUserCountry(countryComponent.short_name);
            }
          }
        });
      }
    });
  }, [location]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.setCenter(center);
  }, [center]);

  const calculateRoute = () => {
    if (center) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: center,
          destination: location,
          travelMode: travelMode,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  useEffect(() => {
    calculateRoute();
  }, [travelMode]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          zoom={14}
          onLoad={onLoad}
          center={center}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className="w-full md:w-auto">
        <CurrencyConverter userCountry={userCountry} />
      </div>
    </div>
  );
};

export default MapComponent;