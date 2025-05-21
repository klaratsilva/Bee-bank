"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setCurrentUser(JSON.parse(storedUser));
  }, [router]);

  return currentUser;
}
