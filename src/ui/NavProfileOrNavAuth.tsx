"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/UserContext";
import NotInterestSetProfile from "../../public/dont inteterst to set profile1.svg";

// We receive initialUser from the Server Component
const NavProfileOrNavAuth = ({ initialUser }: any) => {
  const { user, setUser } = useAuth();

  // "Hydrate" the global context with the server data
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  // Use initialUser for immediate rendering, fallback to context 'user'
  const currentUser = user || initialUser;

  return (
    <>
      {currentUser ? (
        <Link href="/profile">
          <Image
            className="w-9 h-9 md:w-12 md:h-12 rounded-full border border-textPrimary"
            src={NotInterestSetProfile}
            alt="User Profile"
          />
        </Link>
      ) : (
        <Link
          href="/auth"
          className="px-2 py-0.5 border-2 border-ctaSecondary text-textPrimary text-sm sm:text-xl rounded-tl-3xl rounded-br-2xl"
        >
          Signup
        </Link>
      )}
    </>
  );
};

export default NavProfileOrNavAuth;
