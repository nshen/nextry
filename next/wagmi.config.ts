import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import { mainnet, sepolia } from 'wagmi/chains'
import { foundry } from '@wagmi/cli/plugins'

loadEnv()

export default defineConfig({
    out: 'generated/hooks.ts',
    contracts: [
        // {
        //     name: 'erc20',
        //     abi: erc20Abi,
        // },
    ],
    plugins: [
        // etherscan({
        //     apiKey: process.env.ETHERSCAN_API_KEY!,
        //     chainId: mainnet.id,
        //     contracts: [
        //         {
        //             name: 'EnsRegistry',
        //             address: {
        //                 [mainnet.id]: '0x314159265dd8dbb310642f98f50c066173c1259b',
        //                 [sepolia.id]: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
        //             },
        //         },
        //     ],
        // }),
        foundry({
            project: '../foundry',
        }),
        react(),
    ],
})
