import { getPartnersSection } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";
import "./style.scss";

export default async function AboutLogoScrollSection() {
  const partners = await getPartnersSection();
  const logos = partners?.logos || [];

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="about-logo-scroll-section-main">
      <div className="about-logo-scroll-section-header">
        <div className="about-logo-scroll-section-header__container container">
          <h2 className="about-logo-scroll-section__title">
            <span className="about-logo-scroll-section__title-text">
              Certifications &amp;{" "}
            </span>
            <span className="about-logo-scroll-section__title-accent">
              Accreditations
            </span>
          </h2>
          <p className="about-logo-scroll-section__description">
            Recognitions that support our standards, curriculum structure, and
            training credibility.
          </p>
        </div>
      </div>

      <div className="about-logo-scroll-section-track-wrap">
        <div className="about-logo-scroll-section-track">
          {[...logos, ...logos].map((item, index) => (
            <div
              className="about-logo-scroll-section-item"
              key={`${item._key}-${index}`}
            >
              <img
                src={urlForImage(item.logo).url()}
                alt={item.logo.alt || item.name || "Partner Logo"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
