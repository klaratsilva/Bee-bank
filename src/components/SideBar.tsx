"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { SiderbarProps } from "@/lib/types";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const SideBar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sidebarContent = (
    <nav className="flex flex-col gap-4 p-4">
      <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={54}
          height={54}
          className="size-[54px] max-xl:size-14"
        />
        <h1 className="2xl:text-26 text-gray-900 font-ibm-plex-serif text-[22px] font-light text-black-1 max-xl:hidden">
          Bee-Bank
        </h1>
      </Link>
      {sidebarLinks.map((item) => {
        const isActive =
          pathname === item.route || pathname.startsWith(`${item.route}/`);

        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-sm justify-start text-gray-500 ",
              {
                "bg-blue-500": isActive,
                "hover:text-gray-700 hover:bg-gray-100 pointer:none": !isActive,
              }
            )}
            onClick={() => setDrawerOpen(false)} // close drawer on link click
          >
            <div className="relative size-6">
              <Image
                src={item.imgURL}
                alt={item.label}
                fill
                className={cn({ "filter brightness-0 invert": isActive })}
              />
            </div>
            <p
              className={cn("text-16 font-semibold text-black-2", {
                "text-white": isActive,
              })}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
        {sidebarContent}
      </section>

      {/* Mobile hamburger button */}
      <div className="md:hidden">
        <Button
          className="fixed top-4 left-108 z-50"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          type="primary"
          shape="circle"
          size="large"
          aria-label="Open menu"
        />
      </div>
      {/* Mobile drawer */}
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        className="md:hidden"
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default SideBar;
