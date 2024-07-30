
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { category, status, page = '1', limit = '25' } = Object.fromEntries(url.searchParams);
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const events = await db.event.findMany({
      where,
      orderBy: [
        { status: 'asc' },
        { dateStart: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: Number(limit),
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    const totalEvents = await db.event.count({ where });

    return NextResponse.json({
      events,
      totalPages: Math.ceil(totalEvents / Number(limit)),
      currentPage: Number(page)
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
  }


}




  
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Check if the event exists
    const event = await db.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Delete the event
    await db.event.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Error deleting event', error }, { status: 500 });
  }}