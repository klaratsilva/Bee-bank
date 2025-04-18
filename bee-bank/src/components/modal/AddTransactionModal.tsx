"use client";
import { Modal } from "antd";
import { useEffect } from "react";

import AddNewTransactionForm from "./AddTransactionForm";
import useAddTransactionForm from "./useAddTransactionForm";

import type { Transaction } from "@/lib/types";

interface Props {
  accountId: string;
  visible: boolean;
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
}

export default function AddTransactionModal({
  visible,
  onClose,
  onAdd,
  accountId,
}: Props) {
  const { form, handleSubmit, resetForm } = useAddTransactionForm(
    accountId,
    onAdd,
    onClose
  );

  useEffect(() => {
    if (!visible) resetForm();
  }, [visible, resetForm]);

  return (
    <Modal
      open={visible}
      title="Add Transaction"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Add"
    >
      <AddNewTransactionForm form={form} onFinish={handleSubmit} />
    </Modal>
  );
}
