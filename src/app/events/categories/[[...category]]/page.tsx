
"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { EventCategory, EventType } from "@prisma/client";
import { useInView } from "react-intersection-observer";
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader } from '@googlemaps/js-api-loader';
import debounce from 'lodash/debounce';
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import EventCard from "@/components/ui/category/eventCard";
import FilterEvents from "@/components/ui/category/filter";
import { FilterOptions, Event } from "@/types/eventscatTypes";

const EventsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeCategory = searchParams.get('category');

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const [category, setCategory] = useState<EventCategory | "">("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    dateRange: "This Week",
    priceRange: "All Prices",
    eventType: "All Types"
  });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (routeCategory) {
      setCategory(routeCategory as EventCategory);
    }
  }, [routeCategory]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      setMapLoaded(true);
    }).catch((error) => {
      console.error("Error loading Google Maps API:", error);
    });
  }, []);

  const loadEvents = useCallback(async () => {
    if (loading || !hasMoreEvents) return;
    setLoading(true);
    try {
      let url = `/api/getevents?page=${page}`;
      if (selectedLocation) {
        url += `&lat=${selectedLocation.lat}&lng=${selectedLocation.lng}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setAllEvents((prev) => [...prev, ...data.events]);
      setHasMoreEvents(data.currentPage < data.totalPages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMoreEvents, selectedLocation]);

  useEffect(() => {
    if (inView && hasMoreEvents) {
      loadEvents();
    }
  }, [inView, loadEvents, hasMoreEvents]);

  const handleSearch = useCallback(() => {
    const filtered = allEvents.filter((event) => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = category === "" || event.category === category;
      
      const matchesActiveFilters = 
        (activeFilters.categories.length === 0 || activeFilters.categories.includes(event.category)) &&
        (activeFilters.priceRange === "All Prices" || 
          (activeFilters.priceRange === "Free" && event.isFree) || 
          (activeFilters.priceRange === "Paid" && !event.isFree)) &&
        (activeFilters.eventType === "All Types" || event.eventType === activeFilters.eventType);
      
      // You may need to implement date range filtering based on your data structure
      // This is a placeholder for date range filtering
      const matchesDateRange = true; // Implement actual date range filtering logic here
  
      return matchesSearch && matchesCategory && matchesActiveFilters && matchesDateRange;
    });
    setFilteredEvents(filtered);
  }, [allEvents, searchTerm, category, activeFilters]);

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  useEffect(() => {
    debouncedHandleSearch();
    return () => debouncedHandleSearch.cancel();
  }, [searchTerm, category, activeFilters, debouncedHandleSearch]);

  const handlePlaceSelect = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSelectedLocation({ lat, lng });
        setSearchTerm(place.formatted_address || "");
        handleSearch();
      }
    }
  }, [autocomplete, setSelectedLocation, setSearchTerm, handleSearch]);

  useEffect(() => {
    if (mapLoaded && window.google) {
      const autocompleteInput = document.getElementById("search-input") as HTMLInputElement;
      const autocompleteInstance = new window.google.maps.places.Autocomplete(autocompleteInput, {
        types: ['geocode']
      });

      setAutocomplete(autocompleteInstance);

      autocompleteInstance.addListener("place_changed", handlePlaceSelect);

      autocompleteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });

      return () => {
        window.google.maps.event.clearInstanceListeners(autocompleteInstance);
      };
    }
  }, [mapLoaded, handlePlaceSelect]);

  const handleCategoryChange = (newCategory: EventCategory | "") => {
    setCategory(newCategory);
    router.push(`/events?category=${newCategory || ''}`);
  };

  const handleViewDetails = async (id: number) => {
    try {
      // Increment views
      const viewResponse = await fetch(`/api/english/${id}`, {
        method: 'GET',
      });
  
      if (!viewResponse.ok) {
        throw new Error('Failed to update view count');
      }
  
      // Increment clicks
      const clickResponse = await fetch(`/api/english/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clicks' }),
      });
  
      if (!clickResponse.ok) {
        throw new Error('Failed to update click count');
      }
  
      const updatedEvent = await clickResponse.json();
  
      // Update local state
      setAllEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id
            ? {
                ...event,
                engagements: [{
                  ...event.engagements[0],
                  views: updatedEvent.engagements[0]?.views || 0,
                  clicks: updatedEvent.engagements[0]?.clicks || 0,
                }],
              }
            : event
        )
      );
  
      // Navigate to the event details page
      router.push(`/events/${id}`);
    } catch (error) {
      console.error('Error updating engagement metrics:', error);
      // Navigate to the event details page even if the metric update fails
      router.push(`/events/${id}`);
    }
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <>
      <header className="bg-white shadow-sm p-1">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Event Explorer</h1>
          <div className="flex items-center space-x-1">
            <div className="relative">
              <Input
                id="search-input"
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <FilterEvents onApplyFilters={handleApplyFilters} />
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        {category && (
          <div className="mb-4 flex items-center">
            <Badge variant="secondary" className="text-sm">
              {category}
              <button onClick={() => handleCategoryChange("")} className="ml-2">
                <X size={14} />
              </button>
            </Badge>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 pr-3 pl-2">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        {hasMoreEvents && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadEvents} variant="secondary">
              See More Events
            </Button>
          </div>
        )}
        <div ref={ref} style={{ height: 6 }} />
      </main>
    </>
  );
};

export default EventsPage;