import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center" style={{ fontFamily: "'Courier New', monospace" }}>
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <main>
                <Link href="/input">
                        <button
                            className="px-6 py-2 bg-white text-black font-bold hover:bg-green-500 hover:text-white transition duration-200"
                        >
                            Send a message
                        </button>
                </Link>
            </main>
        </div>
    );
}
