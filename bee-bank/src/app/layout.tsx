import { BankOutlined } from "@ant-design/icons";
import Link from "next/link";

import "./globals.css";

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
        <header className="flex items-center p-4 border-b border-gray-200">
          <Link
            href="/accounts"
            className="flex items-center gap-3 no-underline"
          >
            <BankOutlined className="text-blue-500 text-4xl" />
            <span className="text-xl font-bold text-blue-500">BeeBank</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
