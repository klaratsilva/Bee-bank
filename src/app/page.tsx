import "@ant-design/v5-patch-for-react-19";
import CurrentUserHeading from "./accounts/CurrentUserHeading";
import HeaderBox from "../components/HeaderBox";

export default function Home() {
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;">
        <HeaderBox
          type="greeting"
          title="Welcome,"
          subtext={"Manage your accounts and transactions efficiently"}
        />
      </div>
    </section>
  );
}
