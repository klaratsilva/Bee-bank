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
        <header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #eee",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <BankOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
            <span
              style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#222" }}
            >
              BeeBank
            </span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
