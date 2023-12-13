"use client";

import { fetchCategories } from "@/redux/categoriesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTasks } from "@/redux/taskSlice";
import { checkAuth } from "@/redux/userSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token && !pathname.includes("auth")) router.push("/auth/login");
    if (token) {
      dispatch(checkAuth(token))
        .unwrap()
        .then(() => {
          if (token && pathname.includes("auth")) {
            router.push("/");
          }
        })
        .catch((error) => {
          localStorage.removeItem("token");
          router.push("/auth/login");
        });
    }
  }, [dispatch, pathname, router]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTasks());
  }, [dispatch, data?._id]);

  return <React.Fragment>{children}</React.Fragment>;
}
