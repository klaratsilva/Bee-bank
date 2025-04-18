'use client';
import { Form, message } from 'antd';
import dayjs from 'dayjs';

import { BASE_URL } from '@/server/const';
import type { Transaction, TransactionWithoutId } from '@/lib/types';

export default function useAddTransactionForm(
  accountId: string,
  onAdd: (transaction: Transaction) => void,
  onClose: () => void
) {
  const [form] = Form.useForm();

  const handleSubmit = async (values: TransactionWithoutId) => {
    const newTransaction: TransactionWithoutId = {
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
      onAdd(createdTransaction);
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
