import type { Metadata } from "next";
import BlogListingPageClient from "@/components/BlogSection/BlogListingPageClient";
import { getAllBlogPosts } from "@/sanity/queries";
import "./style.scss";

export const metadata: Metadata = {
  title: "The Aider Journal | Aider Academy",
  description: "Updates, guides, and notes from our team on digital skills and real workflows.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="blog-page-main">
      <BlogListingPageClient posts={posts} />
    </main>
  );
}
