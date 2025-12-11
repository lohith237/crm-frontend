"use client";

import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "./Header/page";
import SideBar from "./SideBar/page";
import { ProtectedRoute } from "../hooks/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const Body = () => {
    const { isSidebarOpen } = useSidebar();

    return (
      <div className="min-h-screen xl:flex dark:bg-gray-800 overflow-x-hidden">
        <SideBar />

        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-[290px]" : "ml-0"
          } max-w-full`}
        >
          <Header />

          <div className="p-4 md:p-6 mx-auto max-w-full">
            <div className="w-full dark:bg-gray-900 flex flex-col">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <ThemeProvider>
        <SidebarProvider>
          <Body />
        </SidebarProvider>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
