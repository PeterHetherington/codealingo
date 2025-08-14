import { db } from "@/utils/utilities";

export default async function IndividualLesson({ params }) {
  const { id } = await params;

  // fetching all readings for a single lesson

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
  console.log(readings);

  return (
    <div mode="modal">
      {/* Mapping through the readings of the lesson  */}
      <div
        key={readings.reaid}
        className="flex flex-col items-center justify-center"
      >
        {readings.map((reading) => (
          <div
            key={readings.lesson_id}
            className="flex  flex-col items-center justify-center p-4 m-2 border bg-gray-600 bg-gray-600, hover:bg-purple-400 rounded-lg shadow-md w-240 h-30"
          >
            <p className="text-indigo-500 flex  flex-col items-center justify-center">
              {reading.reading}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
