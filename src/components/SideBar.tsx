"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
//  import Footer from "./Footer";
import { SiderbarProps } from "@/lib/types";
// import { PlaidApi } from "plaid";
// import PlaidLink from "./PlaidLink";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex min-w-[300px] sm:min-w-[355px] xl:overflow-y-scroll !important p-5">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={54}
            height={54}
            className="size-[54px] max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
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
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({ "!text-blue-500": isActive })}
                />
              </div>
              <p
                className={cn("sidebar-label", { "!text-blue-500": isActive })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      {/* <Footer user={user} /> */}
    </section>
  );
};

export default SideBar;
