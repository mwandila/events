
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { currentUser } from '@/lib/auth';
import fs from "fs/promises";
import crypto from 'crypto';

// Define EventCategory enum
enum EventCategory {
  WEDDING = 'WEDDING',
  FUNERAL = 'FUNERAL',
  BUSINESS = 'BUSINESS',
  MUSIC = 'MUSIC',
  LIFESTYLE_EVENTS = 'LIFESTYLE_EVENTS',
  EDUCATIONAL_EVENTS = 'EDUCATIONAL_EVENTS',
  HOLIDAY_CELEBRATIONS = 'HOLIDAY_CELEBRATIONS',
  FASHION_SHOWS = 'FASHION_SHOWS',
  HEALTH_AND_WELLNESS = 'HEALTH_AND_WELLNESS',
  CULTURAL_FESTIVALS = 'CULTURAL_FESTIVALS',
  GAMING_EVENTS = 'GAMING_EVENTS',
  ENVIRONMENTAL_EVENTS = 'ENVIRONMENTAL_EVENTS',
  TRADE_FAIR = 'TRADE_FAIR',
  AGRICULTURAL_AND_COMMECIAL_SHOW = 'AGRICULTURAL_AND_COMMECIAL_SHOW',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
  MARKETING = 'MARKETING',
  TECHNOLOGY = 'TECHNOLOGY',
  CONCERTS_AND_CHURCH = 'CONCERTS_AND_CHURCH',
  CONFERENCES_AND_WORKSHOPS = 'CONFERENCES_AND_WORKSHOPS',
  SPORTS_AND_FITNESS = 'SPORTS_AND_FITNESS',
  ARTS_AND_THEATER = 'ARTS_AND_THEATER',
  FAMILY_AND_KIDS = 'FAMILY_AND_KIDS',
  FOOD_AND_DRINK = 'FOOD_AND_DRINK',
  CHARITY_AND_FUNDRAISERS = 'CHARITY_AND_FUNDRAISERS',
  COMEDY_SHOWS = 'COMEDY_SHOWS',
  NETWORKING_AND_SOCIAL_GATHERINGS = 'NETWORKING_AND_SOCIAL_GATHERINGS',
  FILM_SCREENINGS = 'FILM_SCREENINGS'
}

// Define EventType enum
enum EventType {
  PHYSICAL = 'PHYSICAL',
  ONLINE = 'ONLINE'
}

// Custom type for our event data
type EventData = {
  image: File;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location?: string;
  category: EventCategory;
  timeStart: string;
  timeEnd: string;
  totalSeats: number;
  vipSeats: number;
  regularPrice?: number;
  vipPrice?: number;
  isFree?: boolean;
  eventType: EventType;
};

// Custom error type
type ValidationError = {
  [key: string]: string[];
};

// Validation function
function validateEventData(data: any): { isValid: boolean; errors: ValidationError } {
  const errors: ValidationError = {};

  // Validate image
  if (!(data.image instanceof File)) {
    errors.image = ['Image is required'];
  } else if (!data.image.type.startsWith("image/")) {
    errors.image = ['File must be an image'];
  }

  // Validate other fields
  if (!data.title) errors.title = ['Title is required'];
  if (!data.description) errors.description = ['Description is required'];
  if (!data.dateStart) errors.dateStart = ['Date start is required'];
  if (!data.dateEnd) errors.dateEnd = ['Date end is required'];
  if (!data.timeStart) errors.timeStart = ['Time start is required'];
  if (!data.timeEnd) errors.timeEnd = ['Time end is required'];

  if (isNaN(data.totalSeats) || data.totalSeats < 1) {
    errors.totalSeats = ['Total seats must be at least 1'];
  }

  if (isNaN(data.vipSeats) || data.vipSeats < 0) {
    errors.vipSeats = ['VIP seats cannot be negative'];
  }

  if (data.regularPrice !== undefined) {
    const regularPrice = Number(data.regularPrice);
    if (isNaN(regularPrice) || regularPrice < 0) {
      errors.regularPrice = ['Regular price cannot be negative'];
    }
  }

  if (data.vipPrice !== undefined) {
    const vipPrice = Number(data.vipPrice);
    if (isNaN(vipPrice) || vipPrice < 0) {
      errors.vipPrice = ['VIP price cannot be negative'];
    }
  }

  if (!Object.values(EventCategory).includes(data.category as EventCategory)) {
    errors.category = ['Invalid category'];
  }

  if (!Object.values(EventType).includes(data.eventType as EventType)) {
    errors.eventType = ['Invalid event type'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as unknown as EventData;

    // Convert totalSeats to a number
    data.totalSeats = Number(data.totalSeats);
    data.vipSeats = Number(data.vipSeats);
    data.regularPrice = data.regularPrice ? Number(data.regularPrice) : 0;
    data.vipPrice = data.vipPrice ? Number(data.vipPrice) : 0;

    const { isValid, errors } = validateEventData(data);
    if (!isValid) {
      return NextResponse.json(errors, { status: 400 });
    }

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
      data.isFree = true;
    } else {
      data.isFree = false;
    }

    if (data.eventType === EventType.ONLINE) {
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
        regularPrice: data.regularPrice,
        vipPrice: data.vipPrice,
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
