import AddTransactionForm from "./AddTransactionForm"; // Adjust the path based on where you save the client-side form

interface Props {
  params: {
    accountId: string;
  };
}

export default async function AddTransactionPage({ params }: Props) {
  const { accountId } = await params;

  return (
    <div style={{ maxWidth: 800, margin: "50px auto", padding: "20px" }}>
      <h1>Add Transaction for Account {accountId}</h1>
      <AddTransactionForm accountId={accountId} />
    </div>
  );
}
