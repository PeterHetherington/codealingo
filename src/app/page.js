import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import Image from "next/image";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";

const quickSand = Quicksand({
  variable: "--font-Quicksand",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="home-container bg-purple-950 overflow-hidden">
      {/* <NavBar /> */}

      <main className="home-content">
        <div>
          <h1
            className={`${quickSand.className} text-white text-5xl font-black p-5 m-10`}
          >
            Codealingo
          </h1>
        </div>
        <div className="flex flex-col p-5 text-center gap-4">
          <Image
            src="/codealingo-icon.png"
            width={200}
            height={200}
            alt="Codealingo logo"
            className="self-center"
          />
        </div>
        <div className="py-3 font-semibold text-gray-400">
          <p>Unlock the next level of learning</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
