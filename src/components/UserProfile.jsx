import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import Image from "next/image";
import { ImCog } from "react-icons/im";
import { Dialog } from "radix-ui";
import { Cross1Icon } from "@radix-ui/react-icons";

export default async function UserProfile({ profile }) {
  const { imageUrl } = await currentUser();
  //   console.log(profile);
  return (
    <>
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
      <div className="flex gap-3 p-2">
        <div>
          <Image
            src={`${imageUrl}`}
            width={100}
            height={100}
            alt="profile picture"
          />
        </div>
        <div>
          <p className="text-2xl">{profile.username}</p>
          <p className="text-gray-500">
            {profile.first_name} {profile.last_name}
          </p>
        </div>
        <div>
          <Dialog.Root>
            <Dialog.Trigger>
              <ImCog className="flex items-center rounded-md p-1 gap-1  text-3xl cursor-pointer" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <Dialog.Content className="fixed bg-gray-700 p-8 rounded-md shadow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <Dialog.Close>
                  <div className="flex space-x-55">
                    <Dialog.Title className="text-2xl text-white">
                      Edit profile
                    </Dialog.Title>
                    <div>
                      <Cross1Icon />
                    </div>
                  </div>
                </Dialog.Close>
                {/* TODO make an edit profile form */}
                {/* <EditProfileForm current={profile} /> */}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <div>
        <p className="p-2 min-h-15">{profile.bio}</p>
      </div>
      <div className="flex w-screen justify-center items-center p-2 bg-gray-500 my-3">
        <h1>Badges</h1>
        {/* TODO display user achievements (can only be done once achievements are made) */}
      </div>
      <div className="flex w-screen justify-center items-center p-2 bg-gray-500">
        <h1>Current courses</h1>
        {/* TODO loop through users courses & display course links */}
      </div>
    </>
  );
}
