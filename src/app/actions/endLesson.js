"use server";

import { redirect } from "next/navigation";
import { db } from "@/utils/utilities";

export async function endLesson(formData) {
  const { user, lesson, course } = Object.fromEntries(formData);

  await db.query(
    `INSERT INTO user_progress(user_id, lesson_id) VALUES ($1, $2)`,
    [user, lesson]
  );

  // redirect user back to course page
  redirect(`/course/${course}`);
}
