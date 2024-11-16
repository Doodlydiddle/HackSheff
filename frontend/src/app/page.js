import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <header className="mb-10">
                <h1
                    className="text-4xl font-bold text-center">Crypt(ge)ography
                </h1>

            </header>

            <main>
                <div className="flex flex-col items-center">
                    <label htmlFor="email" className="mb-2 text-sm">
                        Recipient Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-80 p-2 border border-gray-300 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Recipient Email"
                    />
                    <textarea></textarea>
                    <button> SUBMIT </button>
                </div>
            </main>



        </div>
    );
}
