import { generateSiweNonce } from 'viem/siwe'
import { getSession } from '@/lib/session';

export async function POST() {
  const nonce = generateSiweNonce();
  const session = await getSession<{ nonce: string }>()
  session.nonce = nonce;
  await session.save()
  return Response.json({ nonce });
}
