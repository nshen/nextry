'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { SessionProvider } from "next-auth/react";
import { RainbowProvider } from '@/components/providers/RainbowProvider'

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  // const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <RainbowProvider>
            {props.children}
          </RainbowProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  )
}
