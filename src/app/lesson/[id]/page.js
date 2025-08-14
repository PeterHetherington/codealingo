import LessonQ from "@/components/LessonQ";
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross1Icon } from "@radix-ui/react-icons";

export default async function IndividualLesson({ params }) {
  const { id } = await params;
  const { userId } = await auth();

  const singleLesson = (
    await db.query(
      `SELECT l.id, l.lesson_name, la.language_name FROM lessons l JOIN units u ON l.unit_id = u.id JOIN languages la ON u.language_id = la.id WHERE l.id = $1`,
      [id]
    )
  ).rows[0];

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

  const readings = (
    await db.query(
      `SELECT lr.content AS reading, pt.name AS rtype
FROM lesson_reading lr
JOIN pre_types pt
ON lr.pre_type =  pt.id
WHERE lr.lesson_id = $1`,
      [id]
    )
  ).rows;

  return (
    <div>
      {/* Modal text the reading section of the lesson */}
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center justify-center rounded-md text-xl px-4 cursor-pointer text-pink-500 bg-gray-500 shadow-md ml-4 mt-2">
          Start the lesson
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
          <Dialog.Content className="fixed bg-gray-700 p-6 rounded-md shadow-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-sm max-h-[80vh] overflow-y-auto z-50">
            <Dialog.Close>
              <div className="flex flex-col items-center justify-between w-full gap-4">
                <Dialog.Title className="text-xl font-bold text-white">
                  Pre-reading
                </Dialog.Title>
                <Dialog.Description className="text-gray-400 text-center">
                  Here are the readings for this lesson.
                </Dialog.Description>
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  {readings.map((reading) => (
                    <div
                      key={reading.lesson_id}
                      className="flex flex-col items-center justify-center p-4 w-full border bg-gray-600 hover:bg-pink-500 rounded-lg shadow-md"
                    >
                      <p className="text-white   text-sm text-center">
                        {reading.reading}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Cross1Icon className="text-white cursor-pointer border-2 border-solid border-white rounded-full" />
                </div>
              </div>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

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
