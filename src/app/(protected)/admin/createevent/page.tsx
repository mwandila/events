
// "use client"
// // CreateEventPage.tsx
// import React, { useState } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import { EventCategory, EventFormData, EventType } from "@/types/eventTypes";
// import ImageUploader from "@/components/ui/eventform/imageUpload";
// import EventForm from "@/components/ui/eventform/eventform";
// import LocationInput from "@/components/ui/googleMaps/location";
// import MapComponent from "@/components/ui/googleMaps/maps";


// const CreateEventPage: React.FC = () => {
//   const [formData, setFormData] = useState<EventFormData>({
//     image: null,
//     imagePreview: null,
//     title: "",
//     description: "",
//     dateStart: "",
//     dateEnd: "",
//     location: "",
//     category: EventCategory.MUSIC,
//     timeStart: "",
//     timeEnd: "",
//     totalSeats: 0,
//     vipSeats: 0,
//     regularPrice: 0,
//     vipPrice: 0,
//     isFree: false,
//     eventType: EventType.PHYSICAL,
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//     libraries: ["places"],
//   });

//   const handleInputChange = (name: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsLoading(true);

//     if (!formData.image) {
//       setError("Image is required");
//       setIsLoading(false);
//       return;
//     }

//     // Combine date and time into ISO-8601 format
//     const dateTimeStart = new Date(`${formData.dateStart}T${formData.timeStart}:00`).toISOString();
//     const dateTimeEnd = new Date(`${formData.dateEnd}T${formData.timeEnd}:00`).toISOString();

//     const submitData = new FormData();
//     submitData.append("image", formData.image);
//     submitData.append("title", formData.title);
//     submitData.append("description", formData.description);
//     submitData.append("dateStart", dateTimeStart);
//     submitData.append("dateEnd", dateTimeEnd);
//     submitData.append("location", formData.location);
//     submitData.append("category", formData.category);
//     submitData.append("timeStart", formData.timeStart);
//     submitData.append("timeEnd", formData.timeEnd);
//     submitData.append("totalSeats", formData.totalSeats.toString());
//     submitData.append("vipSeats", formData.vipSeats.toString());
//     submitData.append("regularPrice", formData.isFree ? "0" : formData.regularPrice.toString());
//     submitData.append("vipPrice", formData.isFree ? "0" : formData.vipPrice.toString());
//     submitData.append("eventType", formData.eventType);

//     try {
//       const response = await fetch("/api/organiser/dashboard/events/create", {
//         method: "POST",
//         body: submitData,
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setSuccess("Event created successfully!");
//         setError("");
//         // Reset form
//         setFormData({
//           image: null,
//           imagePreview: null,
//           title: "",
//           description: "",
//           dateStart: "",
//           dateEnd: "",
//           location: "",
//           category: EventCategory.MUSIC,
//           timeStart: "",
//           timeEnd: "",
//           totalSeats: 0,
//           vipSeats: 0,
//           regularPrice: 0,
//           vipPrice: 0,
//           isFree: false,
//           eventType: EventType.PHYSICAL,
//         });
//       } else {
//         setError(data.error);
//         setSuccess("");
//       }
//     } catch (error) {
//       setError("Error creating event");
//       setSuccess("");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="bg-white-700 h-auto min-h-[76vh] p-3 pt-6 md:p-6 md:pt-0 rounded-xl shadow-xl" style={{ maxWidth: "100%" }}>
//       <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
//         <ImageUploader
//           imagePreview={formData.imagePreview}
//           onImageChange={(file) => {
//             handleInputChange("image", file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               handleInputChange("imagePreview", reader.result as string);
//             };
//             reader.readAsDataURL(file);
//           }}
//         />
//         <EventForm
//           formData={formData}
//           onInputChange={handleInputChange}
//         />
//         <LocationInput
//           location={formData.location}
//           onLocationChange={(location) => handleInputChange("location", location)}
//         />
//         <MapComponent location={formData.location} travelMode={google.maps.BICYCLING} />
//         {error && <p className="col-span-2 text-red-500">{error}</p>}
//         {success && <p className="col-span-2 text-green-500">{success}</p>}
//         <div className="col-span-2">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded p-2 w-full"
//             disabled={isLoading}
//           >
//             {isLoading ? "Creating..." : "Create Event"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEventPage;

"use client";
// CreateEventPage.tsx
import React, { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { EventCategory, EventFormData, EventType } from "@/types/eventTypes";
import ImageUploader from "@/components/ui/eventform/imageUpload";
import EventForm from "@/components/ui/eventform/eventform";
import LocationInput from "@/components/ui/googleMaps/location";
import MapComponent from "@/components/ui/googleMaps/maps"; // Ensure this points to the updated MapComponent

const CreateEventPage: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    image: null,
    imagePreview: null,
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    category: EventCategory.MUSIC,
    timeStart: "",
    timeEnd: "",
    totalSeats: 0,
    vipSeats: 0,
    regularPrice: 0,
    vipPrice: 0,
    isFree: false,
    eventType: EventType.PHYSICAL,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!formData.image) {
      setError("Image is required");
      setIsLoading(false);
      return;
    }

    // Combine date and time into ISO-8601 format
    const dateTimeStart = new Date(`${formData.dateStart}T${formData.timeStart}:00`).toISOString();
    const dateTimeEnd = new Date(`${formData.dateEnd}T${formData.timeEnd}:00`).toISOString();

    const submitData = new FormData();
    submitData.append("image", formData.image);
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("dateStart", dateTimeStart);
    submitData.append("dateEnd", dateTimeEnd);
    submitData.append("location", formData.location);
    submitData.append("category", formData.category);
    submitData.append("timeStart", formData.timeStart);
    submitData.append("timeEnd", formData.timeEnd);
    submitData.append("totalSeats", formData.totalSeats.toString());
    submitData.append("vipSeats", formData.vipSeats.toString());
    submitData.append("regularPrice", formData.isFree ? "0" : formData.regularPrice.toString());
    submitData.append("vipPrice", formData.isFree ? "0" : formData.vipPrice.toString());
    submitData.append("eventType", formData.eventType);

    try {
      const response = await fetch("/api/organiser/dashboard/events/create", {
        method: "POST",
        body: submitData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Event created successfully!");
        setError("");
        // Reset form
        setFormData({
          image: null,
          imagePreview: null,
          title: "",
          description: "",
          dateStart: "",
          dateEnd: "",
          location: "",
          category: EventCategory.MUSIC,
          timeStart: "",
          timeEnd: "",
          totalSeats: 0,
          vipSeats: 0,
          regularPrice: 0,
          vipPrice: 0,
          isFree: false,
          eventType: EventType.PHYSICAL,
        });
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
        <ImageUploader
          imagePreview={formData.imagePreview}
          onImageChange={(file) => {
            handleInputChange("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
              handleInputChange("imagePreview", reader.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <EventForm
          formData={formData}
          onInputChange={handleInputChange}
        />
        <LocationInput
          location={formData.location}
          onLocationChange={(location) => handleInputChange("location", location)}
        />
        <MapComponent location={formData.location} /> {/* Removed travelMode prop */}
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