// hooks/useEventForm.ts

import { useState } from "react";
import { EventFormData, EventCategory, EventType } from "../types/eventTypes";

const initialFormData: EventFormData = {
  image: null,
  imagePreview: null,
  title: "",
  description: "",
  dateStart: "",
  dateEnd: "",
  timeStart: "",
  timeEnd: "",
  location: "",
  category: EventCategory.MUSIC,
  totalSeats: 0,
  vipSeats: 0,
  regularPrice: 0,
  vipPrice: 0,
  isFree: false,
  eventType: EventType.PHYSICAL,
};

export const useEventForm = () => {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (file: File) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleLocationChange = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location,
    }));
  };

  return {
    formData,
    setFormData,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleLocationChange,
  };
};