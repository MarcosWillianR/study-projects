import { createContext, useContext, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

const TransactionContext = createContext({});

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
  const checkIfWalletIsConnected = useCallback(async () => {
    if (!ethereum) return alert("Please, install metamask");

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{}}>
      {children}
    </TransactionContext.Provider>
  )
}

function useTransaction() {
  const context = useContext(TransactionContext);

  return context;
}

export { TransactionProvider, useTransaction }