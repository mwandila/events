

// export default EventCard;
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Calendar, MapPin, Eye, Share2, ThumbsUp, Facebook, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Define the Event type
interface Event {
  id: number;
  title: string;
  imagePath?: string;
  location: string;
  category: string;
  isAvailable: boolean;
  isFree: boolean;
  regularPrice: number | null;
  vipPrice: number | null;
  engagements: Array<{
    views?: number;
    likes?: number;
    shares?: number;
  }>;
}

interface EventCardProps {
  event: Event;
  onViewDetails: (id: number) => void;
}

const useCurrencyConverter = (amount: number | null | undefined, fromCurrency: string, toCurrency: string): number => {
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const safeAmount = amount ?? 0;
        setConvertedAmount(safeAmount * rate);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
        setConvertedAmount(amount ?? 0); // Fallback to original amount or 0 if there's an error
      }
    };
    fetchConversionRate();
  }, [amount, fromCurrency, toCurrency]);

  return convertedAmount;
};

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const [likes, setLikes] = useState(event.engagements[0]?.likes || 0);
  const [shares, setShares] = useState(event.engagements[0]?.shares || 0);
  const [userCountry, setUserCountry] = useState<string>("US"); // Default to US

  const currencyCode = userCountry === "US" ? "USD" : "EUR";

  const regularPrice = useCurrencyConverter(event.regularPrice, "USD", currencyCode);
  const vipPrice = useCurrencyConverter(event.vipPrice, "USD", currencyCode);

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
            <span>Regular: {regularPrice.toFixed(2)} {currencyCode}</span>
            <span>VIP: {vipPrice.toFixed(2)} {currencyCode}</span>
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

export default EventCard;
