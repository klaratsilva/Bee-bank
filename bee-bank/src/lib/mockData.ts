import { User, Account, Transaction } from "./types";

export const mockUsers: User[] = [
    { userId: 1, username: 'klara', password: '123456', name: 'Klara Wonderland' },
    { userId: 2, username: 'bob', password: 'abcdefg', name: 'Bob Builder' },
  ];
  
  // export const mockAccounts: Account[] = [
  //   {
  //     id: '1',
  //     name: 'Main Savings',
  //     balance: 4200,
  //     type: 'savings',
  //     accountNumber: '123-456',
  //   },
  //   {
  //     id: '2',
  //     name: 'Business Account',
  //     balance: 10000,
  //     type: 'current',
  //     accountNumber: '789-012',
  //   },
  // ];
  
  // export const mockTransactions: Transaction[] = [
  //   {
  //     id: 't1',
  //     accountId: '1',
  //     senderReceiver: 'Bob Builder',
  //     amount: 200,
  //     date: '2024-04-15',
  //     message: 'Payment for groceries',
  //   },
  //   {
  //     id: 't2',
  //     accountId: '1',
  //     senderReceiver: 'Alice Wonderland',
  //     amount: 500,
  //     date: '2024-04-10',
  //     message: 'Salary',
  //   },
  //   {
  //     id: 't3',
  //     accountId: '1',
  //     senderReceiver: 'Electric Company',
  //     amount: 120,
  //     date: '2024-04-01',
  //     message: 'Electricity bill',
  //   },
  //   {
  //     id: 't4',
  //     accountId: '1',
  //     senderReceiver: 'Internet Provider',
  //     amount: 80,
  //     date: '2024-03-28',
  //     message: 'Monthly internet',
  //   },
  //   {
  //     id: 't5',
  //     accountId: '2',
  //     senderReceiver: 'Client A',
  //     amount: 3000,
  //     date: '2024-04-14',
  //     message: 'Project payment',
  //   },
  //   {
  //     id: 't6',
  //     accountId: '2',
  //     senderReceiver: 'Office Supplies Ltd.',
  //     amount: 450,
  //     date: '2024-04-05',
  //     message: 'Office chairs',
  //   },
  //   {
  //     id: 't7',
  //     accountId: '2',
  //     senderReceiver: 'Tax Agency',
  //     amount: 1300,
  //     date: '2024-03-30',
  //     message: 'Quarterly tax payment',
  //   },
  // ];

  // Retrieve transactions from localStorage (if available)
// export const getTransactions = () => {
//   const storedTransactions = localStorage.getItem('transactions');
//   return storedTransactions ? JSON.parse(storedTransactions) : [];
// };

// export const saveTransaction = (transaction: any) => {
//   const storedTransactions = getTransactions();
//   storedTransactions.push(transaction);
//   localStorage.setItem('transactions', JSON.stringify(storedTransactions));
// };

