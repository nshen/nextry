## Web3 Starter

Nextjs + shadcn + wagmi + rainbowkit

## How

### 初始化 Nextjs

`pnpx create-next-app@rc --turbo`

### shadcn ui

`pnpm dlx shadcn-ui@latest init`

`tailwind.config.ts` 添加 `config.theme.extend.fontFamily`

```js

fontFamily: {
    sans: [
        ...defaultTheme.fontFamily.sans,
        "PingFang SC",
        "Microsoft Yahei",
    ],
    serif: [...defaultTheme.fontFamily.serif, "STSong", "SimSun"],
},
```

添加一个默认 button

`pnpm dlx shadcn-ui@latest add button`

清空 `page.tsx`

```tsx

import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className='m-10'>
            <Button>Click Me</Button>
        </div>
    );
}
```

### wagmi

`pnpm add wagmi@latest viem@latest @tanstack/react-query`

add `lib/wagmi.ts`, `app/providers.tsx`

修改 `app/layout.tsx` 增加 `cookieToInitialState` 传给 provider 

### rainbow
