import Image from "next/image";

export default function Output() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <header className="mb-10">
                <h1
                    className="text-4xl font-bold text-center">Crypt(ge)ography
                </h1>
            </header>

            <main>
                {/* Encoded Message */}
                <section className="text-center">
                    <h2 className="text-lg font-bold">Encoded Message:</h2>
                    <p>
                        {/* Replace with your encoded message */}
                        Example
                    </p>
                </section>


                {/* Embedded Wikipedia Page */}
                <section className="mt-8">
                    <h2 className="text-lg font-bold">Wikipedia Page:</h2>
                    <iframe
                        src="https://en.wikipedia.org/wiki/Cryptography"
                        width="600"
                        height="450"
                        style={{border: 0}}
                    ></iframe>
                </section>
            </main>
        </div>
    );
}







