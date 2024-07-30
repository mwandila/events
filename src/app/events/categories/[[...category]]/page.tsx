
"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { EventCategory, EventType } from "@prisma/client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, Eye, Share2, ThumbsUp, Search, Filter, X, Facebook, Instagram } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader } from '@googlemaps/js-api-loader';
import debounce from 'lodash/debounce';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Event interface
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
  user: { name: string | null };
  engagements: {
    views: number;
    clicks: number;
    shares: number;
    likes: number;
  }[];
}

interface FilterOptions {
  categories: string[];
  dateRange: string;
  priceRange: string;
  eventType: string;
}

interface FilterEventsProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

const FilterEvents: React.FC<FilterEventsProps> = ({ onApplyFilters }) => {
  const [categories, setCategories] = useState<Record<string, boolean>>({});
  const [dateRange, setDateRange] = useState<string>("This Week");
  const [priceRange, setPriceRange] = useState<string>("All Prices");
  const [eventType, setEventType] = useState<string>("All Types");

  const categoryOptions: string[] = Object.values(EventCategory);

  const handleCategoryChange = (category: string) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: Object.keys(categories).filter(key => categories[key]),
      dateRange,
      priceRange,
      eventType
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2" size={18} />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-2 font-semibold">Categories</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={categories[category] || false}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Date Range</h3>
            <Select onValueChange={(value: string) => setDateRange(value)} defaultValue={dateRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
                <SelectItem value="This Year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Price Range</h3>
            <Select onValueChange={(value: string) => setPriceRange(value)} defaultValue={priceRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Prices">All Prices</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Event Type</h3>
            <Select onValueChange={(value: string) => setEventType(value)} defaultValue={eventType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  );
};

const EventCard: React.FC<{ event: Event; onViewDetails: (id: number) => void }> = ({ event, onViewDetails }) => {
  const [likes, setLikes] = useState(event.engagements[0]?.likes || 0);
  const [shares, setShares] = useState(event.engagements[0]?.shares || 0);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/english/${event.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'likes' }),
      });

      if (response.ok) {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  const handleShare = async (platform: string) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'instagram':
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard. You can now paste it on Instagram.');
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }

    try {
      const response = await fetch(`/api/english/${event.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'shares' }),
      });

      if (response.ok) {
        setShares(shares + 1);
      }
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  return (
    <Card className="h-full w-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          {event.imagePath ? (
            <Image
              src={event.imagePath}
              alt={event.title}
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <Calendar size={48} className="text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-yellow/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-md">{event.title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-hidden">
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline">{event.category}</Badge>
          <Badge variant={event.isAvailable ? "success" : "destructive"}>{event.isAvailable ? 'Available' : 'Not Available'}</Badge>
        </div>
        {!event.isFree && (
          <div className="flex justify-between items-center mb-4 text-sm">
            <span>Regular: ${event.regularPrice}</span>
            <span>VIP: ${event.vipPrice}</span>
          </div>
        )}
        <Button 
          onClick={() => onViewDetails(event.id)} 
          variant="secondary" 
          className="w-full bg-orange-700 hover:bg-blue-400 text-white mt-2"
        >
          View Details
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50">
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="flex items-center"><Eye size={16} className="mr-1" />{event.engagements[0]?.views || 0}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Share2 size={16} className="mr-1" />{shares}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex space-x-2">
                <Button onClick={() => handleShare('facebook')} variant="outline" size="sm">
                  <Facebook size={16} />
                </Button>
                <Button onClick={() => handleShare('instagram')} variant="outline" size="sm">
                  <Instagram size={16} />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={handleLike} variant="ghost" size="sm" className="flex items-center">
            <ThumbsUp size={16} className="mr-1" />{likes}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

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

  useEffect(() => {
    if (mapLoaded && window.google) {
      const autocompleteInput = document.getElementById("search-input") as HTMLInputElement;
      const autocompleteInstance = new window.google.maps.places.Autocomplete(autocompleteInput, {
        types: ['geocode']
      });

      setAutocomplete(autocompleteInstance);

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setSelectedLocation({ lat, lng });
          setSearchTerm(place.formatted_address || "");
          handleSearch();
        }
      });

      autocompleteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });
    }
  }, [mapLoaded]);
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
  
  const debouncedHandleSearch = useMemo(() => debounce(() => {
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
  }, 300), [allEvents, searchTerm, category, activeFilters]);
  
  useEffect(() => {
    debouncedHandleSearch();
  }, [searchTerm, category, activeFilters, debouncedHandleSearch]);
  
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
  
  const handleSearch = () => {
    debouncedHandleSearch();
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
