import "./style.scss";

const imgGridPrimary =
  "https://www.figma.com/api/mcp/asset/b123955b-0eef-4bca-bfc5-fd0c2c3ef016";
const imgGridSecondary =
  "https://www.figma.com/api/mcp/asset/7c8b5caa-7195-469b-9855-9deddc13e80e";
const imgFlower =
  "https://www.figma.com/api/mcp/asset/e85bcd6e-bba5-4953-8ff5-3d030ae5c2df";
const imgTriangle =
  "https://www.figma.com/api/mcp/asset/e0e6be40-ed77-4c7e-b5c6-23a2a6f2fe04";
const imgHero =
  "https://www.figma.com/api/mcp/asset/f72dbfde-41a5-49e1-99bd-4dd4280cb43c";

export default function AboutHero() {
  return (
    <section className="about-hero-container-main">
      <div className="about-hero-grid-bg" aria-hidden="true">
        <div className="about-hero-grid-bg__row">
          <img src={imgGridPrimary} alt="" />
          <img src={imgGridPrimary} alt="" />
          <img src={imgGridPrimary} alt="" />
        </div>
        <div className="about-hero-grid-bg__row">
          <img src={imgGridSecondary} alt="" />
          <img src={imgGridSecondary} alt="" />
          <img src={imgGridSecondary} alt="" />
        </div>
      </div>

      <div className="about-hero-top">
        <div className="about-hero-container container">
          <div className="about-hero-copy">
            <div className="about-hero-copy__triangle">
              <img src={imgTriangle} alt="" aria-hidden="true" />
            </div>

            <h1 className="about-hero-copy__title">
              <span className="about-hero-copy__title-line">
                <span className="about-hero-copy__title-black">
                  Built to Turn
                </span>{" "}
                <span className="about-hero-copy__title-accent">Learning</span>
              </span>{" "}
              <span className="about-hero-copy__title-line">
                <span className="about-hero-copy__title-black">into</span>{" "}
                <span className="about-hero-copy__title-accent">Capability</span>
              </span>
            </h1>

            <div className="about-hero-copy__flower">
              <img src={imgFlower} alt="" aria-hidden="true" />
            </div>
          </div>

          <div className="about-hero-actions">
            <p className="about-hero-actions__description">
              Aider Academy is a CTDS certified institute focused on practical
              training, real project work, and career-ready outcomes.
            </p>

            <div className="about-hero-actions__buttons">
              <button
                className="about-hero-actions__button about-hero-actions__button--primary"
                type="button"
              >
                Explore Courses
              </button>
              <button
                className="about-hero-actions__button about-hero-actions__button--secondary"
                type="button"
              >
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="about-hero-image-wrap">
        <img
          className="about-hero-image"
          src={imgHero}
          alt="Students collaborating during a practical computer-based session"
        />
      </div>
    </section>
  );
}
