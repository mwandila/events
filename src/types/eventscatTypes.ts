import { EventCategory, EventType } from "@prisma/client";

export interface Event {
  id: number;
  imagePath: string ;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  category: EventCategory;
  timeStart: string;
  timeEnd: string;
  totalSeats: number;
  vipSeats: number;
  isAvailable: boolean;
  regularPrice: number;
  vipPrice: number;
  isFree: boolean;
  eventType: EventType;
  user: { name: string | null };
  engagements: {
    views: number;
    clicks: number;
    shares: number;
    likes: number;
  }[];
}

export interface FilterOptions {
  categories: string[];
  dateRange: string;
  priceRange: string;
  eventType: string;
}