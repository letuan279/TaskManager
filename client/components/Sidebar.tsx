"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen w-fit">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center gap-3">
          <img
            src="/logo.png"
            className={`w-32 overflow-hidden transition-all`}
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <span className="font-bold text-2xl">Trackit</span>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  path,
}: {
  icon: ReactNode;
  text: ReactNode;
  path: String;
}) {
  const pathname = usePathname();

  const isActive = (path: String) => {
    return pathname === path;
  };

  return (
    <Link
      href={`${path}`}
      className={`
                  h-12
                  relative flex items-center py-2 px-3 my-1
                  font-medium rounded-md cursor-pointer
                  transition-colors group
                  ${
                    isActive(path)
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                      : "hover:bg-indigo-50 text-gray-600"
                  }
              `}
    >
      {icon}
      <span
        className={`
          w-52 ml-3
          text-lg
          overflow-hidden transition-all
        ${isActive(path) ? "font-bold" : "font-medium"}`}
      >
        {text}
      </span>
    </Link>
  );
}
