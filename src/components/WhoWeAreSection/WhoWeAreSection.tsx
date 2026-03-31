import React from "react";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import "./style.scss";

const WhoWeAreSection = () => {
  const imgMain = "/images/who-we-are.png";
  const imgGlobe = "/images/icons/who-1.png";
  const imgBadge = "/images/icons/who-2.png";
  const imgSpark = "/images/icons/who-3.png";
  const imgBriefcase = "/images/icons/who-4.png";

  const features = [
    { icon: imgGlobe, label: "GCC-Ready Curriculum" },
    { icon: imgBadge, label: "CTDS Certified Academy" },
    { icon: imgSpark, label: "AI-Powered Practice" },
    { icon: imgBriefcase, label: "Career Support That Continues" },
  ];

  return (
    <section className="who-we-are-section-container-main">
      <div className="who-we-section-container container">
        <div className="who-we-are-section__media">
          <div className="who-we-are-section__image-frame">
            <img
              className="who-we-are-section__image"
              src={imgMain}
              alt="Students working in a classroom environment"
            />
          </div>
        </div>

        <div className="who-we-are-section__content">
          <SectionHeading
            className="who-we-are-section__heading"
            eyebrow="Who We Are"
            title="A Training Institute Built for Real Outcomes"
            accent="Real Outcomes"
            description="Aider Academy is a CTDS certified institute built for people who want practical skills that hold up in the real world. Our learning is structured, mentor-led, and project-driven, with a strong focus on GCC market expectations. Students train on modern tools, work on real briefs, and build portfolio-ready outputs while getting continuous guidance, plus career, internship, and freelancing support."
          />

          <div className="who-we-are-section__features">
            {features.map((feature) => (
              <div className="who-we-are-section__feature" key={feature.label}>
                <img src={feature.icon} alt="" aria-hidden="true" />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <PrimaryButton className="who-we-are-section__cta">
            Know More
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
