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
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex max-w-[800px] flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;">
        <HeaderBox
          title="New Transaction"
          subtext={"Send a new transaction in a second"}
        />
        <div>
          <AddTransactionForm />
        </div>
      </div>
    </section>
  );
}
