// client used because the navbar should be server side for less loading. clerk buttons need client to function

"use client";

import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

export default function AuthButtons() {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn">Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="btn">Sign Up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        {user && <Link href={`/users/${user.id}`}>Account</Link>}
        <SignOutButton>
          <button className="btn">Sign Out</button>
        </SignOutButton>
        <UserButton />
      </SignedIn>
    </>
  );
}
