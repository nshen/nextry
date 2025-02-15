'use client'

import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { mainnet, sepolia, foundry } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

/* export function getConfig() {
    return createConfig({
        chains: [mainnet, sepolia],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [mainnet.id]: http(),
            [sepolia.id]: http(),
        },
    })
} */

export const config = getDefaultConfig({
  appName: 'nextry',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [foundry, mainnet, sepolia],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [foundry.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

