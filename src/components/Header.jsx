import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { LuNewspaper } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navigation() {
  return (
    <header className="fixed w-full flex items-center p-6 gap-4 h-18 bg-black text-white z-50">
      <div className="flex">
        <nav className="flex gap-4 text-3xl text-white">
          <Link href="/">
            <GoHomeFill />
          </Link>
          <Link href="/profile">
            <MdAccountBox />
          </Link>
          <Link href="/languages">
            <FaCode />
          </Link>
        </nav>
      </div>
      <div className="flex justify-end w-full gap-4 text-white">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-pink-600 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
