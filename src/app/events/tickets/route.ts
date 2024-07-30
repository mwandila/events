// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(request: Request) {
//   try {
//     const { eventId, userId, type } = await request.json();

//     const event = await db.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       console.error('Event not found');
//       return new Response(JSON.stringify({ error: 'Event not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const price = type === 'REGULAR' ? event.regularPrice : event.vipPrice;

//     const user = await db.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       console.error('User not found');
//       return new Response(JSON.stringify({ error: 'User not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Check if there are enough available seats
//     const totalTickets = await db.ticket.count({ where: { eventId } });
//     if (totalTickets >= event.totalSeats) {
//       return new Response(JSON.stringify({ error: 'No more seats available' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Create the order
//     const order = await db.order.create({
//       data: {
//         price,
//         pricePaid: price,
//         userId: user.id,
//         eventId,
//       },
//     });

//     // Create the ticket
//     const ticket = await db.ticket.create({
//       data: {
//         type,
//         price,
//         orderId: order.id,
//         eventId,
//         userId: user.id,
//       },
//     });

//     // Update the event's available seats
//     await db.event.update({
//       where: { id: eventId },
//       data: { totalSeats: event.totalSeats - 1 },
//     });

//     return new Response(JSON.stringify(ticket), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';

// export async function POST(request: Request) {
//   try {
//     const { eventId, userId, type } = await request.json();

//     const event = await db.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       console.error('Event not found');
//       return new Response(JSON.stringify({ error: 'Event not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const price = type === 'REGULAR' ? event.regularPrice : event.vipPrice;

//     let user = await db.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       // Create a new user record for the guest user
//       user = await db.user.create({
//         data: {
//           id: userId,
//           // Add any other necessary user data
//         },
//       });
//     }

//     // Check if the guest user already has a ticket for the same event
//     const existingTicket = await db.ticket.findFirst({
//       where: {
//         eventId,
//         userId: user.id,
//       },
//     });

//     if (existingTicket) {
//       return new Response(
//         JSON.stringify({ error: 'You already have a ticket for this event' }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     // Check if there are enough available seats
//     const totalTickets = await db.ticket.count({ where: { eventId } });
//     if (totalTickets >= event.totalSeats) {
//       return new Response(JSON.stringify({ error: 'No more seats available' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Create the order
//     const order = await db.order.create({
//       data: {
//         price,
//         pricePaid: price,
//         userId: user.id,
//         eventId,
//       },
//     });

//     // Create the ticket
//     const ticket = await db.ticket.create({
//       data: {
//         type,
//         price,
//         orderId: order.id,
//         eventId,
//         userId: user.id,
//       },
//     });

//     // Update the event's available seats
//     await db.event.update({
//       where: { id: eventId },
//       data: { totalSeats: event.totalSeats - 1 },
//     });

//     return new Response(JSON.stringify(ticket), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }



// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';
// import { sendTicketEmail } from '@/lib/mail';

// export async function POST(request: Request) {
//   try {
//     const { eventId, userId, type, resend = false } = await request.json();

//     const event = await db.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       console.error('Event not found');
//       return new Response(JSON.stringify({ error: 'Event not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const price = type === 'REGULAR' ? event.regularPrice : event.vipPrice;

//     let user = await db.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       // Create a new user record for the guest user
//       user = await db.user.create({
//         data: {
//           id: userId,
//           // Add any other necessary user data
//         },
//       });
//     }

//     // Check if the guest user already has a ticket for the same event
//     const existingTicket = await db.ticket.findFirst({
//       where: {
//         eventId,
//         userId: user.id,
//       },
//     });

//     if (existingTicket) {
//       if (resend) {
//         // Resend the email
//         const userForEmail = { email: user.email ?? undefined };
//         await sendTicketEmail(userForEmail, existingTicket);
//         return new Response(JSON.stringify({ message: 'Email resent' }), {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//         });
//       } else {
//         return new Response(
//           JSON.stringify({ error: 'You already have a ticket for this event' }),
//           {
//             status: 400,
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );
//       }
//     }

//     // Check if there are enough available seats
//     const totalTickets = await db.ticket.count({ where: { eventId } });
//     if (totalTickets >= event.totalSeats) {
//       return new Response(JSON.stringify({ error: 'No more seats available' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Create the order
//     const order = await db.order.create({
//       data: {
//         price,
//         pricePaid: price,
//         userId: user.id,
//         eventId,
//       },
//     });

//     // Create the ticket
//     const ticket = await db.ticket.create({
//       data: {
//         type,
//         price,
//         orderId: order.id,
//         eventId,
//         userId: user.id,
//       },
//     });

//     // Update the event's available seats
//     await db.event.update({
//       where: { id: eventId },
//       data: { totalSeats: event.totalSeats - 1 },
//     });

//     // Send email to the user
//     const userForEmail = { email: user.email ?? undefined };
//     await sendTicketEmail(userForEmail, ticket);

//     return new Response(JSON.stringify(ticket), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }



// @/pages/api/buy-ticket.ts
// import { NextResponse } from 'next/server';
// import { db } from '@/lib/prisma';
// import { sendTicketEmail } from '@/lib/mail';

// export async function POST(request: Request) {
//   try {
//     const { eventId, userId, type, quantity, email } = await request.json();

//     const event = await db.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       console.error('Event not found');
//       return new Response(JSON.stringify({ error: 'Event not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const price = type === 'REGULAR' ? event.regularPrice : event.vipPrice;

//     let user = await db.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       // Create a new user record for the guest user
//       user = await db.user.create({
//         data: {
//           id: userId,
//           email: email || null, // Set the email to null if it's not provided
//           // Add any other necessary user data
//         },
//       });
//     }

//     // Check if the user already has a ticket for the same event
//     const existingTicket = await db.ticket.findFirst({
//       where: {
//         eventId,
//         userId: user.id,
//       },
//     });

//     if (existingTicket) {
//       return new Response(
//         JSON.stringify({ error: 'You already have a ticket for this event' }),
//         {
//           status: 400,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     // Check if there are enough available seats
//     const totalTickets = await db.ticket.count({ where: { eventId } });
//     if (totalTickets + quantity > event.totalSeats) {
//       return new Response(JSON.stringify({ error: 'Not enough seats available' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Create the order
//     const order = await db.order.create({
//       data: {
//         price: price * quantity,
//         pricePaid: price * quantity,
//         userId: user.id,
//         eventId,
//       },
//     });

//     // Create the tickets
//     const tickets = await Promise.all(
//       Array.from({ length: quantity }).map(async () => {
//         return db.ticket.create({
//           data: {
//             type,
//             price,
//             orderId: order.id,
//             eventId,
//             userId: user.id,
//           },
//         });
//       })
//     );

//     // Update the event's available seats
//     await db.event.update({
//       where: { id: eventId },
//       data: { totalSeats: event.totalSeats - quantity },
//     });

//     // Send email to the user
//     if (user.email) {
//       await sendTicketEmail({ email: user.email }, tickets[0]);
//     } else {
//       console.error('User email not found, unable to send ticket email');
//     }

//     return new Response(JSON.stringify(tickets), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { sendTicketEmail } from '@/lib/mail';

// Define a regular expression to validate email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { eventId, userId, type, quantity, email } = await request.json();

    // Validate the email address
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const event = await db.event.findUnique({ where: { id: eventId } });
    if (!event) {
      console.error('Event not found');
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const price = type === 'REGULAR' ? event.regularPrice : event.vipPrice;

    let user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      // Create a new user record for the guest user
      user = await db.user.create({
        data: {
          id: userId,
          email: email || null, // Set the email to null if it's not provided
          // Add any other necessary user data
        },
      });
    }

    // Check if the user already has a ticket for the same event
    const existingTicket = await db.ticket.findFirst({
      where: {
        eventId,
        userId: user.id,
      },
    });

    if (existingTicket) {
      return new Response(
        JSON.stringify({ error: 'You already have a ticket for this event' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if there are enough available seats
    const totalTickets = await db.ticket.count({ where: { eventId } });
    if (totalTickets + quantity > event.totalSeats) {
      return new Response(JSON.stringify({ error: 'Not enough seats available' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create the order
    const order = await db.order.create({
      data: {
        price: price * quantity,
        pricePaid: price * quantity,
        userId: user.id,
        eventId,
      },
    });

    // Create the tickets
    const tickets = await Promise.all(
      Array.from({ length: quantity }).map(async () => {
        return db.ticket.create({
          data: {
            type,
            price,
            orderId: order.id,
            eventId,
            userId: user.id,
          },
        });
      })
    );

    // Update the event's available seats
    await db.event.update({
      where: { id: eventId },
      data: { totalSeats: event.totalSeats - quantity },
    });

    // Send email to the user
    if (user.email) {
      await sendTicketEmail({ email: user.email }, tickets[0]);
    } else {
      console.error('User email not found, unable to send ticket email');
    }

    return new Response(JSON.stringify(tickets), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers:{ 'Content-Type': 'application/json' },
    });
  }

  }
