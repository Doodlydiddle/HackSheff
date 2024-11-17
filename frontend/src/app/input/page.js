"use client"

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
        const ciphertext = (await response.json())["Cipher-return"];
        console.log(ciphertext);

        const response2 = await fetch("http://127.0.0.1:9000/send", {
            method: "POST",
            body: JSON.stringify({
                username: formData.email,
                message: ciphertext
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center" style={{ fontFamily: "'Courier New', monospace" }}>
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center gap-4">
                    <label htmlFor="email" className="text-sm">
                        Recipient Email:
                    </label>
                    <input
                        id="email"
                        name="email"  // Add name attribute here
                        className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                        value={formData.email}
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="famousPerson" className="mb-2 text-sm">
                        Deceased Famous Person:
                    </label>
                    <input
                        type="text"
                        id="famousPerson"
                        name="famousPerson"  // Add name attribute here
                        className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                        value={formData.famousPerson}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="message" className="mb-2 text-sm">
                        Message:
                    </label>
                    <textarea
                        id="message"
                        name="message"  // Add name attribute here
                        className="w-80 h-32 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                        value={formData.message}
                    ></textarea>
                </div>

                <div className="flex justify-center w-full mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
