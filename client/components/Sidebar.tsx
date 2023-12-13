"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/categoriesSlice";

import { CategoryType } from "../app/category/[slug]/page";
import { Search } from "lucide-react";
import { fetchTasks } from "@/redux/taskSlice";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen w-[250px]">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center gap-3">
          <img
            src="/logo.png"
            className={`w-32 overflow-hidden transition-all`}
            alt=""
            style={{ width: "35px", height: "35px" }}
          />
          <span className="font-bold text-2xl">Task Manager</span>
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
        className={cn(
          isActive(path) ? "font-bold" : "font-medium",
          "w-52 ml-3 text-lg overflow-hidden transition-all"
        )}
      >
        {text}
      </span>
    </Link>
  );
}

function SearchBar() {
  return (
    <div className="input-wrapper h-10 my-2 border-none rounded px-4 bg-gray-100 flex items-center">
      <Search size={20} />
      <input
        placeholder="What to search for..."
        className="bg-transparent border-none h-full text-lg w-full ml-2 focus:outline-none"
      />
    </div>
  );
}

export function SidebarCategoryItem() {
  const pathname = usePathname();

  const isActive = (path: String) => {
    return pathname === path;
  };

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories);

  return (
    <>
      {/* <SearchBar /> */}
      {categories.data?.map((item: CategoryType) => (
        <Link
          key={item._id + "2"}
          href={`/category/${item._id}`}
          className={`
                    h-10
                    relative flex items-center py-1 px-2 my-1 ml-2
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${
                      isActive(`/category/${item._id}`)
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                        : "hover:bg-indigo-50 text-gray-600"
                    }
                `}
        >
          <div
            className={`w-3 h-3 rounded-full`}
            style={{ backgroundColor: item.color }}
          ></div>
          <span
            className={cn(
              isActive(`/category/${item._id}`) ? "font-bold" : "font-medium",
              "w-48 ml-3 text-sm overflow-hidden transition-all"
            )}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </>
  );
}
