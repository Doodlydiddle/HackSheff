"use client";

import { UsernameProvider } from "@/app/context/UsernameContext";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Output() {
    const router = useRouter();

    // Redirect to login page if no username exists
    if (!Cookie.get("username")) {
        // router.push("/login");
    }

    // Redirect to home page if no ciphertext exists
    if (!Cookie.get("ciphertext")) {
        // router.push("/")
    }

    const ciphertext = Cookie.get("ciphertext");

    async function onDecrypt() {
        const response = await fetch("http://127.0.1:9000/decrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ciphertext: ciphertext,
                dead: document.getElementById("dead").value
            }),
        })

        const data = await response.json();
        document.getElementById("message").innerText = data["Plain-return"];
        document.getElementById("wikipage").src = data["Wiki-page"];
    }

    return (
        <UsernameProvider>
            <div className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center"
                 style={{
                     fontFamily: "'Courier New', monospace",
                     backgroundImage: "url('/Vector.svg')",  // Add background image
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     backgroundRepeat: "no-repeat",
                     cursor: "url('/Cursor.svg'), auto",  // Custom cursor
                 }}>
                <header className="w-full flex justify-start px-4 mb-10">
                    {/* Home Button */}
                    <button
                        onClick={() => router.push("/")}
                        className="text-white bg-transparent border border-white py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition duration-300"
                    >
                        Home
                    </button>
                </header>

                <main className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-center mb-8 hover:text-green-500 transition duration-300">
                        CRYPT(GE)OGRAPHY
                    </h1>

                    <section className="flex flex-col items-center justify-center mb-8 w-full max-w-4xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Encrypted Message:</h2>
                        {/* Larger Box with black background, 0.8 opacity, and white border */}
                        <div className="bg-black bg-opacity-80 text-white p-8 w-96 flex justify-center items-center rounded-lg border-2 border-white hover:border-green-500 transition duration-300">
                            <p id="message" className="text-base text-center">
                                {ciphertext}
                            </p>
                        </div>

                        {/* Updated label */}
                        <label htmlFor="dead" className="mt-4 mb-2 text-lg font-bold">Famous Dead Person:</label>
                        <input
                            id="dead"
                            name="dead"
                            type="text"
                            className="w-80 p-2 border border-gray-300 bg-black bg-opacity-80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                        />

                        {/* Decrypt Button with transparent background and green border on hover */}
                        <button
                            className="text-white bg-transparent border border-white py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white transition duration-300 mb-4"
                            onClick={onDecrypt}
                        >
                            Decrypt
                        </button>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold mb-4">Wikipedia Page:</h2>
                        <iframe
                            id="wikipage"
                            src="https://en.wikipedia.org/wiki/Cryptography"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            className="rounded-lg"
                        ></iframe>
                    </section>
                </main>
            </div>
        </UsernameProvider>
    );
}
