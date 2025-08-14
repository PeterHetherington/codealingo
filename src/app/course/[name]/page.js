import { db } from "@/utils/utilities";
import Image from "next/image";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import { Quicksand } from "next/font/google";
import { notFound } from "next/navigation";

const quickSand = Quicksand({
  variable: "--font-Quicksand",
  subsets: ["latin"],
});

export default async function Course({ params }) {
  const slug = await params;

  const res = (
    await db.query(
      `SELECT u.id, u.unit_name, ARRAY_AGG(L.id) AS lesson_id FROM units u
        JOIN languages la 
        ON u.language_id = la.id
        JOIN lessons l
        ON u.id = l.unit_id
        WHERE la.language_name = $1
        GROUP BY u.id, u.unit_name`,
      [slug.name]
    )
  ).rows;

  if (res.length === 0) {
    notFound();
  }

  return (
    <div className="bg-purple-950 h-screen text-white flex flex-col items-center p-5">
      <div>
        <h1
          className={`${quickSand.className} text-white text-4xl font-black p-5`}
        >
          {slug.name}
        </h1>
      </div>
      <div className="bg-purple-950 w-screen">
        {res.map((unit) => (
          <div key={unit.id} className="p-3">
            <h1 className="p-5 border-t border-black/60 bg-black/30">
              {unit.unit_name}
            </h1>
            {unit.lesson_id.map((id, index) => (
              <div
                key={id}
                className={`justify-self-center w-35 p-1 m-2 flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Link href={`/lesson/${id}`} className="">
                  <FaCircle className="text-6xl" />
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Image
        src="/codealingo-icon.png"
        width={50}
        height={50}
        alt="Codealingo logo"
        className="absolute left-10 top-80 z-1"
      />
      <Image
        src="/owl-front-icon.png"
        width={50}
        height={50}
        alt="Codealingo logo"
        className="absolute right-10 top-265 z-1"
      />
      <Image
        src="/owl-wings-raised-icon.png"
        width={90}
        height={90}
        alt="Codealingo logo"
        className="absolute left-9 top-365 z-1"
      />
    </div>
  );
}
