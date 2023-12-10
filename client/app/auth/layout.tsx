import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen fixed left-0 top-0 bg-white flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
