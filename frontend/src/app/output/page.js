"use client";

import { UsernameProvider } from "@/app/context/UsernameContext";
import Cookie from "js-cookie";
import {useRouter} from "next/navigation";

export default function Output() {
    const router = useRouter();

    if (!Cookie.get("username")) {
        router.push("/login");
    }

    if (!Cookie.get("ciphertext")) {
        router.push("/")
    }

    const ciphertext = Cookie.get("ciphertext");

    async function onDecrypt() {
        const response = await fetch("http://127.0.0.1:9000/decrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ciphertext: ciphertext,
                dead: document.getElementById("dead").value
            }),
        })

        const data = (await response.json())["Plain-return"];
        console.log(data)
        document.getElementById("message").innerText = data;
    }

    return (
        <UsernameProvider>
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
                 style={{fontFamily: "'Courier New', monospace"}}>
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                        CRYPT(GE)OGRAPHY
                    </h1>
                </header>

                <button
                    onClick={() => router.push("/")}  // Redirect to home page
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
                >
                    Home
                </button>

                <main className="flex flex-col items-center justify-center">
                    <section className="flex flex-col items-center justify-center mb-8 w-full max-w-4xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Message:</h2>
                        <div className="bg-white text-black p-8 rounded-lg max-w-xl w-full flex justify-center items-center hover:border-4 hover:border-green-500">
                            <p id="message" className="text-sm text-center">
                                {ciphertext}
                            </p>
                        </div>
                        <label htmlFor="dead">Famous Dead Person</label>
                        <input id="dead"
                               name="dead"
                               type="text"
                               className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                        <button className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200 mb-4"
                                onClick={onDecrypt}>Decrypt
                        </button>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold mb-2">Wikipedia Page:</h2>
                        <iframe
                            src="https://en.wikipedia.org/wiki/Cryptography"
                            width="600"
                            height="450"
                            style={{border: 0}}
                            className="rounded-lg"
                        ></iframe>
                    </section>
                </main>
            </div>
        </UsernameProvider>
    );
}
