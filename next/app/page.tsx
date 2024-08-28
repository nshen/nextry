import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Home() {
    return (
        <div >
            <ConnectButton accountStatus="full" chainStatus="full" showBalance={false} />
        </div>
    );
}


