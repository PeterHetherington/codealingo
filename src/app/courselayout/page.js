//footer dilemma needs fixing as unresponsive to css,will be done asap.dillon//
import "../../styles/courselayout.css";

export default function CoursesPage() {
  const courses = ["unit1", "unit2", "unit3"];

  return (
    <main>
      {courses.map((id) => (
        <section key={id}>
          <h2>{id.replace("unit", "Unit ")}</h2>
          <ul>
            {[...Array(4)].map((_, idx) => (
              <li key={idx}>placeholder</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
