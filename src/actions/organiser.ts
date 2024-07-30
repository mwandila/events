'use server'

import { currentRole } from "@/lib/auth"

export async function organizer() {
  const role = await currentRole()

  if (role === 'ORGANIZER') {
    return { success: 'Allowed Server Action!' }
  }

  return { error: 'Forbidden Server Action!' }
}