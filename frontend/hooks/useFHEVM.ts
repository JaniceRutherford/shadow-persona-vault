"use client";

import { useState, useEffect } from "react";

export function useFHEVM() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert("Please install MetaMask to use this application");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet");
    }
  };

  useEffect(() => {
    // Check if already connected
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      });
    }
  }, []);

  return {
    isConnected,
    account,
    connectWallet,
  };
}
