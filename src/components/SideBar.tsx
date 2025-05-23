"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const SidebarContent = () => (
    <nav className="flex flex-col gap-4 p-4 h-full justify-between">
      <div>
        <Link href="/" className="hidden mb-12 md:flex items-center gap-3 ">
          <Image
            src="/logo.png"
            alt="logo"
            width={54}
            height={54}
            className="size-[30px]"
          />
          <h1 className="text-[22px] font-bold text-black">Bee-Bank</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <div
              key={item.label}
              className={cn(
                "flex gap-3 items-center rounded-sm p-3 text-gray-500",
                {
                  "bg-blue-500 text-white !important": isActive,
                  "hover:text-gray-700 hover:bg-gray-100 pointer:none !important":
                    !isActive,
                }
              )}
            >
              <Link
                href={item.route}
                className={cn(
                  "flex gap-3 items-center md:p-3 p-1 rounded-sm",
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                )}
                onClick={() => setDrawerOpen(false)}
              >
                <div className="relative size-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn({ "filter brightness-0 invert": isActive })}
                  />
                </div>
                <p className={cn("font-semibold", { "text-white": isActive })}>
                  {item.label}
                </p>
              </Link>{" "}
            </div>
          );
        })}
      </div>

      <footer
        className="flex cursor-pointer items-center gap-3 p-3 text-gray-500 hover:bg-gray-100 rounded-sm"
        onClick={handleLogOut}
      >
        <div className="relative size-6">
          <Image src="/icons/logout.svg" alt="logout" fill />
        </div>
        <h1 className="font-semibold">Log out</h1>
      </footer>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[280px] h-screen border-r border-gray-200 bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile button in top-right corner */}
      <div className="fixed top-4 right-8 z-50 md:hidden">
        <Button
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          type="primary"
          shape="circle"
          size="large"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        className="md:hidden"
        title={
          <div className="ml-3 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              className="size-[32px]"
            />
            <h1 className="text-lg font-bold text-black">Bee-Bank</h1>
          </div>
        }
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default SideBar;
