import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { currentUser } from '@/lib/auth';
import fs from "fs/promises";
import { eventSchema, updateEventSchema } from "../eventschema/route"


export async function PUT(request: Request) {
    try {
      const formData = await request.formData();
      const result = updateEventSchema.safeParse(Object.fromEntries(formData.entries()));
      if (!result.success) {
        return NextResponse.json(result.error.formErrors.fieldErrors, {
          status: 400,
        });
      }
  
      const data = result.data;
  
      const user = await currentUser();
      if (!user?.id) {
        return NextResponse.json({ error: 'User not found' }, {
          status: 404,
        });
      }
  
      const event = await db.event.findUnique({
        where: { id: data.id },
      });
  
      if (!event || event.userId !== user.id) {
        return NextResponse.json({ error: 'Event not found or unauthorized' }, {
          status: 404,
        });
      }
  
      let imagePath = event.imagePath;
      if (data.image) {
        await fs.unlink(`public${event.imagePath}`);
        imagePath = `/events/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(
          `public${imagePath}`,
          Buffer.from(await data.image.arrayBuffer())
        );
      }
  
      const updatedEvent = await db.event.update({
        where: { id: data.id },
        data: {
          ...data,
          imagePath,
        },
      });
  
      return NextResponse.json({ updatedEvent, success: 'Event updated successfully' }, {
        status: 200,
      });
    } catch (error) {
      console.error('Error updating event:', error);
      return NextResponse.json({ error: 'Error updating event' }, {
        status: 500,
      });
    }
  }