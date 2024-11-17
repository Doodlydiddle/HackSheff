"use client";

import { useState } from "react";

import Link from "next/link";
import { UsernameProvider } from "@/app/context/UsernameContext";

export default function Home() {
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
    };

    return (
        <UsernameProvider>
            <div className="min-h-screen bg-custom-maze bg-cover bg-center text-white flex flex-col items-center justify-center"
                style={{ fontFamily: "'Courier New', monospace" }}>
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                        CRYPT(GE)OGRAPHY
                    </h1>
                </header>

                <main>
                    <Link href="/input">
                        <button
                            className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200"
                        >
                            Send a message
                        </button>
                    </Link>
                </main>
            </div>
        </UsernameProvider >
    );
}
