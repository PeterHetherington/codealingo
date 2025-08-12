import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Languages() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const languages = (
    await db.query(`SELECT * FROM languages ORDER BY language_name`)
  ).rows;
  return (
    <div className="flex flex-col justify-center justify-items-center content-center p-3 gap-3">
      <div className="max-w-md self-center">
        <h1 className="py-2">Available courses</h1>
        <div className="grid grid-cols-3 gap-1">
          {languages.map((language) =>
            language.active ? (
              <div
                className="flex justify-center content-center"
                key={language.id}
              >
                {/* !! add link to lessons page */}
                <Image
                  className="object-cover aspect-square w-full"
                  src={language.icon}
                  width={250}
                  height={250}
                  alt={language.language_name}
                />
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="max-w-md self-center">
        <h1 className="py-2">Coming soon</h1>
        <div className="grid grid-cols-3 gap-1">
          {languages.map((language) =>
            !language.active ? (
              <div
                className="flex justify-center content-center"
                key={language.id}
              >
                <Image
                  className="object-cover aspect-square w-full"
                  src={language.icon}
                  width={250}
                  height={250}
                  alt={language.language_name}
                />
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}
