"use client";

import { useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        email: "",
        famousPerson: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:9000/encrypt", {
            method: "POST",
            body: JSON.stringify({
                plaintext: formData.message,
                dead: formData.famousPerson,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())  // Parse JSON
            .then(data => console.log(data));   // Log response data
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
            }}
        >
            <header className="mb-12">
                <h1 className="text-5xl font-bold text-center hover:text-green-500 duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <form
                onSubmit={handleSubmit}
                className="bg-black/75 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-lg font-semibold mb-2"
                    >
                        Recipient Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full p-3 border border-gray-500 rounded-lg bg-black/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                        value={formData.email}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="famousPerson"
                        className="block text-lg font-semibold mb-2"
                    >
                        Deceased Famous Person:
                    </label>
                    <input
                        id="famousPerson"
                        name="famousPerson"
                        type="text"
                        className="w-full p-3 border border-gray-500 rounded-lg bg-black/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                        value={formData.famousPerson}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="message"
                        className="block text-lg font-semibold mb-2"
                    >
                        Message:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full p-3 border border-gray-500 rounded-lg bg-black/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="5"
                        onChange={handleChange}
                        required
                        value={formData.message}
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
