
// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/prisma';

// // export async function GET(request: Request) {
// //   const url = new URL(request.url);
// //   const { category, status, page = '1', limit = '25' } = Object.fromEntries(url.searchParams);
// //   const skip = (Number(page) - 1) * Number(limit);

// //   try {
// //     const where: any = {};
// //     if (category) where.category = category;
// //     if (status) where.status = status;

// //     const events = await db.event.findMany({
// //       where,
// //       orderBy: [
// //         { status: 'asc' },
// //         { dateStart: 'desc' },
// //         { createdAt: 'desc' }
// //       ],
// //       skip,
// //       take: Number(limit),
// //       include: {
// //         user: {
// //           select: { name: true }
// //         }
// //       }
// //     });

// //     const totalEvents = await db.event.count({ where });

// //     return NextResponse.json({
// //       events,
// //       totalPages: Math.ceil(totalEvents / Number(limit)),
// //       currentPage: Number(page)
// //     }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error fetching events:', error);
// //     return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
// //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { db } from '@/lib/prisma';

// // export async function GET(request: Request) {
// //   const url = new URL(request.url);
// //   const { 
// //     category, 
// //     status, 
// //     page = '1', 
// //     limit = '25',
// //     lat,
// //     lng,
// //     radius = '10' // Default radius in kilometers
// //   } = Object.fromEntries(url.searchParams);

// //   const skip = (Number(page) - 1) * Number(limit);

// //   try {
// //     const where: any = {};
// //     if (category) where.category = category;
// //     if (status) where.status = status;

// //     // Location-based filtering
// //     if (lat && lng) {
// //       const latitude = parseFloat(lat as string);
// //       const longitude = parseFloat(lng as string);
// //       const radiusKm = parseFloat(radius as string);

// //       where.AND = [
// //         {
// //           latitude: {
// //             gte: latitude - (radiusKm / 111.32),
// //             lte: latitude + (radiusKm / 111.32)
// //           }
// //         },
// //         {
// //           longitude: {
// //             gte: longitude - (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180)))),
// //             lte: longitude + (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180))))
// //           }
// //         }
// //       ];
// //     }

// //     const events = await db.event.findMany({
// //       where,
// //       orderBy: [
// //         { status: 'asc' },
// //         { dateStart: 'desc' },
// //         { createdAt: 'desc' }
// //       ],
// //       skip,
// //       take: Number(limit),
// //       include: {
// //         user: {
// //           select: { name: true }
// //         },
// //         engagement: {
// //           select: {
// //             clicks:true,
// //             views: true,
// //             shares: true,
// //             likes: true
// //           }
// //         }
// //       }
// //     });

// //     const totalEvents = await db.event.count({ where });

// //     return NextResponse.json({
// //       events: events.map(event => ({
// //         ...event,
// //         engagement: event.engagement || {cliks:0, views: 0, shares: 0, likes: 0 }
// //       })),
// //       totalPages: Math.ceil(totalEvents / Number(limit)),
// //       currentPage: Number(page)
// //     }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error fetching events:', error);
// //     return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
// //   }
// // }

// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const { 
//     category, 
//     status, 
//     page = '1', 
//     limit = '25',
//     lat,
//     lng,
//     radius = '10' // Default radius in kilometers
//   } = Object.fromEntries(url.searchParams);

//   const skip = (Number(page) - 1) * Number(limit);

//   try {
//     const where: any = {};
//     if (category) where.category = category;
//     if (status) where.status = status;

//     // Location-based filtering
//     if (lat && lng) {
//       const latitude = parseFloat(lat as string);
//       const longitude = parseFloat(lng as string);
//       const radiusKm = parseFloat(radius as string);

//       where.AND = [
//         {
//           latitude: {
//             gte: latitude - (radiusKm / 111.32),
//             lte: latitude + (radiusKm / 111.32)
//           }
//         },
//         {
//           longitude: {
//             gte: longitude - (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180)))),
//             lte: longitude + (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180))))
//           }
//         }
//       ];
//     }

//     const events = await db.event.findMany({
//       where,
//       orderBy: [
//         { status: 'asc' },
//         { dateStart: 'desc' },
//         { createdAt: 'desc' }
//       ],
//       skip,
//       take: Number(limit),
//       include: {
//         user: {
//           select: { name: true }
//         },
//         engagements: {
//           select: {
//             clicks:true,
//             views: true,
//             shares: true,
//             likes: true
//           }
//         }
//       }
//     });

//     const totalEvents = await db.event.count({ where });

//     return NextResponse.json({
//       events: events.map(event => ({
//         ...event,
//         engagements: event.engagements || {clicks:0, views: 0, shares: 0, likes: 0 }
//       })),
//       totalPages: Math.ceil(totalEvents / Number(limit)),
//       currentPage: Number(page)
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const { 
//     category, 
//     status, 
//     page = '1', 
//     limit = '25',
//     lat,
//     lng,
//     radius = '10', // Default radius in kilometers
//     search
//   } = Object.fromEntries(url.searchParams);

//   const skip = (Number(page) - 1) * Number(limit);

//   try {
//     const where: any = {};
//     if (category) where.category = category;
//     if (status) where.status = status;

//     // Location-based filtering
//     if (lat && lng) {
//       const latitude = parseFloat(lat as string);
//       const longitude = parseFloat(lng as string);
//       const radiusKm = parseFloat(radius as string);

//       where.AND = [
//         {
//           latitude: {
//             gte: latitude - (radiusKm / 111.32),
//             lte: latitude + (radiusKm / 111.32)
//           }
//         },
//         {
//           longitude: {
//             gte: longitude - (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180)))),
//             lte: longitude + (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180))))
//           }
//         }
//       ];
//     }

//     // Search functionality
//     if (search) {
//       where.OR = [
//         { title: { contains: search, mode: 'insensitive' } },
//         { description: { contains: search, mode: 'insensitive' } },
//         { location: { contains: search, mode: 'insensitive' } }
//       ];
//     }

//     const events = await db.event.findMany({
//       where,
//       orderBy: [
//         { status: 'asc' },
//         { dateStart: 'desc' },
//         { createdAt: 'desc' }
//       ],
//       skip,
//       take: Number(limit),
//       include: {
//         user: {
//           select: { name: true }
//         },
//         engagements: {
//           select: {
//             clicks: true,
//             views: true,
//             shares: true,
//             likes: true
//           }
//         }
//       }
//     });

//     const totalEvents = await db.event.count({ where });

//     return NextResponse.json({
//       events: events.map(event => ({
//         ...event,
//         engagements: event.engagements || { clicks: 0, views: 0, shares: 0, likes: 0 }
//       })),
//       totalPages: Math.ceil(totalEvents / Number(limit)),
//       currentPage: Number(page),
//       totalEvents
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
//   }
// }

// /api/events
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { 
    category, 
    status, 
    page = '1', 
    limit = '25',
    lat,
    lng,
    radius = '10', // Default radius in kilometers
    search
  } = Object.fromEntries(url.searchParams);

  const skip = (Number(page) - 1) * Number(limit);

  try {
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    // Location-based filtering
    if (lat && lng) {
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const radiusKm = parseFloat(radius as string);

      where.AND = [
        {
          latitude: {
            gte: latitude - (radiusKm / 111.32),
            lte: latitude + (radiusKm / 111.32)
          }
        },
        {
          longitude: {
            gte: longitude - (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180)))),
            lte: longitude + (radiusKm / (111.32 * Math.cos(latitude * (Math.PI / 180))))
          }
        }
      ];
    }

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

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
        },
        engagements: true // Include the engagements table
      }
    });

    const totalEvents = await db.event.count({ where });

    return NextResponse.json({
      events: events.map(event => ({
        ...event,
        engagements: event.engagements || { clicks: 0, views: 0, shares: 0, likes: 0 }
      })),
      totalPages: Math.ceil(totalEvents / Number(limit)),
      currentPage: Number(page),
      totalEvents
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
  }
}
