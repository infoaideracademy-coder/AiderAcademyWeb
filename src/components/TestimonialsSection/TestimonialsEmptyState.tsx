import React from "react";

type TestimonialsEmptyStateProps = {
  className?: string;
  title?: string;
  description?: string;
};

const TestimonialsEmptyState = ({
  className = "",
  title = "No stories to share just yet.",
  description = "We haven't collected any student testimonials yet. Check back soon to see how our learners are progressing.",
}: TestimonialsEmptyStateProps) => {
  return (
    <div className={`testimonials-empty-state ${className}`.trim()}>
      <div className="testimonials-empty-state__badge">Coming Soon</div>
      <h3 className="testimonials-empty-state__title">{title}</h3>
      <p className="testimonials-empty-state__description">{description}</p>
    </div>
  );
};

export default TestimonialsEmptyState;
