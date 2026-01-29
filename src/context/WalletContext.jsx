import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        // Check local storage for persistence
        const storedAddress = localStorage.getItem('lofi_wallet_address');
        if (storedAddress) {
            setWalletAddress(storedAddress);
        }
    }, []);

    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    const connectWallet = async () => {
        setIsConnecting(true);

        const isMobile = isMobileDevice();

        if (isMobile) {
            // Mobile: Redirect to Slush App / Deep Link
            // direct link to the web application/PWA
            window.location.href = 'https://my.slush.app';
        } else {
            // Desktop: Check for extension or open web wallet
            // Open the actual Web Wallet app, not the landing page
            window.open('https://my.slush.app', '_blank');
        }

        // Simulate waiting for user to approve in the app/extension
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Generate a random-looking Sui address (longer hex)
        const mockAddress = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

        setWalletAddress(mockAddress);
        localStorage.setItem('lofi_wallet_address', mockAddress);
        setIsConnecting(false);
        return mockAddress;
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
        localStorage.removeItem('lofi_wallet_address');
    };

    const isConnected = !!walletAddress;

    const value = {
        walletAddress,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};
