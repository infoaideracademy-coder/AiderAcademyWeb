"use client";

import { useMemo, useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import type { BlogPostCard } from "@/sanity/types";
import BlogCardsGrid from "./BlogCardsGrid";
import BlogEmptyState from "./BlogEmptyState";

type BlogListingPageClientProps = {
  posts: BlogPostCard[];
};

const pageSize = 12;

const BlogListingPageClient = ({ posts }: BlogListingPageClientProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / pageSize);

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [page, posts]);

  return (
    <section className="blog-page-section">
      <div className="blog-page-container container">
        <SectionHeading
          className="blog-page__heading"
          eyebrow="Our Blog"
          title="The Aider Journal"
          accent="Aider Journal"
          description="Updates, guides, and notes from our team on digital skills and real workflows."
        />

        {posts.length > 0 ? (
          <BlogCardsGrid className="blog-page__grid" posts={visiblePosts} />
        ) : (
          <BlogEmptyState
            className="blog-page__empty"
            title="No blog posts published yet."
            description="There’s nothing live in the journal right now. Check back later for articles, updates, and practical guides."
          />
        )}

        {totalPages > 1 ? (
          <div className="blog-page__pagination">
            <button
              className="blog-page__page-button"
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <div className="blog-page__page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  className={`blog-page__page-number ${
                    pageNumber === page ? "blog-page__page-number--active" : ""
                  }`.trim()}
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              className="blog-page__page-button"
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlogListingPageClient;
