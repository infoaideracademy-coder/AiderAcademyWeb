import React from "react";
import TransitionLink from "@/components/AppShell/TransitionLink";
import "./style.scss";

const BottomCtaSection = () => {
  return (
    <section className="bottom-cta-section-container">
      <div className="bottom-cta-section container">
        <div className="bottom-cta-panel">
          <div className="bottom-cta-panel__cutout bottom-cta-panel__cutout--bottom-left" />
          <div className="bottom-cta-panel__cutout bottom-cta-panel__cutout--top-right" />

          <div className="bottom-cta-panel__content">
            <h2 className="bottom-cta-panel__title">
              <span>Start Your Learning Journey with </span>
              <span className="bottom-cta-panel__title-accent">Aider</span>
            </h2>
            <p className="bottom-cta-panel__description">
              Talk to our team, understand the program structure, and register when
              you’re ready.
            </p>

            <div className="bottom-cta-panel__actions">
              <TransitionLink 
                className="primary-button primary-button--dark bottom-cta-panel__button" 
                href="/courses"
              >
                Explore Courses
              </TransitionLink>
              <TransitionLink 
                className="primary-button primary-button--white bottom-cta-panel__button" 
                href="/contact"
              >
                Talk to an Advisor
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCtaSection;
