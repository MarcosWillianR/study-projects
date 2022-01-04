import { TransactionProvider } from './Transaction';

export default function AppProvider({ children }: { children: JSX.Element }) {
  return (
    <TransactionProvider>
      {children}
    </TransactionProvider>
  )
}