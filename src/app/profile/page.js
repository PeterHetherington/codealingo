import ProfileForm from "@/components/ProfileForm";
import UserProfile from "@/components/UserProfile";
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const res = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    userId,
  ]);

  const userProfile = res.rows[0];

  if (!userProfile) {
    return (
      <div className="bg-purple-950 h-screen text-white">
        <div>
          <p className="p-5 text-center">
            Before you can continue using our site you must finish setting up
            your profile
          </p>
        </div>
        <ProfileForm />
      </div>
    );
  }

  return (
    <div className="bg-purple-950 h-screen text-white">
      <UserProfile profile={userProfile} />
    </div>
  );
}
