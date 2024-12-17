'use server'

import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';

const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET || 'default_session_password',
  cookieName: "nextry_iron_cookie",
  ttl: 60 * 60 * 24,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession<T extends Object>() {
  const store = await cookies();
  const session = await getIronSession<T>(store, sessionOptions);
  return session;
}

export async function readNonce(){
    const session = await getSession<{ nonce: string }>();
    return session.nonce;
}
