type BlogEmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

const BlogEmptyState = ({
  title = "Nothing here just yet.",
  description = "We haven't published any blog posts yet. Check back later for updates, guides, and fresh insights from the team.",
  className = "",
}: BlogEmptyStateProps) => {
  return (
    <div className={`blog-empty-state ${className}`.trim()}>
      <div className="blog-empty-state__badge">Coming Soon</div>
      <h3 className="blog-empty-state__title">{title}</h3>
      <p className="blog-empty-state__description">{description}</p>
    </div>
  );
};

export default BlogEmptyState;
