
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { currentUser } from '@/lib/auth';
import fs from "fs/promises";
import { eventSchema, updateEventSchema } from "../eventschema/route"




export async function DELETE(request: Request) {
    try {
      const { id } = await request.json();
  
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
  
      await db.event.delete({
        where: { id },
      });
  
      await fs.unlink(`public${event.imagePath}`);
  
      return NextResponse.json({ success: 'Event deleted successfully' }, {
        status: 200,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      return NextResponse.json({ error: 'Error deleting event' }, {
        status: 500,
      });
    }
  }
  
  