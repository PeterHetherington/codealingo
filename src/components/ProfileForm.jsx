import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function ProfileForm() {
  const user = await currentUser();
  //   console.log(user);

  async function addUser(formData) {
    "use server";
    const { first, last, bio, banner } = Object.fromEntries(formData);
    const id = user.id;
    const username = user.username;

    await db.query(
      `INSERT INTO users(clerk_id, username, first_name, last_name, bio, profile_banner) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, username, first, last, bio, banner]
    );

    // revalidate the page to fetch new data
    revalidatePath(`/profile`);

    // redirect user
    redirect(`/profile`);
  }

  return (
    <form
      action={addUser}
      className="flex flex-col w-screen p-5 bg-gray-500 h-130"
    >
      <label htmlFor="first" className="p-1">
        First Name
      </label>
      <input
        name="first"
        id="first"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
        required
      ></input>
      <label htmlFor="last" className="p-1 mt-2">
        Last Name
      </label>
      <input
        name="last"
        id="last"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
        required
      ></input>
      <label htmlFor="bio" className="p-1 mt-2">
        About me
      </label>
      <textarea
        name="bio"
        id="bio"
        type="text"
        className="bg-black/50 p-2 h-30 rounded-2xl"
        required
      ></textarea>
      <label htmlFor="banner" className="p-1 mt-2">
        Banner image (image address)
      </label>
      <input
        name="banner"
        id="banner"
        type="text"
        className="bg-black/50 p-2 rounded-2xl"
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
