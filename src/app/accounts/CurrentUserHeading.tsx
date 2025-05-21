"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

const CurrentUserHeading = () => {
  const currentUser = useCurrentUser();
  return currentUser ? (
    <>
      <h1 className="text-3xl font-bold text-blue-500">
        Welcome, {currentUser.name} 👋
      </h1>
      <p>Manage your accounts and transactions efficiently</p>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default CurrentUserHeading;
