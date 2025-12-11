
"use client";
import { menuItems } from "./menuData";
import Link from "next/link";
import { useSidebar } from "../../context/SidebarContext";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";

export default function SideBar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const savedActiveMenu = sessionStorage.getItem("activeMenu");
    if (savedActiveMenu) {
      setActiveMenu(savedActiveMenu);
      setOpenSubMenu(savedActiveMenu);
    }
  }, []);

  const toggleSubMenu = (key) => {
    setOpenSubMenu(openSubMenu === key ? null : key);
  };

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    sessionStorage.setItem("activeMenu", key);
    if (menuItems.find((item) => item.key === key)?.subMenu) {
      toggleSubMenu(key);
    }
  };

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 xl:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col px-5 pt-6
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          text-gray-900 dark:text-white
          transform transition-transform duration-300 ease-in-out
          w-[290px]
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h1 className="text-xl font-bold mb-4 cursor-pointer" onClick={closeSidebar}>
          Sidebar
        </h1>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isOpen = openSubMenu === item.key;
              const isActive = activeMenu === item.key;
              return (
                <li key={item.key}>
                  <div
                    className={`flex justify-between items-center cursor-pointer p-2 rounded
                      ${isActive ? "bg-[var(--menu-active-bg)] text-[var(--menu-active-color)]" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          className={`${isActive ? "text-[var(--menu-active-color)]" : "text-gray-500 dark:text-gray-400"}`}
                        />
                      )}
                      <Link href={item.url} className="text-sm">{item.label}</Link>
                    </div>
                    {item.subMenu && (
                      <ChevronDownIcon
                        className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                          } ${isActive ? "text-[var(--menu-active-color)]" : "text-gray-500 dark:text-gray-400"}`}
                      />
                    )}
                  </div>

                  {item.subMenu && isOpen && (
                    <ul className="ml-6 mt-1 flex flex-col space-y-1">
                      {item.subMenu.map((sub) => (
                        <li
                          key={sub.key}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Link href={sub.url} className="text-sm"> 
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
