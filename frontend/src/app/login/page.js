"use client";

import { useState } from "react";
import { UsernameProvider } from "@/app/context/UsernameContext";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
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
        const response = await fetch("http://127.0.0.1:9000/connect", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        Cookie.set("username", formData.username);
        router.push("/");
    };

    return (
        <UsernameProvider>
            <div
                className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
                style={{ fontFamily: "'Courier New', monospace" }}
            >
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="flex items-center mb-4">
                        <label
                            htmlFor="username"
                            className="text-lg font-bold mr-2"
                        >
                            Username:
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="text-white bg-transparent border border-white py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </UsernameProvider>
    );
}
