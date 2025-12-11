"use client";
import React from 'react';
import { Button } from '../../components/Button';
import MenuIcon from '../../icons/MenuIcon';
import { Input } from '../../components';
import { useSidebar } from '../../context/SidebarContext';

function Header() {

  const { toggleSidebar } = useSidebar(); 

  return (
    <header className="sticky top-0 flex items-center justify-between w-full p-3 bg-white border-gray-200 z-[99999] dark:border-gray-800 dark:bg-gray-900 xl:border-b">

      <Button 
        className="btn-toggle-side flex items-center gap-2"
        onClick={toggleSidebar}    
      >
        <MenuIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      </Button>

    </header>
  );
}

export default Header;
