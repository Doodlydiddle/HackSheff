import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center" style={{ fontFamily: "'Courier New', monospace" }}>
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center hover:text-green-500 duration-300">
                    CRYPT(GE)OGRAPHY
                </h1>
            </header>

            <main>
                <div className="flex flex-col items-center gap-4">
                    <label htmlFor="email" className="text-sm">
                        Recipient Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="famousPerson" className="mb-2 text-sm">
                        Deceased Famous Person:
                    </label>
                    <input
                        type="text"
                        id="famousPerson"
                        className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="message" className="mb-2 text-sm">
                        Message:
                    </label>
                    <textarea
                        id="message"
                        className="w-80 h-32 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            </main>
        </div>
    );
}
