
// import { db } from "@/lib/prisma";
// import { NextResponse,NextRequest } from "next/server";

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     // Fetch the event from the database
//     const event = await db.event.findUnique({
//       where: { id: parseInt(id) },
//       include: { engagements: true },
//     });

//     if (!event) {
//       return NextResponse.json({ message: 'Event not found' }, { status: 404 });
//     }

//     // Update the engagement data
//     const engagement = await db.engagement.upsert({
//       where: { id: event.engagements[0]?.id || '' }, // Use the existing engagement ID, or an empty string if there's no engagement
//       update: {
//         views: { increment: 1 },
//       },
//       create: {
//         eventId: event.id,
//         views: 1,
//       },
//     });

//     return NextResponse.json(event, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     // Fetch the event from the database
//     const event = await db.event.findUnique({
//       where: { id: parseInt(id) },
//       include: { engagements: true },
//     });

//     if (!event) {
//       return NextResponse.json({ message: 'Event not found' }, { status: 404 });
//     }

//     // Update the engagement data
//     const engagement = await db.engagement.upsert({
//       where: { id: event.engagements[0]?.id || '' }, // Use the existing engagement ID, or an empty string if there's no engagement
//       update: {
//         clicks: { increment: 1 },
//       },
//       create: {
//         eventId: event.id,
//         clicks: 1,
//       },
//     });

//     return NextResponse.json(event, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
//   }
//}
import { db } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch the event from the database
    const event = await db.event.findUnique({
      where: { id: parseInt(id) },
      include: { engagements: true },
    });

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Update the engagement data
    const engagement = await db.engagement.upsert({
      where: { id: event.engagements[0]?.id || '' }, // Use the existing engagement ID, or an empty string if there's no engagement
      update: {
        views: { increment: 1 },
      },
      create: {
        eventId: event.id,
        views: 1,
        clicks: 0,
        likes: 0,
        shares: 0,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { action } = await request.json();

  try {
    // Fetch the event from the database
    const event = await db.event.findUnique({
      where: { id: parseInt(id) },
      include: { engagements: true },
    });

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Update the engagement data
    const engagement = await db.engagement.upsert({
      where: { id: event.engagements[0]?.id || '' }, // Use the existing engagement ID, or an empty string if there's no engagement
      update: {
        [action]: { increment: 1 },
      },
      create: {
        eventId: event.id,
        views: 0,
        clicks: action === 'clicks' ? 1 : 0,
        likes: action === 'likes' ? 1 : 0,
        shares: action === 'shares' ? 1 : 0,
      },
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching event' }, { status: 500 });
  }
}

