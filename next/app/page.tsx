import { ConnectButton } from '@rainbow-me/rainbowkit';
import Counter from '@/components/counter';

export default function Home() {
    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='w-full p-4 flex justify-end'>
                <ConnectButton accountStatus="full" chainStatus="full" showBalance={false} />
            </div>

            <div className='flex justify-center'>
                <Counter />
            </div>
        </div>
    );
}
