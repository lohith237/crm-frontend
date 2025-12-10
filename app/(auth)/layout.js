"use client";
import { ThemeProvider } from "../context/ThemeContext";
import { ThemeTogglerTwo } from "../components";

export default function AuthLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="realtive min-h-screen flex dark:bg-gray-800">
        <div className=" w-full lg:w-1/2 flex justify-center">
          <div className="w-full  dark:bg-gray-900  flex flex-col">
            {children}
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex items-center justify-center bg-[var(--color-brand)] dark:bg-gray-800">
          <p className="text-gray-400 dark:text-white/60">Admin Dashboard Template</p>
        </div>
        <div className="absolute bottom-4 right-4">
          <ThemeTogglerTwo />
        </div>
      </div>
    </ThemeProvider>
  );
}
