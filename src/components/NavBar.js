import Link from "next/link";

export default function NavBar() {
  const userId = "123"; //we will/can change uid to required uid when needed,this is a placeholder right now as uncertain of id assign method. Dillon//
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/about">Lessons</Link>
      <Link href={`/users/${userId}`} className="account-link">
        Account
      </Link>
    </nav>
  );
}
