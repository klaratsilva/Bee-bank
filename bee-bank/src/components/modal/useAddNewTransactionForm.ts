'use client';
import { Form, message } from 'antd';
import { Transaction } from '@/lib/types';
import dayjs from 'dayjs';
import { BASE_URL } from '@/server/const';

export default function useAddNewTransactionForm(
  accountId: string,
  onAdd: (tx: Transaction) => void,
  onClose: () => void
) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const newTransaction: Omit<Transaction, 'id'> = {
      accountId,
      senderReceiver: values.senderReceiver,
      amount: values.amount,
      date: dayjs(values.date).format('YYYY-MM-DD'),
      message: values.message,
    };

    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      if (!res.ok) {
        throw new Error('Failed to create transaction');
      }

      const createdTransaction = await res.json();
      onAdd(createdTransaction); // Send it back to local state
      message.success('Transaction added!');
      onClose();
    } catch (error) {
      console.error(error);
      message.error('Error adding transaction');
    }
  };

  const resetForm = () => {
    form.resetFields();
  };

  return { form, handleSubmit, resetForm };
}
