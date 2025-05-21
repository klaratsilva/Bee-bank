"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

const CurrentUserHeading = () => {
  const currentUser = useCurrentUser();
  return currentUser ? (
    <h1 className="text-3xl font-bold text-blue-500 mb-5">
      Welcome, {currentUser.name} 👋
    </h1>
  ) : (
    <p>Loading...</p>
  );
};

export default CurrentUserHeading;
