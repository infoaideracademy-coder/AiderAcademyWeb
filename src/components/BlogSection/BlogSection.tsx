import TransitionLink from "@/components/AppShell/TransitionLink";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getLatestBlogPosts } from "@/sanity/queries";
import BlogCardsGrid from "./BlogCardsGrid";
import BlogEmptyState from "./BlogEmptyState";
import "./style.scss";

const BlogSection = async () => {
  const posts = await getLatestBlogPosts(3);

  return (
    <section className="blog-section-container-main">
      <div className="blog-section-container container">
        <SectionHeading
          className="blog-section__heading"
          eyebrow="Our Blog"
          title="The Aider Journal"
          accent="Aider Journal"
          description=""
        />

        {posts.length > 0 ? (
          <BlogCardsGrid posts={posts} />
        ) : (
          <BlogEmptyState className="blog-section__empty" />
        )}

        <TransitionLink className="primary-button primary-button--light blog-section__view-all" href="/blog">
          View All
        </TransitionLink>
      </div>
    </section>
  );
};

export default BlogSection;
