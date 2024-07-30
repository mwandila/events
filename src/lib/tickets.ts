import { db } from "./prisma"

// File: lib/events.ts
db

export async function getEvents() {
  return db.event.findMany({
    where: { status: 'Published' },
  })
}

export async function getEvent(id: number) {
  return db.event.findUnique({
    where: { id },
  })
}