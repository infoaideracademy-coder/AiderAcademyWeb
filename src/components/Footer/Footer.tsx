import React from "react";
import TransitionLink from "@/components/AppShell/TransitionLink";
import "./style.scss";

const imgLogo =
  "/images/aider-academy-logo.png";
const imgFacebook = "/images/icons/fb.svg";
const imgInstagram = "/images/icons/insta.svg";
const imgLinkedIn = "/images/icons/linkedin.svg";
const imgWhatsApp = "/images/icons/wp.svg";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
const courseLinks = [
  { label: "Graphic Design", href: "/courses" },
  { label: "Digital Marketing", href: "/courses" },
  { label: "Web Development", href: "/courses" },
];
const contactItems = [
  "support@example.com",
  "+91 99999 99999",
  "Nadakkavu, Calicut",
];

const socialLinks = [
  { icon: imgFacebook, label: "Facebook" },
  { icon: imgInstagram, label: "Instagram" },
  { icon: imgLinkedIn, label: "LinkedIn" },
  { icon: imgWhatsApp, label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="footer-section-container-main">
      <div className="footer-section-container container">
        <div className="footer-section__top">
          <div className="footer-section__brand">
            <img className="footer-section__logo" src={imgLogo} alt="Aider Academy" />
            <div className="footer-section__socials">
              {socialLinks.map((item) => (
                <a
                  className="footer-section__social-link"
                  href="#"
                  aria-label={item.label}
                  key={item.label}
                >
                  <img src={item.icon} alt="" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section__column">
            <h3 className="footer-section__column-title">Navigation</h3>
            <div className="footer-section__column-links">
              {navigationLinks.map((item) => (
                <TransitionLink className="footer-section__link" href={item.href} key={item.label}>
                  {item.label}
                </TransitionLink>
              ))}
            </div>
          </div>

          <div className="footer-section__column footer-section__column--courses">
            <h3 className="footer-section__column-title">Courses</h3>
            <div className="footer-section__column-links">
              {courseLinks.map((item) => (
                <TransitionLink className="footer-section__link" href={item.href} key={item.label}>
                  {item.label}
                </TransitionLink>
              ))}
            </div>
          </div>

          <div className="footer-section__column footer-section__column--contact">
            <h3 className="footer-section__column-title">Contact</h3>
            <div className="footer-section__column-links">
              {contactItems.map((item) => (
                <p className="footer-section__text" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="footer-section__copyright">
          © 2025 Aider.Academy All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
