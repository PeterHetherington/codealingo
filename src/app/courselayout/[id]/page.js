import Link from "next/link";
import { db } from "@/utils/utilities";

// duo code with eb

export default async function CourseLayoutPage({ params }) {
  // fetching all units per language and display lesson
  // const slug = slugify(units.unit_name)
  const { id } = await params;
  const unitsPerLanguage = (
    await db.query(
      `SELECT units.unit_name,
ARRAY_AGG(
  JSON_BUILD_OBJECT(
    'id', lessons.id,
    'name', lessons.lesson_name
  )
) AS thelessons
FROM units
JOIN lessons ON units.id = lessons.unit_id
JOIN languages ON units.language_id = languages.id
WHERE languages.id = $1
GROUP BY units.id, units.unit_name
ORDER BY units.id
`,
      [id]
    )
  ).rows;

  return (
    <>
      {unitsPerLanguage.map((unitsPerLanguage) => (
        <div key={unitsPerLanguage.unit_name}>
          <h3 className="font-bold">{unitsPerLanguage.unit_name}</h3>
          {unitsPerLanguage.thelessons.map((lesson) => (
            <p key={lesson.id}>
              <Link href={`/lessons/${lesson.id}`}>{lesson.name}</Link>
            </p>
          ))}
        </div>
      ))}
    </>
  );
}
