import type { CourseCard, CourseDetail } from "@/sanity/types";

const imgModulesIcon =
  "https://www.figma.com/api/mcp/asset/785f4460-3400-4038-94ea-51f8ffdc3291";
const imgDurationIcon =
  "https://www.figma.com/api/mcp/asset/f32565a6-9f24-4f82-a03d-3660fd91ff67";
const imgCertificateIcon =
  "https://www.figma.com/api/mcp/asset/5a8cc306-2c87-4492-83df-006c6bb0376b";

type CourseMetaSource = Pick<CourseCard | CourseDetail, "modulesCount" | "duration" | "certificateLabel">;

export const buildCourseMeta = (course: CourseMetaSource) => [
  { icon: imgModulesIcon, label: `${course.modulesCount} Modules` },
  { icon: imgDurationIcon, label: course.duration },
  { icon: imgCertificateIcon, label: course.certificateLabel },
];
