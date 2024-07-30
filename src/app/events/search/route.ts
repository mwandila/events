// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { PrismaClient, EventCategory, EventType } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const { location, category, eventType, title } = await request.json();

    const events = await db.event.findMany({
      where: {
        location: location ? { contains: location } : undefined,
        category: category ? (category as EventCategory) : undefined,
        eventType: eventType ? (eventType as EventType) : undefined,
        title: title ? { contains: title } : undefined,
      },
    });

    console.log(`Found ${events.length} events`);

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error in /api/search:', error);
    return NextResponse.json({ error: 'An error occurred while searching for events' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
