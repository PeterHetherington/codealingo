import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import Image from "next/image";
import { ImCog } from "react-icons/im";
import { Dialog } from "radix-ui";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditProfileForm from "./EditProfileForm";

export default async function UserProfile({ profile }) {
  const { id, imageUrl } = await currentUser();

  const langs = (
    await db.query(
      `SELECT l.id, l.language_name AS name, l.icon
      FROM languages l
      JOIN users_languages ul
      ON l.id = ul.language_id
      WHERE ul.user_id = $1`,
      [id]
    )
  ).rows;

  return (
    <>
      {/* profile banner section */}
      <div className="flex w-screen h-50">
        {profile.profile_banner ? (
          <Image
            className="object-cover aspect-video w-full"
            src={profile.profile_banner}
            width={1000}
            height={1000}
            alt="profile banner"
          />
        ) : (
          <Image
            className="object-cover aspect-video w-full"
            src="/bannerFallback.jpg"
            width={1000}
            height={1000}
            alt="profile banner"
          />
        )}
      </div>
      {/* profile picture */}
      <div className="flex gap-3 p-2">
        <div>
          <Image
            src={`${imageUrl}`}
            width={100}
            height={100}
            alt="profile picture"
            className="rounded-2xl"
          />
        </div>
        {/* user information */}
        <div>
          <p className="text-2xl">{profile.username}</p>
          <p className="text-gray-500">
            {profile.first_name} {profile.last_name}
          </p>
        </div>
        {/* dialog containing edit profile form */}
        <div>
          <Dialog.Root>
            <Dialog.Trigger>
              <ImCog className="flex items-center rounded-md p-1 gap-1  text-3xl cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <Dialog.Content className="fixed bg-gray-700 p-8 rounded-md shadow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <Dialog.Close>
                  <div className="flex items-center justify-between w-80 px-3 pb-3">
                    <Dialog.Title className=" text-xl text-white">
                      Edit profile
                    </Dialog.Title>
                    <div className="">
                      <Cross1Icon />
                    </div>
                  </div>
                </Dialog.Close>
                <EditProfileForm current={profile} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <div>
        <p className="p-2 min-h-15">{profile.bio}</p>
      </div>
      {/* badges section */}
      <div className="flex flex-col w-screen justify-center items-center p-2 bg-gray-500 my-1 text-white">
        <h1 className="text-center p-3 pt-1 border-b w-full text-l font-semibold">
          Badges
        </h1>
        {/* TODO display user achievements (can only be done once achievements are made) */}
        <div>
          <p className="p-3">Complete more lessons to earn some badges</p>
          <div className="flex flex-col p-3 pt-1 text-center gap-4">
            <Image
              src="/owl-wings-raised-icon.png"
              width={100}
              height={100}
              alt="Codealingo logo"
              className="self-center"
            />
          </div>
        </div>
      </div>
      {/* users current courses */}
      <div className="flex flex-col w-screen justify-center items-center p-2 bg-gray-500 text-white">
        <h1 className="text-center p-3 pt-1 border-b w-full text-l font-semibold">
          Current courses
        </h1>
        <div className="flex flex-row gap-1 p-3">
          {langs.map((lang) => (
            <div
              className="flex justify-center content-center border-2 border-gray-400 rounded-2xl p-1 bg-gray-400"
              key={lang.id}
            >
              <Link href={`/course/${lang.name}`}>
                <Image
                  className="object-cover aspect-square w-full"
                  src={lang.icon}
                  width={100}
                  height={100}
                  alt={lang.name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
