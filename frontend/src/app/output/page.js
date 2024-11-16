import Image from "next/image";

export default function Output() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center" style={{ fontFamily: "'Courier New', monospace" }}>
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

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
    );
}
