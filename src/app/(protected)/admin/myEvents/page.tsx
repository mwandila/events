
"use client"
import React, { useState, useEffect, useCallback } from "react";
import { EventCategory, EventStatus, EventType } from "@prisma/client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, Trash2, Edit, Check } from 'lucide-react';

interface Event {
  id: number;
  imagePath: string | null;
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
  status: EventStatus;
  user: { name: string | null };
}

interface EventCardProps {
  event: Event;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
  onEdit: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete, onPublish, onEdit }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 bg-white h-full w-full col-span-1">
      {event.imagePath && (
        <div className="relative h-48 w-full">
          <Image
            src={event.imagePath}
            alt={event.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
        <h3 className="text-xl font-bold text-white drop-shadow-md">{event.title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onPublish(event.id)}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <Check size={16} />
          </button>
          <button 
            onClick={() => onEdit(event.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => onDelete(event.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
       
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${event.isFree ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
            {event.isFree ? 'Free' : 'Paid'}
          </span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${event.isAvailable ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {event.isAvailable ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{event.dateStart} - {event.dateEnd}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">{event.timeStart} - {event.timeEnd}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            <span className="font-semibold">Total Seats:</span> {event.totalSeats}
          </div>
          <div className="text-sm">
            <span className="font-semibold">VIP Seats:</span> {event.vipSeats}
          </div>
        </div>
        {!event.isFree && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">
              <span className="font-semibold">Regular Price:</span> ${event.regularPrice}
            </div>
            <div className="text-sm">
              <span className="font-semibold">VIP Price:</span> ${event.vipPrice}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-700">
            {event.category}
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-500 text-white">
            {event.status}
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-500 text-white">
            {event.eventType}
          </span>
        </div>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<EventCategory | "">("");
  const [status, setStatus] = useState<EventStatus | "">("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadEvents = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/organiser/dashboard/events/myEvents?page=${page}&category=${category}&status=${status}`
      );
      const data = await res.json();
      setEvents((prev) => [...prev, ...data.events]);
      setHasMore(data.currentPage < data.totalPages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  }, [page, category, status, loading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadEvents();
    }
  }, [inView, loadEvents]);

  const handleFilterChange = () => {
    setEvents([]);
    setPage(1);
    setHasMore(true);
  };

  const handleDeleteEvent = async (id: number) => {
    // Implement your delete logic here
    setEvents(events.filter(event => event.id !== id));
  };

  const handlePublishEvent = async (id: number) => {
    // Implement your publish logic here
    console.log(`Publishing event ${id}`);
  };

  const handleEditEvent = async (id: number) => {
    // Implement your edit logic here
    console.log(`Editing event ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="mb-8 flex space-x-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as EventCategory);
            handleFilterChange();
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">All Categories</option>
          {Object.values(EventCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as EventStatus);
            handleFilterChange();
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">All Statuses</option>
          {Object.values(EventStatus).map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onDelete={handleDeleteEvent}
            onPublish={handlePublishEvent}
            onEdit={handleEditEvent}
          />
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading more events...</p>}
      <div ref={ref} style={{ height: "10px" }} />
    </div>
  );
};

export default EventsPage;
