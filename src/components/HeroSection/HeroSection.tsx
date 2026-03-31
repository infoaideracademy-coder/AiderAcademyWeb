"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.scss";

const imgCtdsLogo11 = "/images/icons/CTDS%20Logo%20(1)%201.png";
const imgPhoneIcon = "/images/icons/call.png";
const imgAsteriskIcon = "/images/icons/black-star.png";
const imgIconGraphicDesign = "/images/icons/graphic-design.png";
const imgIconDigitalMarketing = "/images/icons/digital-marketing.png";
const imgIconWebDev = "/images/icons/web-dev.png";

const heroImages = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
];

const HeroSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const isFirstImageCycleRef = useRef(true);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const image = heroImageRef.current;

    if (!image) {
      return;
    }

    if (isFirstImageCycleRef.current) {
      isFirstImageCycleRef.current = false;
      return;
    }

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        image,
        {
          autoAlpha: 0.45,
          scale: 1.1,
          rotate: 0.4,
        },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.05,
          ease: "power3.out",
        }
      )
      .fromTo(
        ".hero-image-mask",
        {
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        },
        {
          boxShadow: "0 28px 70px rgba(18, 41, 53, 0.18)",
          duration: 0.9,
          ease: "power2.out",
        },
        0
      );

    return () => {
      timeline.kill();
    };
  }, [activeImageIndex]);

  return (
    <div className="hero-section-container-main">
      <div className="hero-section-container container">
        <div className="left-section content-section">
          <h1 className="hero-headline">
            <span className="highlight-blue">Career-focused</span> training<br/>
            for real-world <span className="highlight-blue highlight-blue--dark">digital roles.</span>
          </h1>
          <p className="hero-description">
            CTDS certified academy with a GCC-centric curriculum,
            live projects, and mentor-led learning. Built for beginners
            and professionals who want outcomes, not noise.
          </p>
          
          <div className="hero-ctas">
            <button className="btn-explore">Explore Courses</button>
            <button className="btn-advisor">Talk to an Advisor</button>
          </div>
          
          <div className="hero-contact-info">
            <div className="academy-badge">
              <img src={imgCtdsLogo11} alt="CTDS Logo" />
              <span>CTDS Certified Academy</span>
            </div>
            
            <div className="contact-details">
              <div className="phone-icon-wrapper">
                <img src={imgPhoneIcon} alt="Phone" className="phone-icon" />
              </div>
              <div className="contact-text">
                <span className="contact-label">Have any queries call us</span>
                <span className="contact-number">+91 88888 88888</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section image-section">
          <div className="hero-card-container">
            <div className="hero-image-mask">
              <img
                ref={heroImageRef}
                src={heroImages[activeImageIndex]}
                alt="Students collaborating"
                className="hero-main-img"
              />
            </div>
            
            <div className="floating-badge badge-graphic">
              <div className="icon-wrapper">
                <img src={imgIconGraphicDesign} alt="Graphic Design" />
              </div>
              <span className="badge-text">Graphic Design</span>
            </div>

            <div className="floating-badge badge-digital">
              <div className="icon-wrapper">
                <img src={imgIconDigitalMarketing} alt="Digital Marketing" />
              </div>
              <span className="badge-text">Digital Marketing</span>
            </div>

            <div className="floating-badge badge-web">
              <div className="icon-wrapper">
                <img src={imgIconWebDev} alt="Web Development" />
              </div>
              <span className="badge-text">Web Development</span>
            </div>

            <div className="bottom-highlight">
              <div className="asterisk-circle">
                 <img src={imgAsteriskIcon} alt="*" />
              </div>
              <p className="highlight-text">
                CTDS certified academy with a GCC-centric curriculum, live projects,
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default HeroSection;
