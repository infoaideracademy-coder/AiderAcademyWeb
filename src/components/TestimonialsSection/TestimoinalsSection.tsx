import React from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getTestimonials } from "@/sanity/queries";
import TestimonialsClient from "./TestimonialsClient";
import TestimonialsEmptyState from "./TestimonialsEmptyState";
import "./style.scss";

const TestimoinalsSection = async () => {
  const testimonials = await getTestimonials();

  const headingData = {
    eyebrow: "Testimonials",
    title: "Stories That Speak for Themselves",
    accent: "Themselves",
    description:
      "From beginners to career switchers, see how learners progressed through structured, hands-on training.",
  };

  return (
    <section className="testimonials-section-container-main">
      <div className="testimonials-section-container container">
        {testimonials.length > 0 ? (
          <TestimonialsClient
            testimonials={testimonials}
            heading={headingData}
          />
        ) : (
          <>
            <div className="testimonials-section__header">
              <SectionHeading
                className="testimonials-section__heading"
                eyebrow={headingData.eyebrow}
                title={headingData.title}
                accent={headingData.accent}
                description={headingData.description}
              />
            </div>
            <TestimonialsEmptyState className="testimonials-section__empty" />
          </>
        )}
      </div>
    </section>
  );
};

export default TestimoinalsSection;
