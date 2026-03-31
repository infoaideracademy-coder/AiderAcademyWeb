import TransitionLink from "@/components/AppShell/TransitionLink";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { buildCourseMeta } from "@/lib/courseMeta";
import CoursesEmptyState from "@/components/OurCourses/CoursesEmptyState";
import { urlForImage } from "@/sanity/lib/image";
import { getHomepageCourses } from "@/sanity/queries";
import "./style.scss";

const OurCourses = async () => {
  const courses = await getHomepageCourses(3);

  return (
    <section className="our-courses-container-main">
      <div className="our-courses-container container">
        <SectionHeading
          eyebrow="Our Courses"
          title="Choose Your Track"
          accent="Track"
          description="Explore programs designed around hands-on learning, modern tools, and outcomes you can prove."
        />

        {courses.length > 0 ? (
          <div className="course-cards-container">
            {courses.map((course) => {
              const courseMeta = buildCourseMeta(course);
              const imageUrl = course.image
                ? urlForImage(course.image).width(800).height(520).fit("crop").url()
                : null;
              const overlayImageUrl = course.overlayImage
                ? urlForImage(course.overlayImage).width(800).height(520).fit("crop").url()
                : null;

              return (
                <article className="course-card-item" key={course._id}>
                  <div className="course-card__image-frame">
                    {imageUrl ? (
                      <img
                        className="course-card__image"
                        src={imageUrl}
                        alt={course.alt}
                      />
                    ) : (
                      <div className="course-card__image course-card__image--placeholder" aria-hidden="true" />
                    )}
                    {overlayImageUrl ? (
                      <img
                        className="course-card__image-overlay"
                        src={overlayImageUrl}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  <div className="course-card__content">
                    <div className="course-card__tag">{course.tag}</div>
                    <h3 className="course-card__title">{course.title}</h3>
                    <p className="course-card__description">{course.description}</p>

                    <div className="course-card__meta">
                      {courseMeta.map((item) => (
                        <div className="course-card__meta-item" key={item.label}>
                          <img src={item.icon} alt="" aria-hidden="true" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <TransitionLink
                      className="primary-button primary-button--primary course-card__cta course-card__cta-link"
                      href={`/courses/${course.slug}`}
                    >
                      Know More
                    </TransitionLink>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <CoursesEmptyState />
        )}
      </div>
    </section>
  );
};

export default OurCourses;
