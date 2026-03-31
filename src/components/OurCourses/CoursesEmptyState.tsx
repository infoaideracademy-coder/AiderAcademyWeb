type CoursesEmptyStateProps = {
  className?: string;
  title?: string;
  description?: string;
};

const CoursesEmptyState = ({
  className = "",
  title = "No courses available right now.",
  description = "We haven't published any programs yet. Check back later for upcoming course launches and new tracks.",
}: CoursesEmptyStateProps) => {
  return (
    <div className={`courses-empty-state ${className}`.trim()}>
      <div className="courses-empty-state__badge">Coming Soon</div>
      <h3 className="courses-empty-state__title">{title}</h3>
      <p className="courses-empty-state__description">{description}</p>
    </div>
  );
};

export default CoursesEmptyState;
