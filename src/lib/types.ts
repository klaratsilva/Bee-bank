export interface User {
  userId: string;       // changed from number to string (UUID-like)
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface Account {
  accountId: string;    // renamed from id to accountId
  userId: string;       // added userId to link to user
  name: string;
  type: 'savings' | 'checking'; // updated to match 'checking' type used in db.json
  accountNumber: string;
}

export interface Transaction {
  id: string;
  senderAccountId: string;
  senderUserId: string;
  sender: string;
  receiverUserId: string;
  receiver: string;
  receiverAccountId: string;
  amount: number;
  date: string;  // ISO date string
  message: string;
}


export type TransactionWithoutId = Omit<Transaction, 'id'>

export interface SiderbarProps {
  user: User;
}


export interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
}

export interface TotlaBalanceBoxProps {
  accounts: Account[];
}