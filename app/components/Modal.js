"use client";

import React from "react";
import {CrossIcon} from "../icons/CrossIcon"
export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 scale-100">
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <CrossIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto no-scrollbar text-gray-700 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
