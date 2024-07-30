import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { currentUser } from '@/lib/auth';
import fs from "fs/promises";
import { eventSchema, updateEventSchema } from "../eventschema/route"


export async function PATCH(request: Request) {
    try {
      const { id, isAvailable } = await request.json();
  
      const user = await currentUser();
      if (!user?.id) {
        return NextResponse.json({ error: 'User not found' }, {
          status: 404,
        });
      }
  
      const event = await db.event.findUnique({
        where: { id },
      });
  
      if (!event || event.userId !== user.id) {
        return NextResponse.json({ error: 'Event not found or unauthorized' }, {
          status: 404,
        });
      }
  
      const updatedEvent = await db.event.update({
        where: { id },
        data: { isAvailable },
      });
  
      return NextResponse.json({ updatedEvent, success: 'Event availability updated' }, {
        status: 200,
      });
    } catch (error) {
      console.error('Error updating event availability:', error);
      return NextResponse.json({ error: 'Error updating event availability' }, {
        status: 500,
      });
    }
  }
  