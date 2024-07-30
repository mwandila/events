import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  const engagements = await db.engagement.findMany();
  return NextResponse.json(engagements);
}

export async function POST(request: Request) {
  const body = await request.json();
  const engagement = await db.engagement.create({
    data: {
      eventId: body.eventId,
      clicks: body.clicks,
      views: body.views,
      shares: body.shares,
      likes: body.likes,
    },
  });
  return NextResponse.json(engagement, { status: 201 });
}
