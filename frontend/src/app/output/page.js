import Image from "next/image";

export default function Output() {
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
                <h1 className="text-5xl font-bold text-center hover:text-green-500 transition duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <main className="flex flex-col items-center justify-center gap-12 w-full max-w-6xl">
                <section className="flex flex-col items-center justify-center w-full gap-6">
                    <h2 className="text-xl font-bold text-center">
                        Encoded Message:
                    </h2>
                    <div className="bg-white text-black p-8 rounded-lg w-full max-w-2xl flex justify-center items-center hover:border-4 hover:border-green-500 transition duration-200">
                        <p className="text-base text-center">
                            Encoded message
                        </p>
                    </div>
                </section>

                <section className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-bold text-center">
                        Wikipedia Page:
                    </h2>
                    <iframe
                        src="https://en.wikipedia.org/wiki/Cryptography"
                        width="800"
                        height="450"
                        style={{ border: 0 }}
                        className="rounded-lg shadow-lg"
                    ></iframe>
                </section>
            </main>
        </div>
    );
}
