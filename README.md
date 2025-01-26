# Nextry

Nextry = Next.js + Foundry

- Foundry build 时自动生成 React 自定义 hook 到 Next.js 目录
- 内置 SIWE 签名登陆实现

## 技术栈

Frontend: `Next.js 15.1` + `Next-Auth v5` + `Shadcn` + `Wagmi/Wagmi cli` + `Rainbowkit`

Solidity: `Foundry`

## 配置项

首先设置环境变量

- `cp next/.env.example next/.env`
- `cp foundry/.env.example foundry/.env`

## 开发流程

1. `pnpm run anvil` 打开本地链
2. `pnpm run deploy` 部署 foundry 合约到本地链，并将 `abi` 和 `address` 同步给前端
3. `pnpm run dev` 运行 next.js 前端

## 部署合约

一定要在 `foundry/.env` 中添加私钥 `DEPLOYER_PRIVATE_KEY` 和 `ALCHEMY_API_KEY` 变量，想要 verify 成功的话，还要有 `ETHERSCAN_API_KEY`

```
# https://docs.alchemy.com/docs/alchemy-quickstart-guide#1key-create-an-alchemy-api-key
ALCHEMY_API_KEY=
# https://etherscan.io/myapikey
ETHERSCAN_API_KEY=
DEPLOYER_PRIVATE_KEY=0x
```
执行

`pnpm run deploy:sepolia`

verify contract 需要科学网络环境，如果没有成功，可以用类似下边的命令重新验证

`forge verify-contract <address> OurToken --chain-id 11155111`

## 部署到其他链

首先确保foundry 目录中的 `foundry.toml` 中有对应的 `rpc_endpoints` 比如增加熊链

`berachainBartio="https://berachain-bartio.g.alchemy.com/v2/${ALCHEMY_API_KEY}"`

然后在外部package.json 增加命令如下，`--rpc-url` 指向 `berachainBartio`

```json

{
  ...
  "scripts": {
    ...
    "deploy:berachainBartio": "cd ./foundry && forge script script/Deploy.s.sol:DeployScript --rpc-url berachainBartio --broadcast --verify"
  },
}
```



## 常用依赖（可选）

进入 foundry 目录

### openzeppelin

1. `forge install OpenZeppelin/openzeppelin-contracts --no-commit`
2. Add `@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/` in remappings.txt


### chainlink

1. `forge install smartcontractkit/chainlink-brownie-contracts --no-commit`
2. Add `@chainlink/contracts/=lib/chainlink-brownie-contracts/contracts/src/` in remapping.txt


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

