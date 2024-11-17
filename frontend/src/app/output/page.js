"use client";

import { UsernameProvider } from "@/app/context/UsernameContext";

export default function Output() {
    return (
        <UsernameProvider>
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
                style={{ fontFamily: "'Courier New', monospace" }}>
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                        CRYPT(GE)OGRAPHY
                    </h1>
                </header>

                <main className="flex flex-col items-center justify-center">
                    <section className="flex flex-col items-center justify-center mb-8 w-full max-w-4xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Encoded Message:</h2>
                        <div className="bg-white text-black p-8 rounded-lg max-w-xl w-full flex justify-center items-center hover:border-4 hover:border-green-500">
                            <p className="text-sm text-center">
                                Encoded message
                            </p>
                        </div>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold mb-2">Wikipedia Page:</h2>
                        <iframe
                            src="https://en.wikipedia.org/wiki/Cryptography"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            className="rounded-lg"
                        ></iframe>
                    </section>
                </main>

                <main>
                    <section className="text-center">
                        <h2 className="text-lg font-bold mb-2">Encoded Message:</h2>
                        <p className="text-sm">
                            Encoded message
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg font-bold mb-2">Wikipedia Page:</h2>
                        <iframe
                            src="https://en.wikipedia.org/wiki/Cryptography"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                        ></iframe>
                    </section>
                </main>
            </div>
        </UsernameProvider>
    );
}
