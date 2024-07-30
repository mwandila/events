 "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Image from 'next/image';
// import { Calendar, Clock, MapPin, User, FileText } from 'lucide-react';
// import { Event, User as UserType } from '@prisma/client';
// import Header from '@/components/ui/Header/Header';
// import Footer from '@/components/ui/Footer/Footer';
// import BuyTicketForm from '@/components/ui/BuyTicket/buuticket';
// import AppLayout from '@/components/ui/layout';

// interface EventWithUser extends Event {
//   user: UserType;
// }

// const EventDetails: React.FC = () => {
//   const router = useRouter();
//   const { id } = useParams();

//   const [event, setEvent] = useState<EventWithUser | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/organiser/dashboard/events/${id}`);
//         if (!res.ok) throw new Error('Failed to fetch event data');
//         const data: EventWithUser = await res.json();
//         setEvent(data);
//       } catch (error) {
//         console.error('Error fetching event:', error);
//         setError('Failed to load event details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchEvent();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="container mx-auto p-4 space-y-4">
//         <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg"></div>
//         <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded"></div>
//         <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
//         <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
//         <p className="text-red-500 text-center">{error}</p>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
//         <p className="text-center">Event not found</p>
//       </div>
//     );
//   }

//   return (
//     <AppLayout>
//     <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-auto">
     
//       <main className="flex-grow overflow-y-auto">
//         <div className="container mx-auto px-2 py-2">
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="relative h-64 sm:h-80 md:h-96">
//               {event.imagePath ? (
//                 <Image
//                   src={event.imagePath}
//                   alt={event.title}
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                   <FileText size={64} className="text-gray-400" />
//                 </div>
//               )}
//             </div>
//             <div className="p-6">
//               <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
//               <div className="flex flex-wrap gap-4 mb-6">
//                 <div className="flex items-center">
//                   <MapPin className="mr-2 text-blue-500" />
//                   <span>{event.location}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="mr-2 text-green-500" />
//                   <span>{new Date(event.dateStart).toLocaleDateString()} - {new Date(event.dateEnd).toLocaleDateString()}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="mr-2 text-purple-500" />
//                   <span>{event.timeStart} - {event.timeEnd}</span>
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold mb-2">Description</h3>
//                 <p className="text-gray-700">{event.description}</p>
//               </div>
              
//               {event.user && (
//                 <div className="flex items-center mb-6 bg-gray-100 p-3 rounded">
//                   <User className="mr-2 text-gray-500" />
//                   <span className="text-sm text-gray-700">Organized by: <strong>{event.user.name}</strong></span>
//                 </div>
//               )}

//               <div className="mb-6">
//                 <BuyTicketForm eventId={event.id} />
//               </div>
              
//               <button
//                 onClick={() => router.back()}
//                 className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
     
//     </div>
//     </AppLayout>
//   );
// };

// export default EventDetails;


//dont delete
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, User, FileText } from 'lucide-react';
import { Event, User as UserType } from '@prisma/client';
import AppLayout from '@/components/ui/layout';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import BuyTicketForm from '@/components/ui/BuyTicket/buuticket';

interface EventWithUser extends Event {
  user: UserType;
}

const EventDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [event, setEvent] = useState<EventWithUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/organiser/dashboard/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event data');
        const data: EventWithUser = await res.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <div className="h-64 w-full bg-white-200 animate-pulse rounded-lg"></div>
        <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-32 w-full bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded-lg">
        <p className="text-center">Event not found</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 overflow-y-auto">
        <main className="flex-grow overflow-y-auto relative">
          <Button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-10 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Go Back
          </Button>
          
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="relative h-64 sm:h-80 md:h-96">
                {event.imagePath ? (
                  <Image
                    src={event.imagePath}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FileText size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-blue-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-green-500" />
                    <span>{new Date(event.dateStart).toLocaleDateString()} - {new Date(event.dateEnd).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-purple-500" />
                    <span>{event.timeStart} - {event.timeEnd}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
                
                {event.user && (
                  <div className="flex items-center mb-6 bg-gray-100 p-3 rounded">
                    <User className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-700">Organized by: <strong>{event.user.name}</strong></span>
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-[20vh] bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                      Buy Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <BuyTicketForm eventId={event.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
};

export default EventDetails;
