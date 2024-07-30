
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function BuyTicketForm({ eventId }: { eventId: number }) {
  const [type, setType] = useState<'REGULAR' | 'VIP'>('REGULAR');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/events/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, type, quantity, userId: 'guest-user', email }),
      });

      if (res.ok) {
        router.push('/tickets');
      } else {
        // Handle error
        console.error('Failed to purchase tickets');
      }
    } catch (error) {
      console.error('Error purchasing tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Purchase Tickets</CardTitle>
        <CardDescription>Select your ticket type and quantity</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ticket-type" className="text-sm font-medium text-gray-700">Ticket Type</label>
            <Select onValueChange={(value) => setType(value as 'REGULAR' | 'VIP')} defaultValue={type}>
              <SelectTrigger id="ticket-type">
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REGULAR">Regular</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              placeholder="Quantity"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <Button
            type="submit"
            className={`w-full ${loading ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy Ticket'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}