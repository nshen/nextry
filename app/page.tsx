import { Button } from '@/components/ui/button';
import { WagmiAccount } from '@/components/wagmi-account';

export default function Home() {
    return (
        <div className='m-10'>
            <Button>Click Me</Button>
            <WagmiAccount />
        </div>
    );
}


