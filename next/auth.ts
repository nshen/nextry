// Auth.js config file
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {
  type SiweMessage,
  parseSiweMessage,
  validateSiweMessage,
} from 'viem/siwe';

import { verifyMessage } from 'viem'
import { getSession } from "./lib/session";


const web3Provider = CredentialsProvider({
  name: 'Ethereum',
  credentials: {
    message: {
      label: 'Message',
      placeholder: '0x0',
      type: 'text',
    },
    signature: {
      label: 'Signature',
      placeholder: '0x0',
      type: 'text',
    }
  },
  // You can use the authorize function to handle the authentication logic. 
  async authorize(credentials: any) {
    try {
      const siweMessage = parseSiweMessage(
        credentials?.message,
      ) as SiweMessage;

      if (
        !validateSiweMessage({
          address: siweMessage?.address,
          message: siweMessage,
        })
      ) {
        return null;
      }
      const nextAuthUrl = process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
      if (!nextAuthUrl) {
        return null;
      }
      const nextAuthHost = new URL(nextAuthUrl).host;
      if (siweMessage.domain !== nextAuthHost) {
        return null;
      }
      const session = await getSession<{ nonce: string }>();
      if (session.nonce !== siweMessage.nonce) {
        return null
      }
      const valid = await verifyMessage({
        address: siweMessage?.address,
        message: credentials?.message,
        signature: credentials?.signature,
      });
      if (!valid) {
        return null;
      }
      session.destroy();
      return {
        id: siweMessage.address,
      };
    } catch (e) {
      return null;
    }
  },

})

const config = {
  debug: process.env.NODE_ENV === 'development',
  providers: [web3Provider],
  callbacks: {
    jwt({ token, user, trigger, session }: any) {
      if (user) { // User is available during sign-in
        // id is eth address
        token.id = user.id
      }
      return token
    },

    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },

    // The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      // 1. Check  if route is protected
      const protectedRoutes = ['/middlewareProtected'];
      const isProtectedRoute = protectedRoutes.includes(pathname);
      if (isProtectedRoute) {
        // 2. Check for valid session
        return !!auth;
      }
      return true;
    },
  },

} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
