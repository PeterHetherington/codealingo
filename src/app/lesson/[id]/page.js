import { db } from "@/utils/utilities";

export default async function IndividualLesson({ params }) {
  const { id } = await params;

  const singleLesson = (
    await db.query(`SELECT * FROM lessons WHERE lesson_id = $1`, [id])
  ).rows[0];
  const prereadings = (
    await db.query(`SELECT * FROM lesson_reading WHERE lesson_id = $1`, [id])
  ).rows;

  const questions = (
    await db.query(`SELECT * FROM questions WHERE lesson_id = $1`, [id])
  ).rows;

  const answers = (
    await db.query(`SELECT * FROM answer_options WHERE question_id = $1`, [id])
  ).rows;

  return (
    <div mode="modal">
      <div className="pre-reading">
        <h3>{singleLesson.name}</h3>
        <h4>Pre-reading</h4>
        <p>
          {prereadings.map((prereading) => (
            <div key={prereading.id}>
              <p>{prereading.content}</p>
            </div>
          ))}
        </p>
      </div>
      <div className="questions">
        <h4>Questions</h4>
        <p>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.question}</p>
            </div>
          ))}
        </p>
      </div>
      <div className="questions">
        <h4>Answers</h4>
        <p>
          {answers.map((answer) => (
            <div key={answer.id}>
              <p>{answer.option}</p>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}
