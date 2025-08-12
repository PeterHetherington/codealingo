import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function UserForm() {
  const { userId } = await auth();

  const user = await currentUser();

  if (!user) {
    throw new Error("User not authernticated");
  }

  const username = user.username;

  // Server action for handling form submission
  async function userInfoSubmit(formData) {
    "use server";

    const { first_name, last_name, bio, profile_banner } =
      Object.fromEntries(formData);

    await db.query(
      `INSERT INTO users (clerk_id, username, first_name, last_name, bio, profile_banner) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, username, first_name, last_name, bio, profile_banner]
    );

    redirect("/[id]/page.js"); // May need to be changed
  }

  return (
    <div>
      <h1>Create Your Profile</h1>
      <form action={userInfoSubmit} method="POST">
        {/* <label>
          Username:
          <input type="text" name="username" required className=" mb-1" />
        </label> Not required as this will be done through clerk and the user should not have access to edit this*/}
        <label>
          First Name:
          <input type="text" name="first_name" className=" mb-1" />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" className=" mb-1" />
        </label>
        <label>
          Bio:
          <textarea maxLength={300} name="bio" className=" mb-1" />
        </label>
        <label>
          Profile Banner URL:
          <input type="url" name="profile_banner" className=" mb-1" />
        </label>
      </form>

      <button type="submit" className=" border-2">
        Create Profile
      </button>
    </div>
  );
}
