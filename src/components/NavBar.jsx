import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Non dynamic links rendered server side */}
      <Link href="/">Home</Link>
      <Link href="/about">Lessons</Link>
      <AuthButtons />
    </nav>
  );
}
