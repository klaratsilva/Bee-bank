
export interface User {
  userId: number;
  username: string;
  password: string;
  name: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'savings' | 'current';
  accountNumber: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  senderReceiver: string;
  amount: number;
  date: string;
  message: string;
}
