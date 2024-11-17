"use client";

import { useState } from "react";

import Link from "next/link";
import { UsernameProvider } from "@/app/context/UsernameContext";
import {useRouter} from "next/navigation";
import Cookie from "js-cookie";

export default function Home() {
    const router = useRouter();
    // Simulated inbox with no messages initially
    const [inbox, setInbox] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Function to handle the "View Inbox" button click
    const handleViewInbox = () => {
        // Show the popup only if there are no messages
        if (inbox.length === 0) {
            setIsPopupVisible(true);
        }
    };

    // Function to close the popup when the user clicks the X
    const closePopup = () => {
        setIsPopupVisible(false);
    }

    if (!Cookie.get("username")) {
        router.push("/login");
    }

    return (
        <UsernameProvider>
            <div className="min-h-screen bg-custom-maze bg-cover bg-center text-white flex flex-col items-center justify-center"
                 style={{fontFamily: "'Courier New', monospace"}}>
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                        CRYPT(GE)OGRAPHY
                    </h1>
                </header>

                <main className="flex flex-col items-center justify-center">
                    <Link href="/input">
                        <button className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200 mb-4">
                            Send a message
                        </button>
                    </Link>

                    <button
                        onClick={handleViewInbox}
                        className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200 mb-4"
                    >
                        View Inbox
                    </button>
                </main>
                {/* Popup for no messages */}
                {isPopupVisible && (
                    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-md shadow-lg z-50">
                        <div className="flex justify-between items-center">
                            <span>No messages in the inbox</span>
                            <button
                                onClick={closePopup}
                                className="text-xl font-bold text-red-500 hover:text-red-700"
                            >
                                &times; {/* The "X" symbol to close */}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </UsernameProvider>
    );
}
