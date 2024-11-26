import type { Metadata } from "next";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/lib/wagmi'

export const metadata: Metadata = {
    title: "Nextry",
    description: "Next.js Foundry Stack",
};

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const initialState = cookieToInitialState(
        config,
        (await headers()).get('cookie')
    )
    return (
        <html lang="en">
            <body >
                <Providers initialState={initialState}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
