"use client";
import React from "react";
import { Button } from "./Button";
import Image from "next/image";
import errorGif from "../../assets/Tomato Error.gif";

export default function ErrorModal({ isOpen, onClose, message = "Something went wrong!" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-96 flex flex-col items-center">
                 <div className="mb-4">
                 <Image src={errorGif} alt="Success" width={96} height={96} />
                 </div>
                <h2 className="text-red-600 text-lg font-bold mb-2">Error</h2>
                <p className="text-center mb-4">{message}</p>
                <Button onClick={onClose}>OK</Button>
            </div>
        </div>
    );
}
