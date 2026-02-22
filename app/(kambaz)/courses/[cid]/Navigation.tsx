"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const links = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
];

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={
            link === "People"
              ? `/courses/${cid}/people/table`
              : `/courses/${cid}/${link.toLowerCase()}`
          }
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border border-0 ${
            pathname.includes(link.toLowerCase()) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
