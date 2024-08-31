'use client'
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'
import { useWaitForTransactionReceipt } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useReadCounterNumber, useWriteCounterIncrement, useWriteCounterSetNumber } from '@/generated/hooks';
import { addressMap } from '@/generated/address-map';
import { Button } from './ui/button';
import { Input } from './ui/input';

// anvil Counter deploied address
const address = addressMap[31337].Counter

const Counter = () => {
    const { openConnectModal } = useConnectModal();

    const queryClient = useQueryClient()

    // read number 
    const { data: counter, isPending, error, queryKey } = useReadCounterNumber({
        address
    });

    // setNumber
    const { data: hash, writeContract: setNumber } = useWriteCounterSetNumber()
    const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })

    // increment 
    const { data: incrementHash, writeContract: increment } = useWriteCounterIncrement()
    const { isSuccess: isIncrementConfirmed } = useWaitForTransactionReceipt({
        hash: incrementHash
    })

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey })
    }, [isConfirmed, isIncrementConfirmed, queryClient, queryKey])


    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setInputValue(value);
        }
    };

    if (openConnectModal) return <div>请先连接钱包</div>

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='w-1/4 flex flex-col space-y-4 p-4'>
            <div>Counter: {counter.toString()}</div>
            <Button onClick={() => increment({ address })}>Increment</Button>
            <div className='flex space-x-2'>
                <Input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    className='border p-2'
                    placeholder='Enter number'
                />
                <Button onClick={() => setNumber({ address, args: [BigInt(inputValue)] })}>SetNumber</Button>
            </div>
            {isConfirmed && <div>Transaction confirmed.</div>}
        </div>
    )
}

export default Counter
