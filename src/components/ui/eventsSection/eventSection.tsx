
// "use client"

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Search, Calendar, MapPin, Users, Filter } from 'lucide-react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';

// enum EventCategory {
//   WEDDING = 'Wedding',
//   FUNERAL = 'Funeral',
//   BUSINESS = 'Business',
//   MUSIC = 'Music',
//   LIFESTYLE_EVENTS = 'Lifestyle',
//   EDUCATIONAL_EVENTS = 'Educational',
//   HOLIDAY_CELEBRATIONS = 'Holiday',
//   FASHION_SHOWS = 'Fashion',
//   HEALTH_AND_WELLNESS = 'Health & Wellness',
//   CULTURAL_FESTIVALS = 'Cultural',
//   GAMING_EVENTS = 'Gaming',
//   ENVIRONMENTAL_EVENTS = 'Environmental',
//   TRADE_FAIR = 'Trade Fair',
//   AGRICULTURAL_AND_COMMERCIAL_SHOW = 'Agricultural & Commercial',
//   WEB_DEVELOPMENT = 'Web Development',
//   MARKETING = 'Marketing',
//   TECHNOLOGY = 'Technology',
//   CONCERTS_AND_CHURCH = 'Concerts & Church',
//   CONFERENCES_AND_WORKSHOPS = 'Conferences & Workshops',
//   SPORTS_AND_FITNESS = 'Sports & Fitness',
//   ARTS_AND_THEATER = 'Arts & Theater',
//   FAMILY_AND_KIDS = 'Family & Kids',
//   FOOD_AND_DRINK = 'Food & Drink',
//   CHARITY_AND_FUNDRAISERS = 'Charity & Fundraisers',
//   COMEDY_SHOWS = 'Comedy',
//   NETWORKING_AND_SOCIAL_GATHERINGS = 'Networking & Social',
//   FILM_SCREENINGS = 'Film Screenings',
// }

// interface Event {
//   id: number;
//   imagePath: string;
//   title: string;
//   dateStart: string;
//   dateEnd: string;
//   timeStart: string;
//   timeEnd: string;
//   location: string;
//   category: EventCategory;
//   totalSeats: number;
//   vipSeats: number;
//   regularPrice: number;
//   vipPrice: number;
//   description: string;
//   isFree: boolean;
//   eventType: string;
// }

// interface FilterOptions {
//   categories: EventCategory[];
//   dateRange: string;
//   priceRange: string;
//   eventType: string;
// }

// const EventSection: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     categories: [],
//     dateRange: 'all',
//     priceRange: 'all',
//     eventType: 'all',
//   });

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('/api/organiser/dashboard/events/allevents');
//         if (!response.ok) {
//           const text = await response.text();
//           console.error('Error fetching events:', text);
//           throw new Error('Failed to fetch events');
//         }
//         const data: Event[] = await response.json();
//         setEvents(data);
//         setFilteredEvents(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const applyFilters = () => {
//       let result = events;

//       // Apply search filter
//       if (searchTerm) {
//         result = result.filter(event => 
//           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           event.description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       // Apply category filter
//       if (filterOptions.categories.length > 0) {
//         result = result.filter(event => filterOptions.categories.includes(event.category));
//       }

//       // Apply date range filter
//       if (filterOptions.dateRange !== 'all') {
//         const today = new Date();
//         const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
//         const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

//         result = result.filter(event => {
//           const eventDate = new Date(event.dateStart);
//           switch (filterOptions.dateRange) {
//             case 'today':
//               return eventDate.toDateString() === today.toDateString();
//             case 'thisWeek':
//               return eventDate >= today && eventDate <= nextWeek;
//             case 'thisMonth':
//               return eventDate >= today && eventDate <= nextMonth;
//             default:
//               return true;
//           }
//         });
//       }

//       // Apply price range filter
//       if (filterOptions.priceRange !== 'all') {
//         result = result.filter(event => {
//           if (filterOptions.priceRange === 'free') return event.isFree;
//           if (filterOptions.priceRange === 'paid') return !event.isFree;
//           return true;
//         });
//       }

//       // Apply event type filter
//       if (filterOptions.eventType !== 'all') {
//         result = result.filter(event => event.eventType === filterOptions.eventType);
//       }

//       setFilteredEvents(result);
//     };

//     applyFilters();
//   }, [events, searchTerm, filterOptions]);

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Event Dashboard</h1>
//         <p className="text-xl text-center text-gray-600 mb-8">Discover and manage exciting events</p>
        
//         <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
//           <Input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-1/2"
//           />
//           <FilterDialog filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
//         </div>

//         <EventGrid events={filteredEvents} />
//       </div>
//     </div>
//   );
// };

// const FilterDialog: React.FC<{
//   filterOptions: FilterOptions;
//   setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
// }> = ({ filterOptions, setFilterOptions }) => {
//   const [tempFilters, setTempFilters] = useState(filterOptions);

//   const handleCategoryChange = (category: EventCategory) => {
//     setTempFilters(prev => ({
//       ...prev,
//       categories: prev.categories.includes(category)
//         ? prev.categories.filter(c => c !== category)
//         : [...prev.categories, category]
//     }));
//   };

//   const applyFilters = () => {
//     setFilterOptions(tempFilters);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Filter Events</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-2">
//           <div className="grid grid-cols-6 items-start gap-4">
//             <Label htmlFor="categories" className="text-right col-span-1">
//               Categories
//             </Label>
//             <div className="col-span-5 grid grid-cols-3 gap-2">
//               {Object.values(EventCategory).map(category => (
//                 <div key={category} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={category}
//                     checked={tempFilters.categories.includes(category)}
//                     onCheckedChange={() => handleCategoryChange(category)}
//                   />
//                   <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{category}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="dateRange" className="text-right">
//               Date Range
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, dateRange: value }))}
//               defaultValue={tempFilters.dateRange}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select date range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Dates</SelectItem>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="thisWeek">This Week</SelectItem>
//                 <SelectItem value="thisMonth">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="priceRange" className="text-right">
//               Price Range
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, priceRange: value }))}
//               defaultValue={tempFilters.priceRange}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select price range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Prices</SelectItem>
//                 <SelectItem value="free">Free</SelectItem>
//                 <SelectItem value="paid">Paid</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="eventType" className="text-right">
//               Event Type
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, eventType: value }))}
//               defaultValue={tempFilters.eventType}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select event type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="ONLINE">Online</SelectItem>
//                 <SelectItem value="IN_PERSON">In Person</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button onClick={applyFilters}>Apply Filters</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const EventGrid: React.FC<{ events: Event[] }> = ({ events }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//     {events.map(event => (
//       <Card key={event.id} className="overflow-hidden transition-transform transform hover:scale-105">
//         <CardHeader className="p-0">
//           <Image src={event.imagePath} alt={event.title} width={500} height={300} className="w-full h-48 object-cover" />
//         </CardHeader>
//         <CardContent className="p-4">
//           <CardTitle className="text-xl font-semibold mb-2">{event.title}</CardTitle>
//           <div className="flex items-center text-gray-600 mb-2">
//             <Calendar className="w-4 h-4 mr-2" />
//             <span>{event.dateStart}</span>
//           </div>
//           <div className="flex items-center text-gray-600 mb-2">
//             <MapPin className="w-4 h-4 mr-2" />
//             <span>{event.eventType === 'ONLINE' ? 'Online' : event.location}</span>
//           </div>
//           <div className="flex items-center text-gray-600 mb-2">
//             <Users className="w-4 h-4 mr-2" />
//             <span>{event.totalSeats} seats</span>
//           </div>
//           {!event.isFree && (
//             <div className="text-gray-800 font-semibold mt-2">
//               <p>Standard: K{event.regularPrice}</p>
//               <p>VIP: K{event.vipPrice}</p>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full">
//             {event.isFree ? 'Register' : 'Buy Ticket'}
//           </Button>
//         </CardFooter>
//       </Card>
//     ))}
//   </div>
// );

// export default EventSection;

// EventSection.tsx
// "use client"

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Search, Calendar, MapPin, Users, Filter } from 'lucide-react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';

// enum EventCategory {
//   WEDDING = 'Wedding',
//   FUNERAL = 'Funeral',
//   BUSINESS = 'Business',
//   MUSIC = 'Music',
//   LIFESTYLE_EVENTS = 'Lifestyle',
//   EDUCATIONAL_EVENTS = 'Educational',
//   HOLIDAY_CELEBRATIONS = 'Holiday',
//   FASHION_SHOWS = 'Fashion',
//   HEALTH_AND_WELLNESS = 'Health & Wellness',
//   CULTURAL_FESTIVALS = 'Cultural',
//   GAMING_EVENTS = 'Gaming',
//   ENVIRONMENTAL_EVENTS = 'Environmental',
//   TRADE_FAIR = 'Trade Fair',
//   AGRICULTURAL_AND_COMMERCIAL_SHOW = 'Agricultural & Commercial',
//   WEB_DEVELOPMENT = 'Web Development',
//   MARKETING = 'Marketing',
//   TECHNOLOGY = 'Technology',
//   CONCERTS_AND_CHURCH = 'Concerts & Church',
//   CONFERENCES_AND_WORKSHOPS = 'Conferences & Workshops',
//   SPORTS_AND_FITNESS = 'Sports & Fitness',
//   ARTS_AND_THEATER = 'Arts & Theater',
//   FAMILY_AND_KIDS = 'Family & Kids',
//   FOOD_AND_DRINK = 'Food & Drink',
//   CHARITY_AND_FUNDRAISERS = 'Charity & Fundraisers',
//   COMEDY_SHOWS = 'Comedy',
//   NETWORKING_AND_SOCIAL_GATHERINGS = 'Networking & Social',
//   FILM_SCREENINGS = 'Film Screenings',
// }

// interface Event {
//   id: number;
//   imagePath: string;
//   title: string;
//   dateStart: string;
//   dateEnd: string;
//   timeStart: string;
//   timeEnd: string;
//   location: string;
//   category: EventCategory;
//   totalSeats: number;
//   vipSeats: number;
//   regularPrice: number;
//   vipPrice: number;
//   description: string;
//   isFree: boolean;
//   eventType: string;
// }

// interface FilterOptions {
//   categories: EventCategory[];
//   dateRange: string;
//   priceRange: string;
//   eventType: string;
// }

// const EventSection: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     categories: [],
//     dateRange: 'all',
//     priceRange: 'all',
//     eventType: 'all',
//   });

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('/api/organiser/dashboard/events/allevents');
//         if (!response.ok) {
//           const text = await response.text();
//           console.error('Error fetching events:', text);
//           throw new Error('Failed to fetch events');
//         }
//         const data: Event[] = await response.json();
//         setEvents(data);
//         setFilteredEvents(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const applyFilters = () => {
//       let result = events;

//       // Apply search filter
//       if (searchTerm) {
//         result = result.filter(event => 
//           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           event.description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       // Apply category filter
//       if (filterOptions.categories.length > 0) {
//         result = result.filter(event => filterOptions.categories.includes(event.category));
//       }

//       // Apply date range filter
//       if (filterOptions.dateRange !== 'all') {
//         const today = new Date();
//         const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
//         const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

//         result = result.filter(event => {
//           const eventDate = new Date(event.dateStart);
//           switch (filterOptions.dateRange) {
//             case 'today':
//               return eventDate.toDateString() === today.toDateString();
//             case 'thisWeek':
//               return eventDate >= today && eventDate <= nextWeek;
//             case 'thisMonth':
//               return eventDate >= today && eventDate <= nextMonth;
//             default:
//               return true;
//           }
//         });
//       }

//       // Apply price range filter
//       if (filterOptions.priceRange !== 'all') {
//         result = result.filter(event => {
//           if (filterOptions.priceRange === 'free') return event.isFree;
//           if (filterOptions.priceRange === 'paid') return !event.isFree;
//           return true;
//         });
//       }

//       // Apply event type filter
//       if (filterOptions.eventType !== 'all') {
//         result = result.filter(event => event.eventType === filterOptions.eventType);
//       }

//       setFilteredEvents(result);
//     };

//     applyFilters();
//   }, [events, searchTerm, filterOptions]);

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Event Dashboard</h1>
//         <p className="text-xl text-center text-gray-600 mb-8">Discover and manage exciting events</p>
        
//         <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
//           <Input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-1/2"
//           />
//           <FilterDialog filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
//         </div>

//         <EventGrid events={filteredEvents} />
//       </div>
//     </div>
//   );
// };

// const FilterDialog: React.FC<{
//   filterOptions: FilterOptions;
//   setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
// }> = ({ filterOptions, setFilterOptions }) => {
//   const [tempFilters, setTempFilters] = useState(filterOptions);

//   const handleCategoryChange = (category: EventCategory) => {
//     setTempFilters(prev => ({
//       ...prev,
//       categories: prev.categories.includes(category)
//         ? prev.categories.filter(c => c !== category)
//         : [...prev.categories, category]
//     }));
//   };

//   const applyFilters = () => {
//     setFilterOptions(tempFilters);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Filter Events</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-2">
//           <div className="grid grid-cols-6 items-start gap-4">
//             <Label htmlFor="categories" className="text-right col-span-1">
//               Categories
//             </Label>
//             <div className="col-span-5 grid grid-cols-3 gap-2">
//               {Object.values(EventCategory).map(category => (
//                 <div key={category} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={category}
//                     checked={tempFilters.categories.includes(category)}
//                     onCheckedChange={() => handleCategoryChange(category)}
//                   />
//                   <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{category}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="dateRange" className="text-right">
//               Date Range
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, dateRange: value }))}
//               defaultValue={tempFilters.dateRange}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select date range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Dates</SelectItem>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="thisWeek">This Week</SelectItem>
//                 <SelectItem value="thisMonth">This Month</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="priceRange" className="text-right">
//               Price Range
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, priceRange: value }))}
//               defaultValue={tempFilters.priceRange}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select price range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Prices</SelectItem>
//                 <SelectItem value="free">Free</SelectItem>
//                 <SelectItem value="paid">Paid</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="eventType" className="text-right">
//               Event Type
//             </Label>
//             <Select
//               onValueChange={(value) => setTempFilters(prev => ({ ...prev, eventType: value }))}
//               defaultValue={tempFilters.eventType}
//             >
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select event type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="ONLINE">Online</SelectItem>
//                 <SelectItem value="IN_PERSON">In Person</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button onClick={applyFilters}>Apply Filters</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const EventGrid: React.FC<{ events: Event[] }> = ({ events }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//     {events.map(event => (
//       <Card key={event.id} className="overflow-hidden transition-transform transform hover:scale-105">
//         <CardHeader className="p-0">
//           <Image src={event.imagePath} alt={event.title} width={500} height={300} className="w-full h-48 object-cover" />
//         </CardHeader>
//         <CardContent className="p-4">
//           <CardTitle className="text-xl font-semibold mb-2">{event.title}</CardTitle>
//           <div className="flex items-center text-gray-600 mb-2">
//             <Calendar className="w-4 h-4 mr-2" />
//             <span>{event.dateStart}</span>
//           </div>
//           <div className="flex items-center text-gray-600 mb-2">
//             <MapPin className="w-4 h-4 mr-2" />
//             <span>{event.eventType === 'ONLINE' ? 'Online' : event.location}</span>
//           </div>
//           <div className="flex items-center text-gray-600 mb-2">
//             <Users className="w-4 h-4 mr-2" />
//             <span>{event.totalSeats} seats</span>
//           </div>
//           {!event.isFree && (
//             <div className="text-gray-800 font-semibold mt-2">
//               <p>Standard: K{event.regularPrice}</p>
//               <p>VIP: K{event.vipPrice}</p>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Link href={`/events/${event.id}`} passHref>
//             <Button className="w-full">View Details</Button>
//           </Link>
//         </CardFooter>
//       </Card>
//     ))}
//   </div>
// );

// export default EventSection;

// EventDetails.tsx
// EventSection.tsx
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, MapPin, Users, Filter } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

enum EventCategory {
  WEDDING = 'Wedding',
  FUNERAL = 'Funeral',
  BUSINESS = 'Business',
  MUSIC = 'Music',
  LIFESTYLE_EVENTS = 'Lifestyle',
  EDUCATIONAL_EVENTS = 'Educational',
  HOLIDAY_CELEBRATIONS = 'Holiday',
  FASHION_SHOWS = 'Fashion',
  HEALTH_AND_WELLNESS = 'Health & Wellness',
  CULTURAL_FESTIVALS = 'Cultural',
  GAMING_EVENTS = 'Gaming',
  ENVIRONMENTAL_EVENTS = 'Environmental',
  TRADE_FAIR = 'Trade Fair',
  AGRICULTURAL_AND_COMMERCIAL_SHOW = 'Agricultural & Commercial',
  WEB_DEVELOPMENT = 'Web Development',
  MARKETING = 'Marketing',
  TECHNOLOGY = 'Technology',
  CONCERTS_AND_CHURCH = 'Concerts & Church',
  CONFERENCES_AND_WORKSHOPS = 'Conferences & Workshops',
  SPORTS_AND_FITNESS = 'Sports & Fitness',
  ARTS_AND_THEATER = 'Arts & Theater',
  FAMILY_AND_KIDS = 'Family & Kids',
  FOOD_AND_DRINK = 'Food & Drink',
  CHARITY_AND_FUNDRAISERS = 'Charity & Fundraisers',
  COMEDY_SHOWS = 'Comedy',
  NETWORKING_AND_SOCIAL_GATHERINGS = 'Networking & Social',
  FILM_SCREENINGS = 'Film Screenings',
}

interface Event {
  id: number;
  imagePath: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  category: EventCategory;
  totalSeats: number;
  vipSeats: number;
  regularPrice: number;
  vipPrice: number;
  description: string;
  isFree: boolean;
  eventType: string;
}

interface FilterOptions {
  categories: EventCategory[];
  dateRange: string;
  priceRange: string;
  eventType: string;
}

const EventSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    dateRange: 'all',
    priceRange: 'all',
    eventType: 'all',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/organiser/dashboard/events/allevents');
        if (!response.ok) {
          const text = await response.text();
          console.error('Error fetching events:', text);
          throw new Error('Failed to fetch events');
        }
        const data: Event[] = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = events;

      // Apply search filter
      if (searchTerm) {
        result = result.filter(event => 
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply category filter
      if (filterOptions.categories.length > 0) {
        result = result.filter(event => filterOptions.categories.includes(event.category));
      }

      // Apply date range filter
      if (filterOptions.dateRange !== 'all') {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

        result = result.filter(event => {
          const eventDate = new Date(event.dateStart);
          switch (filterOptions.dateRange) {
            case 'today':
              return eventDate.toDateString() === today.toDateString();
            case 'thisWeek':
              return eventDate >= today && eventDate <= nextWeek;
            case 'thisMonth':
              return eventDate >= today && eventDate <= nextMonth;
            default:
              return true;
          }
        });
      }

      // Apply price range filter
      if (filterOptions.priceRange !== 'all') {
        result = result.filter(event => {
          if (filterOptions.priceRange === 'free') return event.isFree;
          if (filterOptions.priceRange === 'paid') return !event.isFree;
          return true;
        });
      }

      // Apply event type filter
      if (filterOptions.eventType !== 'all') {
        result = result.filter(event => event.eventType === filterOptions.eventType);
      }

      setFilteredEvents(result);
    };

    applyFilters();
  }, [events, searchTerm, filterOptions]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Event Dashboard</h1>
        <p className="text-xl text-center text-gray-600 mb-8">Discover and manage exciting events</p>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2"
          />
          <FilterDialog filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
        </div>

        <EventGrid events={filteredEvents} />
      </div>
    </div>
  );
};

const FilterDialog: React.FC<{
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
}> = ({ filterOptions, setFilterOptions }) => {
  const [tempFilters, setTempFilters] = useState(filterOptions);

  const handleCategoryChange = (category: EventCategory) => {
    setTempFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const applyFilters = () => {
    setFilterOptions(tempFilters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-6 items-start gap-4">
            <Label htmlFor="categories" className="text-right col-span-1">
              Categories
            </Label>
            <div className="col-span-5 grid grid-cols-3 gap-2">
              {Object.values(EventCategory).map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={tempFilters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateRange" className="text-right">
              Date Range
            </Label>
            <Select
              onValueChange={(value) => setTempFilters(prev => ({ ...prev, dateRange: value }))}
              defaultValue={tempFilters.dateRange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priceRange" className="text-right">
              Price Range
            </Label>
            <Select
              onValueChange={(value) => setTempFilters(prev => ({ ...prev, priceRange: value }))}
              defaultValue={tempFilters.priceRange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventType" className="text-right">
              Event Type
            </Label>
            <Select
              onValueChange={(value) => setTempFilters(prev => ({ ...prev, eventType: value }))}
              defaultValue={tempFilters.eventType}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ONLINE">Online</SelectItem>
                <SelectItem value="IN_PERSON">In Person</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EventGrid: React.FC<{ events: Event[] }> = ({ events }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {events.map(event => (
      <Card key={event.id} className="overflow-hidden transition-transform transform hover:scale-105">
        <CardHeader className="p-0">
          <Image src={event.imagePath} alt={event.title} width={500} height={300} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2">{event.title}</CardTitle>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.dateStart}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.eventType === 'ONLINE' ? 'Online' : event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.totalSeats} seats</span>
          </div>
          {!event.isFree && (
            <div className="text-gray-800 font-semibold mt-2">
              <p>Standard: K{event.regularPrice}</p>
              <p>VIP: K{event.vipPrice}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href={`/events/${event.id}`} passHref>
            <Button className="w-full">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    ))}
  </div>
);

export default EventSection;
