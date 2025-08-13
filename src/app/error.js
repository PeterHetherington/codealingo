"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <html>
      <body>
        <div className="flex flex-col p-5 text-center gap-4">
          <h2>Sorry, something went wrong</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            className="p-3 border rounded-2xl self-center"
          >
            Try again
          </button>
          <p>Or</p>
          <Link href="/" className="p-3 bg-pink-700 rounded-2xl self-center">
            Go home
          </Link>
          <Image
            src="/codealingo-icon.png"
            width={250}
            height={250}
            alt="Codealingo logo"
            className="self-center"
          />
        </div>
      </body>
    </html>
  );
}
