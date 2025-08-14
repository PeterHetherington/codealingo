import LessonQ from "@/components/LessonQ";
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";

export default async function IndividualLesson({ params }) {
  const { id } = await params;
  const { userId } = await auth();

  const singleLesson = (
    await db.query(
      `SELECT l.id, l.lesson_name, la.language_name FROM lessons l JOIN units u ON l.unit_id = u.id JOIN languages la ON u.language_id = la.id WHERE l.id = $1`,
      [id]
    )
  ).rows[0];

  // console.log(singleLesson);

  // fetching all questions and answers for a single lesson

  const questionsAndAnswers = (
    await db.query(
      `SELECT 
    q.question, 
    qt.name AS qtype, 
    (
        SELECT json_agg(
            json_build_object(
                'option', a.option, 
                'is_answer', a.is_answer
            )
        )
        FROM answer_options a 
        WHERE a.question_id = q.id
    ) AS answers 
FROM questions q 
JOIN types qt ON q.type = qt.id
WHERE q.lesson_id = $1
GROUP BY q.question, qt.name, q.id`,
      [id]
    )
  ).rows;
  console.log(questionsAndAnswers);

  return (
    <div mode="modal">
      {/* the title of the lesson */}
      <LessonQ
        singleLesson={singleLesson}
        questionsAndAnswers={questionsAndAnswers}
        lesson_id={id}
        user_id={userId}
      />
    </div>
  );
}
