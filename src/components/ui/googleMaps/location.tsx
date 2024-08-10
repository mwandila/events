// LocationInput.tsx

import React from 'react';
import { Autocomplete } from "@react-google-maps/api";

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ location, onLocationChange }) => {
  const [autocomplete, setAutocomplete] = React.useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onLocationChange(place.formatted_address);
      }
    }
  };

  return (
    <div className="col-span-2">
      <label className="block text-gray-700 mb-2">Location:</label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Enter location"
          required
        />
      </Autocomplete>
    </div>
  );
};

export default LocationInput;