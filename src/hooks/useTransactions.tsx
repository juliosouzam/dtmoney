import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: 'deposit' | 'withdraw';
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (data: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get<{ transactions: Transaction[] }>('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = useCallback(
    async (transactionInput: TransactionInput) => {
      const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
      });

      const { transaction } = response.data;
      setTransactions((prev) => [...prev, transaction]);
    },
    []
  );

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
