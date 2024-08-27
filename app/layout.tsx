import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/lib/wagmi'

export const metadata: Metadata = {
    title: "Web3 Starter",
    description: "Nextjs + Wagmi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(
        getConfig(),
        headers().get('cookie')
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
