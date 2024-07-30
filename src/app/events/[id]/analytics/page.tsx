"use client"

import { useRouter } from 'next/router';
import AnalyticsDashboard from '@/components/ui/analytics/analytics';
import NFCReader from '@/components/ui/NFC/NFCReader';
import SponsorList from '@/components/ui/sponsors/sponsors';

export default function EventAnalyticsPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleNfcRead = async (data: string) => {
    try {
      const response = await fetch(`/api/events/${id}/engage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nfcData: data }),
      });
      if (!response.ok) {
        throw new Error('Failed to process NFC data');
      }
      // Optionally, you can refresh the analytics data here
    } catch (error) {
      console.error('Error processing NFC data:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <h1>Event Analytics and Management</h1>
      <AnalyticsDashboard eventId={id as string} />
      <h2>NFC Check-in</h2>
      <NFCReader onNfcRead={handleNfcRead} />
      <SponsorList eventId={id as string} />
    </div>
  );
}
