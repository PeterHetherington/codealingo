import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Popover } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Languages() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const languages = (
    await db.query(`SELECT * FROM languages ORDER BY language_name`)
  ).rows;

  const subbedLangs = (
    await db.query(
      `SELECT language_id FROM users_languages WHERE user_id = $1
`,
      [userId]
    )
  ).rows;

  // console.log(subbedLangs);

  const subs = subbedLangs.map((lang) => lang.language_id);
  // console.log(subs);

  async function addCourse(formData) {
    "use server";
    const { language_id } = Object.fromEntries(formData);
    const user_id = userId;

    // console.log(language_id);
    // console.log(user_id);

    await db.query(
      `INSERT INTO users_languages(user_id, language_id) VALUES ($1, $2)`,
      [user_id, language_id]
    );

    // revalidate the page to fetch new data
    // revalidatePath(`/lesson/${language_id}`); // need to fix lessons page
    revalidatePath(`/languages`);

    // redirect user
    // redirect(`/lesson/${language_id}`); // need to fix lessons page
    redirect(`/profile`);
  }

  return (
    <div className="flex flex-col justify-center justify-items-center content-center p-3 gap-3 bg-purple-950 text-white">
      <div className="max-w-md self-center">
        <h1 className="p-3 border-b w-full">Available courses</h1>
        <div className="grid grid-cols-3 gap-1 p-3">
          {languages.map((language) =>
            language.active ? (
              <div
                className="flex justify-center content-center bg-white rounded-2xl p-1.5 overflow-hidden"
                key={language.id}
              >
                {/* !! add link to lessons page */}
                <Popover.Root>
                  <Popover.Trigger>
                    <Image
                      className="object-cover aspect-square w-full"
                      src={language.icon}
                      width={250}
                      height={250}
                      alt={language.language_name}
                    />
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content className="PopoverContent" sideOffset={5}>
                      {!subs.includes(language.id) ? (
                        <form
                          action={addCourse}
                          className="flex flex-col p-5 pt-3 bg-gray-500 border-0 rounded-2xl"
                        >
                          <h1 className="text-white">
                            {language.language_name}
                          </h1>
                          <input
                            name="language_id"
                            id="language_id"
                            type="hidden"
                            defaultValue={language.id}
                          ></input>
                          <button
                            type="submit"
                            className="border mt-2 p-3 px-5 justify-center self-center rounded-2xl bg-gray-300"
                          >
                            Join course
                          </button>
                        </form>
                      ) : (
                        <div className="flex flex-col p-5 pt-3 bg-gray-500 border-0 rounded-2xl">
                          <h1 className="text-white">
                            {language.language_name}
                          </h1>
                          <Link
                            href={`/profile`}
                            className="border mt-2 p-3 px-5 justify-center self-center rounded-2xl bg-gray-300"
                          >
                            Go to course
                          </Link>
                        </div>
                      )}
                      <Popover.Close
                        className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center "
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </Popover.Close>
                      <Popover.Arrow className="fill-gray-500" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div className="max-w-md self-center">
        <h1 className="p-3 border-b w-full">Coming soon</h1>
        <div className="grid grid-cols-3 gap-1 p-3">
          {languages.map((language) =>
            !language.active ? (
              <div
                className="flex justify-center content-center bg-white rounded-2xl p-1.5 overflow-hidden"
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
