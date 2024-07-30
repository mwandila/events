
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { currentUser } from '@/lib/auth';
import fs from "fs/promises";
import { eventSchema } from "../eventschema/route";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = eventSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
      return NextResponse.json(result.error.formErrors.fieldErrors, { status: 400 });
    }

    let data = result.data;

    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (userRole?.role !== 'ORGANIZER') {
      return NextResponse.json({ error: 'Only organizers can create events' }, { status: 403 });
    }

    if (data.vipSeats > data.totalSeats) {
      return NextResponse.json({ error: 'VIP seats cannot exceed the total seats' }, { status: 400 });
    }

    const [startHour, startMinute] = data.timeStart.split(':').map(Number);
    const [endHour, endMinute] = data.timeEnd.split(':').map(Number);

    if (startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59) {
      return NextResponse.json({ error: 'Invalid start time format' }, { status: 400 });
    }

    if (endHour < 0 || endHour > 23 || endMinute < 0 || endMinute > 59) {
      return NextResponse.json({ error: 'Invalid end time format' }, { status: 400 });
    }

    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
    }

    const dateStartObj = new Date(data.dateStart);
    const dateEndObj = new Date(data.dateEnd);

    if (isNaN(dateStartObj.getTime()) || isNaN(dateEndObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (dateEndObj.getTime() <= dateStartObj.getTime()) {
      return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 });
    }

    if (data.isFree) {
      data.regularPrice = 0;
      data.vipPrice = 0;
      data.isFree = true; // Explicitly set isFree to true
    } else {
      data.isFree = false; // Explicitly set isFree to false if not free
    }

    if (data.eventType === 'ONLINE') {
      data.location = '';
    } else {
      data.location = data.location ?? '';
    }

    await fs.mkdir("public/events", { recursive: true });
    const imagePath = `/events/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );

    const event = await db.event.create({
      data: {
        imagePath,
        title: data.title,
        description: data.description,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        location: data.location,
        category: data.category,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        totalSeats: data.totalSeats,
        vipSeats: data.vipSeats,
        regularPrice: data.regularPrice ?? 0, // Ensure regularPrice is never undefined
        vipPrice: data.vipPrice ?? 0, // Ensure vipPrice is never undefined
        isFree: data.isFree,
        eventType: data.eventType,
        userId: user.id,
      },
    });

    return NextResponse.json({ event, success: 'Event created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Error creating event' }, { status: 500 });
  }
}
