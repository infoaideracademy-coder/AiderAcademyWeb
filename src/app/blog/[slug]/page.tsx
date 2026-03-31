import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import BlogCardsGrid from "@/components/BlogSection/BlogCardsGrid";
import { formatBlogDate } from "@/sanity/lib/date";
import { urlForImage } from "@/sanity/lib/image";
import { getAllBlogSlugs, getBlogPostBySlug, getRelatedBlogPosts } from "@/sanity/queries";
import "./style.scss";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="blog-detail-content__paragraph">{children}</p>,
    h2: ({ children }) => <h2 className="blog-detail-content__subheading">{children}</h2>,
    h3: ({ children }) => <h3 className="blog-detail-content__subheading">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="blog-detail-content__list">{children}</ul>,
    number: ({ children }) => <ol className="blog-detail-content__ordered-list">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value).width(1400).fit("max").auto("format").url();

      return (
        <figure className="blog-detail-content__media">
          <img src={imageUrl} alt={value.alt || ""} />
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        className="blog-detail-content__link"
        href={value?.href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog | Aider Academy",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const seoImage = post.seoImage || post.coverImage;
  const imageUrl = seoImage
    ? urlForImage(seoImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${title} | Aider Academy`,
    description,
    robots: post.seoNoIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(slug, 3);
  const heroImageUrl = post.coverImage
    ? urlForImage(post.coverImage).width(1600).height(700).fit("crop").url()
    : null;

  return (
    <main className="blog-detail-main">
      <section className="blog-detail-hero-section">
        <div className="blog-detail-hero-container container">
          <div className="blog-detail-hero__frame">
            {heroImageUrl ? (
              <img className="blog-detail-hero__image" src={heroImageUrl} alt={post.title} />
            ) : (
              <div className="blog-detail-hero__image-placeholder" aria-hidden="true" />
            )}
          </div>
        </div>
      </section>

      <section className="blog-detail-content-section">
        <div className="blog-detail-content-container container">
          <div className="blog-detail-content__header">
            <p className="blog-detail-content__date">{formatBlogDate(post.publishedAt)}</p>
            <h1 className="blog-detail-content__title">{post.title}</h1>
          </div>

          <div className="blog-detail-content__body blog-detail-content__portable">
            <PortableText components={portableTextComponents} value={post.body} />
          </div>
        </div>
      </section>

      <section className="blog-detail-read-more-section">
        <div className="blog-detail-read-more-container container">
          <h2 className="blog-detail-read-more__title">Read More</h2>

          {relatedPosts.length > 0 ? (
            <BlogCardsGrid className="blog-detail-read-more__grid" posts={relatedPosts} />
          ) : (
            <p className="blog-detail-read-more__empty">More blog posts will appear here once published.</p>
          )}
        </div>
      </section>
    </main>
  );
}
