import HeaderBox from "@/components/HeaderBox";
import AddTransactionForm from "./AddTransactionForm"; // Adjust the path based on where you save the client-side form

interface Props {
  params: {
    accountId: string;
  };
}

export default async function AddTransactionPage({ params }: Props) {
  const { accountId } = await params;

  return (
    <div style={{ maxWidth: 800, padding: "60px" }}>
      <HeaderBox title="Create a new Transaction" subtext={""} />
      <div className="mt-10">
        <AddTransactionForm />
      </div>
    </div>
  );
}
