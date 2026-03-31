import "./style.scss";

export default function ContactMapSection() {
  return (
    <section className="contact-map-main">
      <div className="contact-map-container container">
        <div className="contact-map__heading">
          <h2 className="contact-map__title">
            Visit <span>Us</span>
          </h2>
        </div>

        <div className="contact-map__frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62584.09885817415!2d75.74831873111818!3d11.26105345719842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563a4157%3A0x730d1c3006b537f5!2sCalicut%2C%20Kerala!5e0!3m2!1sen!2sin!4v1711812345678!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aider Academy Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
