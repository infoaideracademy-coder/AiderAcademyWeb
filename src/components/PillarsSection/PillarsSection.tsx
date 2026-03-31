import React from 'react';
import './style.scss';

const imgIcon1 = "/images/icons/f-1.png";
const imgIcon2 = "/images/icons/f-2.png";
const imgIcon3 = "/images/icons/f-3.png";

const pillars = [
  {
    icon: imgIcon1,
    title: "CTDS-Certified Learning Path",
    description:
      "Structured learning aligned to recognized standards, built to develop skills employers trust and clients value.",
  },
  {
    icon: imgIcon2,
    title: "GCC-Centric Curriculum",
    description:
      "Market-focused training shaped around GCC tools, workflows, and project practice that matches hiring expectations.",
  },
  {
    icon: imgIcon3,
    title: "Live Projects. Real Portfolios",
    description:
      "Hands-on assignments that mirror real roles, helping you graduate with a portfolio that proves capability.",
  },
];

const PillarsSection = () => {
  return (
    <div className="pillars-section-container-main">
      <div className="pillars-section-container container">
        <div className="header-section">
          <div className="header-left">
            <h2 className="pillars-headline">
              <span>Built for </span>
              <span className="accent">Careers.</span>
              <br />
              <span>Designed for </span>
              <span className="accent">Real Work.</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="pillars-description">
              CTDS-certified training with a GCC-centric curriculum, mentor-led
              sessions, and live projects that build real capability—step by step.
            </p>
          </div>
        </div>

        <div className="cards-container">
          {pillars.map((pillar, index) => (
            <div className="pillar-card" key={index}>
              <div className="pillar-icon-wrapper">
                <img src={pillar.icon} alt={pillar.title} />
              </div>
              <h3 className="pillar-card-title">{pillar.title}</h3>
              <p className="pillar-card-description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarsSection;
