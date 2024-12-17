import { ConnectButton } from '@rainbow-me/rainbowkit';
import Counter from '@/components/counter';
import AppBar from '@/components/ui/appbar';

export default function Home() {
    return (
        <div className='w-full h-screen flex flex-col gap-4'>
            <AppBar />
            <div className='flex justify-center'>
                <Counter />
            </div>
        </div>
    );
}
