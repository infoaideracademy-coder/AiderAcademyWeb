import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseDetailSidebar from "@/components/CourseDetailComponents/CourseDetailSidebar";
import CourseDetailTabs from "@/components/CourseDetailComponents/CourseDetailTabs";
import { buildCourseMeta } from "@/lib/courseMeta";
import { urlForImage } from "@/sanity/lib/image";
import { getAllCourseSlugs, getCourseBySlug } from "@/sanity/queries";
import "@/components/OurCourses/style.scss";
import "@/components/CourseDetailComponents/style.scss";

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Aider Academy",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = course.seoTitle || course.shortTitle;
  const description = course.seoDescription || course.description;
  const seoImage = course.seoImage || course.image;
  const imageUrl = seoImage
    ? urlForImage(seoImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${title} | Aider Academy`,
    description,
    robots: course.seoNoIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, alt: course.alt }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const meta = buildCourseMeta(course);
  const imageUrl = course.image
    ? urlForImage(course.image).width(1200).height(960).fit("crop").url()
    : null;
  const overlayImageUrl = course.overlayImage
    ? urlForImage(course.overlayImage).width(900).height(960).fit("crop").url()
    : null;

  return (
    <main className="course-detail-page-main">
      <section className="course-detail-hero-section">
        <div className="course-detail-hero-container container">
          <div className="course-detail-hero">
            <div className="course-detail-hero__grid">
              <div className="course-detail-hero__content">
                <span className="course-detail-hero__eyebrow">{course.heroEyebrow}</span>
                <h1 className="course-detail-hero__title">{course.heroTitle}</h1>
                <p className="course-detail-hero__description">{course.heroDescription}</p>

                <div className="course-detail-hero__meta">
                  {meta.map((item) => (
                    <div className="course-detail-hero__meta-item" key={item.label}>
                      <img src={item.icon} alt="" aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="course-detail-hero__fee-pill">{course.feeLabel}</div>
              </div>

              <div className="course-detail-hero__visual">
                <div className="course-detail-hero__shape" />
                <div className="course-detail-hero__image-frame">
                  {imageUrl ? (
                    <img className="course-detail-hero__image" src={imageUrl} alt={course.alt} />
                  ) : (
                    <div className="course-detail-hero__image" aria-hidden="true" />
                  )}
                  {overlayImageUrl ? (
                    <img
                      className="course-detail-hero__image-overlay"
                      src={overlayImageUrl}
                      alt=""
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <div className="course-detail-hero__floating-card">
                  <p className="course-detail-hero__floating-card-label">{course.floatingCardLabel}</p>
                  <p className="course-detail-hero__floating-card-value">{course.floatingCardValue}</p>
                  <p className="course-detail-hero__floating-card-copy">{course.floatingCardCopy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="course-detail-body-section">
        <div className="course-detail-body-container container">
          <div className="course-detail-body-layout">
            <CourseDetailTabs course={course} />
            <CourseDetailSidebar course={course} />
          </div>
        </div>
      </section>
    </main>
  );
}
