import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col p-5 text-center gap-5">
      <h2>This page does not exist</h2>
      <Link href="/" className="bg-pink-700 self-center p-3 rounded-2xl">
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
  );
}
