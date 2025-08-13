import Link from "next/link";
import { db } from "@/utils/utilities";

export default async function CourseLayoutPage({}) {
  // fetching all lessons and group them by unit
  const lessonsPerUnits = (
    await db.query(`SELECT unit_name, ARRAY_AGG(lesson_name) AS thelessons
FROM units
JOIN lessons ON units.id = lessons.unit_id  
GROUP BY units.id`)
  ).rows;
  console.log(lessonsPerUnits);

  return (
    <>
      {lessonsPerUnits.map((lessonsPerUnit) => (
        <div key={lessonsPerUnit.lesson_id}>
          <h3 className="flex font-bold ">{lessonsPerUnit.unit_name}</h3>
          {lessonsPerUnit.thelessons.map((lesson) => (
            <p>
              {" "}
              <Link href={`/lessons/${lesson.id}`}> {lesson} </Link>
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
