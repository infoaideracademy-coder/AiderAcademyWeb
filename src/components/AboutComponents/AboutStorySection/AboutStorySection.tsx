import "./style.scss";

const imgStory = "/images/our-story.png";

export default function AboutStorySection() {
  return (
    <section className="about-story-section-main">
      <div className="about-story-section-container container">
        <div className="about-story-section__content">
          <div className="about-story-section__eyebrow">Our Story</div>

          <div className="about-story-section__copy">
            <h2 className="about-story-section__title">
              <span className="about-story-section__title-text">
                What Aider{" "}
              </span>
              <span className="about-story-section__title-accent">
                Stands For
              </span>
            </h2>

            <p className="about-story-section__description">
              Aider Academy was built with one clear goal: help people learn
              skills that actually work in the real world. We noticed a common
              problem. Many students and beginners complete courses, but still
              lack confidence because they haven&apos;t practiced enough on real
              tasks. That&apos;s why we designed training that starts with strong
              fundamentals and quickly moves into hands-on assignments and
              guided projects. With mentor support throughout, learners
              don&apos;t just “finish a course” they build capability, clarity,
              and a portfolio they can stand behind.
            </p>
          </div>
        </div>

        <div className="about-story-section__media">
          <div className="about-story-section__image-frame">
            <img
              className="about-story-section__image"
              src={imgStory}
              alt="Learner working on a creative design setup with dual screens"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
