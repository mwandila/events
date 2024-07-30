import { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      role: 'ADMIN' | 'USER'| 'ORGANIZER' | 'VENDOR'
      isTwoFactorEnabled: boolean
      isOAuth: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: 'ADMIN' | 'USER' | 'ORGANIZER' | 'VENDOR'
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}