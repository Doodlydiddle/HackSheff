"use client"

import {useState} from "react";
import {UsernameProvider} from "@/app/context/UsernameContext";
import Cookie from "js-cookie"
import {useRouter} from "next/navigation";

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
            }
        })
        Cookie.set("username", formData.username)
        router.push("/")
    }

    return (
        <UsernameProvider>
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
                 style={{fontFamily: "'Courier New', monospace"}}>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <label htmlFor="username">Username</label>
                        <input id="username"
                               type="text"
                               name="username"
                               value={formData.username}
                               onChange={handleChange}
                               required
                               className="text-black"/>
                    </div>
                    <div className="flex flex-col items-center">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </UsernameProvider>
    );
}
