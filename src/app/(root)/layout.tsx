import SideBar from "../../components/SideBar";
import "../globals.css";

export const metadata = {
  title: "BeeBank",
  description: "A modern banking experience",

  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex h-screen w-full font-inter">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </main>
  );
}
