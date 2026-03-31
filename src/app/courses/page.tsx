import CoursesListingPageClient from "@/components/OurCourses/CoursesListingPageClient";
import { getAllCourses } from "@/sanity/queries";
import "./style.scss";

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <main className="courses-page-main">
      <CoursesListingPageClient courses={courses} />
    </main>
  );
}
