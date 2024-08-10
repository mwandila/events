// import NextAuth, { type DefaultSession } from "next-auth"
// import { PrismaAdapter } from '@auth/prisma-adapter'

// import { db } from "./lib/prisma"
// import authConfig from "./auth.config"
// import { getUserById } from "./data/user"
// import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
// import { getAccountByUserId } from "./data/account"

// export const { auth, handlers, signIn, signOut } = NextAuth({
//   pages: {
//     signIn: '/auth/login',
//     error: '/auth/error',
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() }
//       })
//     }
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification, can be account?.type too
//       if (account?.provider !== 'credentials') return true

//       if (!user.id) {
//         return false
//       }
      
//       const existingUser = await getUserById(user.id)

//       // Prevent sign in without email verification
//       if (!existingUser || !existingUser.emailVerified) {
//         return false
//       }

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = 
//           await getTwoFactorConfirmationByUserId(existingUser.id)

//           // If not have a confirmation, block login
//           if (!twoFactorConfirmation) return false

//           // Delete two factor confirmation for next sign in
//           await db.twoFactorConfirmation.delete({
//             where: { userId: existingUser.id }
//           })
//       }

//       return true
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role
//       }

//       if (session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
//       }

//       if (session.user) {
//         session.user.name = token.name
//         session.user.email = token.email! 
//         session.user.isOAuth = token.isOAuth
//       }

//       return session
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token
//       const existingUser = await getUserById(token.sub)

//       if (!existingUser) return token

//       const existingAccount = await getAccountByUserId(existingUser.id)

//       token.isOAuth = !!existingAccount
//       token.name = existingUser.name
//       token.email = existingUser.email
//       token.role = existingUser.role
//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

//       return token
//     }
//   },
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   ...authConfig,
// })




// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "./lib/prisma"
// import authConfig from "./auth.config"
// import { getUserById } from "./data/user"
// import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
// import { getAccountByUserId } from "./data/account"
// import { generateAccessToken } from "./token"  
// export const { auth, handlers, signIn, signOut } = NextAuth({
//   pages: {
//     signIn: '/auth/login',
//     error: '/auth/error',
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() }
//       })
//     }
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification, can be account?.type too
//       if (account?.provider !== 'credentials') return true

//       if (!user.id) {
//         return false
//       }
      
//       const existingUser = await getUserById(user.id)

//       // Prevent sign in without email verification
//       if (!existingUser || !existingUser.emailVerified) {
//         return false
//       }

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

//         // If no confirmation, block login
//         if (!twoFactorConfirmation) return false

//         // Delete two factor confirmation for next sign in
//         await db.twoFactorConfirmation.delete({
//           where: { userId: existingUser.id }
//         })
//       }

//       return true
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role
//       }

//       if (session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
//       }

//       if (session.user) {
//         session.user.name = token.name
//         session.user.email = token.email
//         session.user.isOAuth = token.isOAuth
//       }

//       if (token.accessToken) {
//         session.accessToken = token.accessToken
//       }

//       return session
//     },
//     async jwt({ token, account, user }) {
//       if (!token.sub) return token

//       if (user) {
//         // Generate access token when user logs in
//         const accessToken = generateAccessToken(user)
        
//         // Update user with new access token
//         await db.user.update({
//           where: { id: user.id },
//           data: { accessToken }
//         })

//         token.accessToken = accessToken
//       }

//       const existingUser = await getUserById(token.sub)
//       if (!existingUser) return token

//       const existingAccount = await getAccountByUserId(existingUser.id)

//       token.isOAuth = !!existingAccount
//       token.name = existingUser.name
//       token.email = existingUser.email
//       token.role = existingUser.role
//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

//       return token
//     }
//   },
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   ...authConfig,
// })

// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "./lib/prisma"
// import authConfig from "./auth.config"
// import { getUserById } from "./data/user"
// import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
// import { getAccountByUserId } from "./data/account"
// import { generateAccessToken } from "./token"

// export const { auth, handlers, signIn, signOut } = NextAuth({
//   pages: {
//     signIn: '/auth/login',
//     error: '/auth/error',
//   },
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() }
//       })
//     }
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification, can be account?.type too
//       if (account?.provider !== 'credentials') return true

//       if (!user.id) {
//         return false
//       }
      
//       const existingUser = await getUserById(user.id)

//       // Prevent sign in without email verification
//       if (!existingUser || !existingUser.emailVerified) {
//         return false
//       }

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

//         // If no confirmation, block login
//         if (!twoFactorConfirmation) return false

//         // Delete two factor confirmation for next sign in
//         await db.twoFactorConfirmation.delete({
//           where: { userId: existingUser.id }
//         })
//       }

//       return true
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role
//       }

//       if (session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
//       }

//       if (session.user) {
//         session.user.name = token.name ?? ''
//         session.user.email = token.email ?? ''
//         session.user.isOAuth = token.isOAuth ?? false
//       }

//       if (token.accessToken) {
//         const newSession = { ...session, accessToken: token.accessToken }
//         console.log(newSession)
//         return newSession
//       }

//       return session
//     },
//     async jwt({ token, account, user }) {
//       if (!token.sub) return token

//       if (user) {
//         // Generate access token when user logs in
//         const accessToken = generateAccessToken(user)
        
//         // Update user with new access token
//         await db.user.update({
//           where: { id: user.id },
//           data: { accessToken }
//         })

//         token.accessToken = accessToken
//       }

//       const existingUser = await getUserById(token.sub)
//       if (!existingUser) return token

//       const existingAccount = await getAccountByUserId(existingUser.id)

//       token.isOAuth = !!existingAccount
//       token.name = existingUser.name
//       token.email = existingUser.email

//       if (existingUser.role === 'ADMIN' || existingUser.role === 'ORGANIZER' || existingUser.role === 'VENDOR' || existingUser.role === 'USER') {
//         token.role = existingUser.role
//       } else {
//         token.role = 'USER' // default to 'USER' if the role is not recognized
//       }

//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

//       return token
//     }
//   },
//   adapter: PrismaAdapter(db),
//   session: { strategy: 'jwt' },
//   ...authConfig,
// })




import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/prisma"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"
import { generateAccessToken } from "./token"

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification, can be account?.type too
      if (account?.provider !== 'credentials') return true

      if (!user.id) {
        return false
      }
      
      const existingUser = await getUserById(user.id)

      // Prevent sign in without email verification
      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        // If no confirmation, block login
        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { userId: existingUser.id }
        })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }

      if (session.user) {
        session.user.name = token.name ?? ''
        session.user.email = token.email ?? ''
        session.user.isOAuth = token.isOAuth ?? false
      }

      if (token.accessToken) {
        const newSession = { ...session, accessToken: token.accessToken }
        console.log(newSession)
        return newSession
      }

      return session
    },
    async jwt({ token, account, user }) {
      if (!token.sub) return token

      if (user) {
        // Generate access token when user logs in
        const accessToken = generateAccessToken(user)
        
        // Update user with new access token
        await db.user.update({
          where: { id: user.id },
          data: { accessToken }
        })

        token.accessToken = accessToken
      }

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email

      if (existingUser.role === 'ADMIN' || existingUser.role === 'ORGANIZER' || existingUser.role === 'VENDOR' || existingUser.role === 'USER') {
        token.role = existingUser.role
      } else {
        token.role = 'USER' // default to 'USER' if the role is not recognized
      }

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
