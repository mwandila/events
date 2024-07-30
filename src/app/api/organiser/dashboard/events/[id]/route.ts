import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';



export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const event = await db.event.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
