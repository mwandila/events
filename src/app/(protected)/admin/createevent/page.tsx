
"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useLoadScript, Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

enum EventCategory {
  MUSIC = "MUSIC",
  LIFESTYLE_EVENTS = "LIFESTYLE_EVENTS",
  HOLIDAY_CELEBRATIONS = "HOLIDAY_CELEBRATIONS",
  BUSINESS = "BUSINESS",
  CONCERTS_AND_CHURCH = "CONCERTS_AND_CHURCH",
  CONFERENCES_AND_WORKSHOPS = "CONFERENCES_AND_WORKSHOPS",
  SPORTS_AND_FITNESS = "SPORTS_AND_FITNESS",
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  MARKETING = "MARKETING",
  TECHNOLOGY = "TECHNOLOGY",
  EDUCATIONAL_EVENTS = "EDUCATIONAL_EVENTS",
  FASHION_SHOWS = "FASHION_SHOWS",
  HEALTH_AND_WELLNESS = "HEALTH_AND_WELLNESS",
  CULTURAL_FESTIVALS = "CULTURAL_FESTIVALS",
  GAMING_EVENTS = "GAMING_EVENTS",
  ENVIRONMENTAL_EVENTS = "ENVIRONMENTAL_EVENTS",
  TRADE_FAIR = "TRADE_FAIR",
  WEDDING = "WEDDING",
  FUNERAL = "FUNERAL",
  AGRICULTURAL_AND_COMMERCIAL_SHOW = "AGRICULTURAL_AND_COMMERCIAL_SHOW",
  ARTS_AND_THEATER = "ARTS_AND_THEATER",
  FAMILY_AND_KIDS = "FAMILY_AND_KIDS",
  FOOD_AND_DRINK = "FOOD_AND_DRINK",
  CHARITY_AND_FUNDRAISERS = "CHARITY_AND_FUNDRAISERS",
  NETWORKING_AND_SOCIAL_GATHERINGS = "NETWORKING_AND_SOCIAL_GATHERINGS",
  FILM_SCREENINGS = "FILM_SCREENINGS",
}

enum EventType {
  PHYSICAL = "PHYSICAL",
  ONLINE = "ONLINE",
}

interface MapComponentProps {
  onLocationChange: (location: string) => void;
  location: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationChange, location }) => {
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
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      zoom={14}
      onLoad={onLoad}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

const CreateEventPage: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [category, setCategory] = useState<EventCategory>(EventCategory.MUSIC);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [vipSeats, setVipSeats] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [vipPrice, setVipPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [eventType, setEventType] = useState<EventType>(EventType.PHYSICAL);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleLocationChange = useCallback((newLocation: string) => {
    setLocation(newLocation);
  }, []);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
    }
  };

  const resetForm = () => {
    setImage(null);
    setImagePreview(null);
    setTitle("");
    setDescription("");
    setDateStart("");
    setDateEnd("");
    setLocation("");
    setCategory(EventCategory.MUSIC);
    setTimeStart("");
    setTimeEnd("");
    setTotalSeats(0);
    setVipSeats(0);
    setRegularPrice(0);
    setVipPrice(0);
    setIsFree(false);
    setEventType(EventType.PHYSICAL);
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleImageChange(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleImageChange(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (!image) {
      setError("Image is required");
      setIsLoading(false);
      return;
    }
  
    // Combine date and time into ISO-8601 format
    const dateTimeStart = new Date(`${dateStart}T${timeStart}:00`).toISOString();
    const dateTimeEnd = new Date(`${dateEnd}T${timeEnd}:00`).toISOString();
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateStart", dateTimeStart);
    formData.append("dateEnd", dateTimeEnd);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("timeStart", timeStart);
    formData.append("timeEnd", timeEnd);
    formData.append("totalSeats", totalSeats.toString());
    formData.append("vipSeats", vipSeats.toString());
    formData.append("regularPrice", isFree ? "0" : regularPrice.toString());
    formData.append("vipPrice", isFree ? "0" : vipPrice.toString());
    formData.append("eventType", eventType);
  
    try {
      const response = await fetch("/api/organiser/dashboard/events/create", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Event created successfully!");
        setError("");
        resetForm();
      } else {
        setError(data.error);
        setSuccess("");
      }
    } catch (error) {
      setError("Error creating event");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white-700 h-auto min-h-[76vh] p-3 pt-6 md:p-6 md:pt-0 rounded-xl shadow-xl" style={{ maxWidth: "100%" }}>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Event Image:</label>
          <div
            className="border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Event" className="w-full h-auto" />
            ) : (
              <div className="text-center">Drag & Drop or Click to Upload</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Date Start:</label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Date End:</label>
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Time Start:</label>
          <input
            type="time"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Time End:</label>
          <input
            type="time"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Location:</label>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter location"
              required
            />
          </Autocomplete>
          <MapComponent onLocationChange={handleLocationChange} location={location} />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
            className="border rounded p-2 w-full"
            required
          >
            {Object.keys(EventCategory).map((key) => (
              <option key={key} value={key}>
                {EventCategory[key as keyof typeof EventCategory]}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Total Seats:</label>
          <input
            type="number"
            value={totalSeats}
            onChange={(e) => setTotalSeats(parseInt(e.target.value))}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">VIP Seats:</label>
          <input
            type="number"
            value={vipSeats}
            onChange={(e) => setVipSeats(parseInt(e.target.value))}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">Regular Price:</label>
          <input
            type="number"
            value={regularPrice}
            onChange={(e) => setRegularPrice(parseFloat(e.target.value))}
            className="border rounded p-2 w-full"
            required={!isFree}
            disabled={isFree}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 mb-2">VIP Price:</label>
          <input
            type="number"
            value={vipPrice}
            onChange={(e) => setVipPrice(parseFloat(e.target.value))}
            className="border rounded p-2 w-full"
            required={!isFree}
            disabled={isFree}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="mr-2"
            />
            Free Event
          </label>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Event Type:</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as EventType)}
            className="border rounded p-2 w-full"
            required
          >
            {Object.keys(EventType).map((key) => (
              <option key={key} value={key}>
                {EventType[key as keyof typeof EventType]}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="col-span-2 text-red-500">{error}</p>}
        {success && <p className="col-span-2 text-green-500">{success}</p>}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateEventPage;