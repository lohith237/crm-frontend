"use client";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "./Header/page";
import SideBar from "./SideBar/page"
import {ProtectedRoute} from "../hooks/ProtectedRoute"
export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
        <ThemeProvider>
            <div className="min-h-screen xl:flex dark:bg-gray-800">
                <SideBar />
                <div className="flex-1 transition-all  duration-300 ease-in-out xl:ml-[290px]">
                    <Header />
                </div>
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <div className="w-full dark:bg-gray-900  flex flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </ThemeProvider>
        </ProtectedRoute>
    );
}
