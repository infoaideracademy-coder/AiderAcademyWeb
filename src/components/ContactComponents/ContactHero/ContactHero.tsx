import "./style.scss";

const imgHero = "/images/contact-hero-image.png";

export default function ContactHero() {
  return (
    <section className="contact-hero-main">
      <div className="contact-hero-container container">
        <div className="contact-hero-card">
          <img
            className="contact-hero-card__image"
            src={imgHero}
            alt="A student learning with a laptop in the library"
          />
          <div className="contact-hero-card__overlay" aria-hidden="true" />

          <div className="contact-hero-card__content">
            <div className="contact-hero-card__eyebrow">Contact Aider</div>
            <h1 className="contact-hero-card__title">Let&apos;s Get You Started</h1>
            <p className="contact-hero-card__description">
              Enquire now and get complete course information with guidance on what
              to choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
