'use client'

import {
    createAuthenticationAdapter,
    RainbowKitAuthenticationProvider,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createSiweMessage } from "viem/siwe";
import { signIn, signOut, useSession } from "next-auth/react";


export const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
        const verifyRes = await fetch("/api/nonce", {
            method: "POST", // Changed to POST
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}), // Include an empty body or any required data
        });
        if (!verifyRes.ok) {
            throw new Error("Failed to fetch nonce");
        }
        const data = await verifyRes.json();
        return data.nonce; // Return the fetched nonce
    },

    createMessage: ({ nonce, address, chainId }) => {
        try {
            const message = createSiweMessage({
                domain: window.location.host,
                address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId,
                nonce,
            })
            return message;
        } catch (error: any) {
            console.error(error.toString());
        }

    },
    verify: async ({ message, signature }) => {
        const loginData = { message, signature };
        const verifyRes = await signIn("credentials", {
            redirect: false,
            ...loginData,
        });
        return Boolean(verifyRes?.ok);
    },
    signOut: async () => {
        await signOut();
    },
});

export function RainbowProvider({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = useSession();
    return (
        <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={session.status}
        >
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
    )
}
