"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [inbox, setInbox] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleViewInbox = () => {
        if (inbox.length === 0) {
            setIsPopupVisible(true);
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4"
            style={{
                fontFamily: "'Courier New', monospace",
                backgroundImage: "url('/Vector.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                cursor: "url('/Cursor.svg'), auto", // Custom cursor applied here
            }}
        >
            <header className="mb-12">
                <h1 className="text-5xl font-bold text-center hover:text-green-500 transition duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <main className="flex flex-col items-center justify-center gap-6">
                <Link href="/input">
                    <button className="w-full max-w-md py-4 bg-white text-black font-bold text-xl rounded-lg hover:bg-green-500 hover:text-white transition duration-200">
                        Send a Message
                    </button>
                </Link>

                <button
                    onClick={handleViewInbox}
                    className="w-full max-w-md py-4 bg-white text-black font-bold text-xl rounded-lg hover:bg-green-500 hover:text-white transition duration-200"
                >
                    View Inbox
                </button>
            </main>

            {isPopupVisible && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white p-6 rounded-lg shadow-lg w-full max-w-md z-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">
                            No messages in the inbox
                        </span>
                        <button
                            onClick={closePopup}
                            className="text-2xl font-bold text-red-500 hover:text-red-700 transition duration-200"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
