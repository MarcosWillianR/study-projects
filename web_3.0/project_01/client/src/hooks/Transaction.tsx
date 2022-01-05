import { createContext, useContext, useCallback, useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

interface TransactionData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}
interface Transaction {
  connectWallet: () => Promise<void>;
  connectedAccount: string;
  sendTransaction: (data: TransactionData) => Promise<void>;
  isLoading: boolean;
}

const TransactionContext = createContext({} as Transaction);

const { ethereum } = window as any;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
}

function TransactionProvider({ children }: { children: JSX.Element }) {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

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

  const handleSendTransaction = useCallback<(data: TransactionData) => Promise<void>>(async ({
    addressTo, 
    amount, 
    message,
    keyword, 
  }) => {
    try {
      if (!ethereum) return alert("Please, install metamask");
      if (!connectedAccount) return alert("Please, connect a wallet first");

      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      setIsLoading(true);

      await ethereum.request({ 
        method: 'eth_sendTransaction', 
        params: [
          { 
            from: connectedAccount, 
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parsedAmount._hex,
          }
        ] 
      })

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
      
      await transactionHash.wait();

      const transactionNum = await transactionContract.getTransactionCount();
      setTransactionCount(transactionNum.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.")
    } finally {
      setIsLoading(false);
    }
  }, [connectedAccount]);

  const value = useMemo(() => ({
    connectWallet: handleConnectWallet,
    connectedAccount,
    sendTransaction: handleSendTransaction,
    isLoading,
  }), [
    handleConnectWallet, 
    connectedAccount, 
    handleSendTransaction, 
    isLoading
  ])

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