import { db } from "@/utils/utilities";

export default async function IndividualLesson({ params }) {
  const { id } = await params;

  const singleLesson = (
    await db.query(`SELECT * FROM lessons WHERE id = $1`, [id])
  ).rows[0];

  console.log(singleLesson);

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
      <h3 className=" text-2xl font-bold text-red-500">
        {" "}
        {singleLesson.lesson_name}
      </h3>

      {/* Mapping through the questions of the lesson  */}
      <div key={questionsAndAnswers.question_id}>
        {questionsAndAnswers.map((questionsAndAnswer) => (
          <div key={questionsAndAnswer.question}>
            <p className="text-indigo-500 ">{questionsAndAnswer.question}</p>

            {/* then selecting the answers specific to that question */}
            <ul className="list-disc pl-6">
              {questionsAndAnswer.answers.map((answer) => (
                <li key={answer.option}>{answer.option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
