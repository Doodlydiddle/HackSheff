import Image from "next/image";

export default function Output() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header>
                <h1>
                    Crypt(ge)ography
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

                {/* Image Display */}
                <section className="flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-4">Image:</h2>
                    <Image
                        src="C:\Users\mlang\OneDrive\Pictures\Screenshots\Screenshot 2024-03-19 024754.png"
                        alt="Example Image"
                        width={400}
                        height={300}
                        />
                </section>


                {/* Embedded Wikipedia Page */}
                <section className="mt-8">
                    <h2 className="text-lg font-bold">Wikipedia Page:</h2>
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







