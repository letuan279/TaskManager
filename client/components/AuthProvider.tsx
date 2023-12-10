"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && pathname.includes("auth")) router.push("/");
    if (!token) router.push("/auth/login");
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
