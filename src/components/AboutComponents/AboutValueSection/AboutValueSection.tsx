import "./style.scss";

type AboutValueSectionProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export default function AboutValueSection({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  reverse = false,
}: AboutValueSectionProps) {
  const accentIndex = title.indexOf(accent);
  const beforeAccent = accentIndex >= 0 ? title.slice(0, accentIndex) : title;
  const afterAccent =
    accentIndex >= 0 ? title.slice(accentIndex + accent.length) : "";

  return (
    <section className="about-value-section-main">
      <div
        className={`about-value-section-container container ${
          reverse ? "about-value-section-container--reverse" : ""
        }`.trim()}
      >
        <div className="about-value-section__content">
          <div className="about-value-section__eyebrow">{eyebrow}</div>

          <div className="about-value-section__copy">
            <h2 className="about-value-section__title">
              <span className="about-value-section__title-text">
                {beforeAccent}
              </span>
              <span className="about-value-section__title-accent">{accent}</span>
              <span className="about-value-section__title-text">{afterAccent}</span>
            </h2>

            <p className="about-value-section__description">{description}</p>
          </div>
        </div>

        <div className="about-value-section__media">
          <div className="about-value-section__image-frame">
            <img className="about-value-section__image" src={image} alt={imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
