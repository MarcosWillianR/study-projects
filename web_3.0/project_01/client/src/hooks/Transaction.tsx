import { createContext, useContext, useCallback, useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

interface Transaction {
  connectWallet: () => Promise<void>;
  connectedAccount: string;
}

const TransactionContext = createContext({} as Transaction);

const { ethereum } = window as any;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider,
    signer,
    transactionContract
  })
}

function TransactionProvider({ children }: { children: JSX.Element }) {
  const [connectedAccount, setConnectedAccount] = useState('');

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) return alert("Please, install metamask");

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.log('no accounts found!');
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.")
    }
  }, []);

  const handleConnectWallet = useCallback(async () => {
    try {
      if (!ethereum) return alert("Please, install metamask");
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log(accounts)
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.")
    }
  }, []);

  const handleSendTransaction = useCallback(async () => {
    try {
      if (!ethereum) return alert("Please, install metamask");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.")
    }
  }, []);

  const value = useMemo(() => ({
    connectWallet: handleConnectWallet,
    connectedAccount,
  }), [handleConnectWallet, connectedAccount])

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

function useTransaction() {
  const context = useContext(TransactionContext);

  return context;
}

export { TransactionProvider, useTransaction }