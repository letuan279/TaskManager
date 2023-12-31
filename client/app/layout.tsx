import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  LayoutDashboard,
  CalendarCheck,
  ListTodo,
  Settings,
  BookmarkCheck,
} from "lucide-react";
import Sidebar, {
  SidebarCategoryItem,
  SidebarItem,
} from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

import ReduxProvider from "../redux/ReduxProvider";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";

import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <GoogleOAuthProvider clientId="544769320623-1afqfobicnrar2p7j2bf4pghshtl323q.apps.googleusercontent.com">
        <AuthProvider>
          <html lang="en">
            <body className={inter.className}>
              <div className="w-screen h-screen flex">
                <Sidebar>
                  <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text={"Home"}
                    path="/"
                  />
                  <SidebarItem
                    icon={<CalendarCheck size={20} />}
                    text={"Schedule"}
                    path="/schedule"
                  />
                  <SidebarItem
                    icon={<ListTodo size={20} />}
                    text={"Task"}
                    path="/task"
                  />

                  <SidebarItem
                    icon={<Settings size={20} />}
                    text={"Setting"}
                    path="/setting"
                  />
                  <hr />
                  <SidebarItem
                    icon={<BookmarkCheck size={20} />}
                    text={"Category"}
                    path="/category"
                  />
                  <SidebarCategoryItem />
                </Sidebar>

                <div className="w-screen h-screen max-h-screen max-w-screen">
                  <Navbar />
                  {children}
                  <ToastContainer />
                </div>
              </div>
            </body>
          </html>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
}
