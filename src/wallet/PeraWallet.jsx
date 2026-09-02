import React, { useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { createX402Client } from '../x402/x402Client';

const peraWallet = new PeraWalletConnect();

export default function PeraWallet() {
    const [account, setAccount] = useState(null);
    const [connecting, setConnecting] = useState(false);

    const connectWallet = async () => {
        try {
            setConnecting(true);

            const accounts = await peraWallet.connect();
            const address = accounts[0];

            setAccount(address);

            // Create the x402 client using the connected Pera wallet.
            const { client, httpClient } = createX402Client(
                peraWallet,
                address
            );

            // Expose them temporarily for testing.
            window.vanPrabhaX402 = {
                client,
                httpClient,
                address,
            };

            console.log('x402 client created:', window.vanPrabhaX402);
        } catch (error) {
            console.error('Pera wallet connection failed:', error);
        } finally {
            setConnecting(false);
        }
    };

    return (
        <div>
            {!account ? (
                <button onClick={connectWallet} disabled={connecting}>
                    {connecting ? 'Connecting...' : 'Connect Pera Wallet'}
                </button>
            ) : (
                <div>
                    <p>Wallet connected</p>
                    <p>{account}</p>
                </div>
            )}
        </div>
    );
}