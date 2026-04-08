import type { CourseCard, CourseDetail } from "@/sanity/types";

const imgModulesIcon = "/images/icons/f-3.png";
const imgDurationIcon = "/images/icons/calendar.png";
const imgCertificateIcon = "/images/icons/f-1.png";

type CourseMetaSource = Pick<CourseCard | CourseDetail, "modulesCount" | "duration" | "certificateLabel">;

export const buildCourseMeta = (course: CourseMetaSource) => [
  { icon: imgModulesIcon, label: `${course.modulesCount} Modules` },
  { icon: imgDurationIcon, label: course.duration },
  { icon: imgCertificateIcon, label: course.certificateLabel },
];
