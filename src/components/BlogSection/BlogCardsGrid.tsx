import TransitionLink from "@/components/AppShell/TransitionLink";
import { formatBlogDate } from "@/sanity/lib/date";
import { urlForImage } from "@/sanity/lib/image";
import type { BlogPostCard } from "@/sanity/types";

const imgCalendar = "/images/icons/calendar.png";

type BlogCardsGridProps = {
  posts: BlogPostCard[];
  className?: string;
};

const BlogCardsGrid = ({ posts, className = "" }: BlogCardsGridProps) => {
  return (
    <div className={`blog-cards-container ${className}`.trim()}>
      {posts.map((post) => {
        const imageUrl = post.coverImage
          ? urlForImage(post.coverImage).width(900).height(640).fit("crop").url()
          : null;

        return (
          <article className="blog-card" key={post._id}>
            <TransitionLink className="blog-card__image-link" href={`/blog/${post.slug}`}>
              <div className="blog-card__image-frame">
                {imageUrl ? (
                  <img className="blog-card__image" src={imageUrl} alt={post.title} />
                ) : (
                  <div className="blog-card__image-placeholder" aria-hidden="true" />
                )}
                <div className="blog-card__category">{post.category}</div>
              </div>
            </TransitionLink>

            <div className="blog-card__content">
              <TransitionLink className="blog-card__title-link" href={`/blog/${post.slug}`}>
                <h3 className="blog-card__title">{post.title}</h3>
              </TransitionLink>

              <div className="blog-card__meta">
                <img src={imgCalendar} alt="" aria-hidden="true" />
                <span>{formatBlogDate(post.publishedAt)}</span>
              </div>

              <p className="blog-card__description">{post.excerpt}</p>

              <TransitionLink
                className="primary-button primary-button--light blog-card__cta blog-card__cta-link"
                href={`/blog/${post.slug}`}
              >
                Know More
              </TransitionLink>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default BlogCardsGrid;
