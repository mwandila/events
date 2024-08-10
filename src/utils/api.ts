// utils/api.ts

import { EventFormData } from "../types/eventTypes";

export const createEvent = async (formData: EventFormData) => {
  const apiFormData = new FormData();
  
  if (formData.image) {
    apiFormData.append("image", formData.image);
  }
  
  apiFormData.append("title", formData.title);
  apiFormData.append("description", formData.description);
  apiFormData.append("dateStart", new Date(`${formData.dateStart}T${formData.timeStart}:00`).toISOString());
  apiFormData.append("dateEnd", new Date(`${formData.dateEnd}T${formData.timeEnd}:00`).toISOString());
  apiFormData.append("location", formData.location);
  apiFormData.append("category", formData.category);
  apiFormData.append("totalSeats", formData.totalSeats.toString());
  apiFormData.append("vipSeats", formData.vipSeats.toString());
  apiFormData.append("regularPrice", formData.isFree ? "0" : formData.regularPrice.toString());
  apiFormData.append("vipPrice", formData.isFree ? "0" : formData.vipPrice.toString());
  apiFormData.append("eventType", formData.eventType);

  const response = await fetch("/api/organiser/dashboard/events/create", {
    method: "POST",
    body: apiFormData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error creating event");
  }

  return response.json();
};