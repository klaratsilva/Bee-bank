import { BankOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

import "./globals.css";
import SideBar from "../components/SideBar";

export const metadata = {
  title: "BeeBank",
  description: "A modern banking experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-full font-inter">
          <SideBar />
          <div className="flex size-full flex-col">{children}</div>
        </main>
      </body>
    </html>
  );
}
