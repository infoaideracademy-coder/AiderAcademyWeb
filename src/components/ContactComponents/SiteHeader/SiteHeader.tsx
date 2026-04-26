"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/AppShell/TransitionLink";
import "./style.scss";

const imgLogo =
  "/images/aider-academy-logo.png";
const imgFacebook = "/images/icons/fb.svg";
const imgInstagram = "/images/icons/insta.svg";
const imgLinkedIn = "/images/icons/linkedin.svg";
const imgWhatsApp = "/images/icons/wp.svg";
const imgCtaArrow = "/images/icons/right-arrow.svg";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
];

const socialItems = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574845930628", icon: imgFacebook },
  { label: "Instagram", href: "https://www.instagram.com/aider.academy?igsh=cXQzY2E3NWw0a3B1", icon: imgInstagram },
  { label: "WhatsApp", href: "#", icon: imgWhatsApp },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const mobileItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const panel = mobilePanelRef.current;
    const items = mobileItemsRef.current?.querySelectorAll(".site-header__mobile-stagger");

    if (!panel || !items) {
      return;
    }

    gsap.set(panel, {
      height: 0,
      opacity: 0,
      y: -18,
      pointerEvents: "none",
      overflow: "hidden",
    });
    gsap.set(items, {
      opacity: 0,
      y: 14,
    });
  }, []);

  useEffect(() => {
    const panel = mobilePanelRef.current;
    const items = mobileItemsRef.current?.querySelectorAll(".site-header__mobile-stagger");

    if (!panel || !items) {
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (isMobileMenuOpen) {
      timeline
        .set(panel, { pointerEvents: "auto" })
        .to(panel, {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.34,
        })
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            duration: 0.24,
            stagger: 0.05,
          },
          "-=0.16"
        );
    } else {
      timeline
        .to(items, {
          opacity: 0,
          y: 10,
          duration: 0.16,
          stagger: 0.03,
        })
        .to(
          panel,
          {
            height: 0,
            opacity: 0,
            y: -14,
            duration: 0.24,
            pointerEvents: "none",
          },
          "-=0.06"
        );
    }

    return () => {
      timeline.kill();
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header-main">
      <div className="site-header-container container">
        <TransitionLink className="site-header__brand" href="/" aria-label="Aider Academy home">
          <img className="site-header__logo" src={imgLogo} alt="Aider Academy" />
        </TransitionLink>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/about"
                  ? pathname === "/about"
                  : item.href === "/courses"
                    ? pathname === "/courses"
                    : item.href === "/blog"
                      ? pathname === "/blog"
                  : false;

            return (
            <TransitionLink
              className={`site-header__nav-link ${
                isActive ? "site-header__nav-link--pill" : ""
              }`.trim()}
              key={item.label}
              href={item.href}
            >
              {item.label}
            </TransitionLink>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <div className="site-header__socials" aria-label="Social links">
            {socialItems.map((item) => (
              <a
                className="site-header__social-link"
                href={item.href}
                key={item.label}
                aria-label={item.label}
              >
                <img src={item.icon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>

          <TransitionLink
            className={`site-header__contact-cta ${
              pathname === "/contact" ? "site-header__contact-cta--active" : ""
            }`.trim()}
            href="/contact"
          >
            <span>Contact</span>
            <span className="site-header__contact-cta-icon">
              <img
                className="site-header__contact-cta-arrow"
                src={imgCtaArrow}
                alt=""
                aria-hidden="true"
              />
            </span>
          </TransitionLink>
        </div>

        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className={`site-header__menu-toggle ${
            isMobileMenuOpen ? "site-header__menu-toggle--active" : ""
          }`.trim()}
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="site-header__mobile-panel" ref={mobilePanelRef}>
        <div className="site-header__mobile-panel-inner container" ref={mobileItemsRef}>
          <nav className="site-header__mobile-nav" aria-label="Mobile navigation">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/about"
                    ? pathname === "/about"
                    : item.href === "/courses"
                      ? pathname === "/courses"
                      : item.href === "/blog"
                        ? pathname === "/blog"
                        : false;

              return (
                <TransitionLink
                  className={`site-header__mobile-nav-link site-header__mobile-stagger ${
                    isActive ? "site-header__mobile-nav-link--active" : ""
                  }`.trim()}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </TransitionLink>
              );
            })}
          </nav>

          <div className="site-header__mobile-socials site-header__mobile-stagger" aria-label="Social links">
            {socialItems.map((item) => (
              <a
                className="site-header__social-link"
                href={item.href}
                key={item.label}
                aria-label={item.label}
              >
                <img src={item.icon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>

          <TransitionLink
            className="site-header__mobile-contact-cta site-header__mobile-stagger"
            href="/contact"
          >
            <span>Contact</span>
            <span className="site-header__contact-cta-icon">
              <img
                className="site-header__contact-cta-arrow"
                src={imgCtaArrow}
                alt=""
                aria-hidden="true"
              />
            </span>
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}
