"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HeaderBoxProps } from "@/lib/types";
import React from "react";

const HeaderBox = ({ title, type = "title", subtext }: HeaderBoxProps) => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[30px] leading-[30px] lg:text-30 font-semibold text-gray-900">
        {title}
        {type === "greeting" && (
          <span className=" text-blue-500">&nbsp;{user?.name || "Guest"}</span>
        )}
      </h1>
      <p className="text-[14px] leading-[20px]  font-normal text-gray-600">
        {subtext}
      </p>
    </div>
  );
};

export default HeaderBox;
