import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Retrieve all events from the database
    const events = await db.event.findMany();

    // Log the retrieved data
    console.log('Retrieved events:', events);

    // Return the retrieved data as JSON response
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    // Log any errors
    console.error('Error retrieving events:', error);

    // Return an error response
    return NextResponse.json({ error: 'Error retrieving events' }, { status: 500 });
  }
}
