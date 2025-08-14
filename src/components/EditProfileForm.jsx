import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditProfileForm({ current }) {
  const { userId } = await auth();

  async function UpdateInfo(formData) {
    "use server";
    const { first, last, bio, banner } = Object.fromEntries(formData);

    await db.query(
      `UPDATE users SET first_name = $1, last_name = $2, bio = $3, profile_banner = $4 WHERE clerk_id = $5`,
      [first, last, bio, banner, userId]
    );

    // revalidate the page to fetch new data
    revalidatePath(`/profile`);

    // redirect user
    redirect(`/profile`);
  }

  return (
    <form
      action={UpdateInfo}
      className="flex flex-col p-5 bg-gray-500 h-130 text-white"
    >
      <label htmlFor="first" className="p-1">
        First Name
      </label>
      <input
        name="first"
        id="first"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
        defaultValue={current.first_name}
      ></input>
      <label htmlFor="last" className="p-1 mt-2">
        Last Name
      </label>
      <input
        name="last"
        id="last"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
        defaultValue={current.last_name}
      ></input>
      <label htmlFor="bio" className="p-1 mt-2">
        About me
      </label>
      <textarea
        name="bio"
        id="bio"
        type="text"
        className="bg-black/50 p-2 h-30 rounded-2xl"
        defaultValue={current.bio}
      ></textarea>
      <label htmlFor="banner" className="p-1 mt-2">
        Banner image (image address)
      </label>
      <input
        name="banner"
        id="banner"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
        defaultValue={current.profile_banner}
      ></input>
      <button
        type="submit"
        className="border mt-5 p-3 px-5 justify-center self-center rounded-2xl"
      >
        Save
      </button>
    </form>
  );
}
