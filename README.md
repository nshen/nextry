# Nextry 

Nextry = Next.js + Foundry

## 技术栈

Frontend: `Next.js 15RC` + `Shadcn` + `Wagmi/Wagmi cli` + `Rainbowkit` 

Solidity: `Foundry`

## 配置项

首先设置环境变量

- `cp next/.env.example next/.env`
- `cp foundry/.env.example foundry/.env`

## 开发流程

1. `pnpm run anvil` 打开本地链
2. `pnpm run deploy` 部署 foundry 合约到本地链
3. `pnpm run dev` 打开前端（自动生成合约 hooks 和地址）

## 开发准备（可选）

1. Metamask 导入钱包 Anvil 默认账号助记词 `test test test test test test test test test test test junk`

2. 给 Metamask 添加 Anvil 网络

    ```
    网络名称: Anvil
    RPC URL:  http://127.0.0.1:8545
    链ID:     31337
    货币符号: ETH
    ```

    如遇不能保存，先 `pnpm run anvil` 本地运行 Anvil 链，再保存



