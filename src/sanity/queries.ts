import { groq } from "next-sanity";
import { hasRequiredSanityEnv } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import type {
  BlogPost,
  BlogPostCard,
  CourseCard,
  CourseDetail,
  PartnersSection,
  Testimonial,
} from "@/sanity/types";

const sanityFetchOptions = {
  cache: "no-store" as const,
};

const fetchFromSanity = async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
  return sanityClient.fetch<T>(query, params, sanityFetchOptions);
};

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<Testimonial[]>(
    groq`*[_type == "testimonial"] | order(coalesce(order, 0) asc, _createdAt desc) {
      _id,
      name,
      role,
      quote,
      image,
      "order": coalesce(order, 0)
    }`
  );
}

export async function getPartnersSection(): Promise<PartnersSection | null> {
  if (!hasRequiredSanityEnv) {
    return null;
  }

  return fetchFromSanity<PartnersSection | null>(
    groq`*[_type == "partnersSection"][0]{
      _id,
      title,
      logos
    }`
  );
}

const blogCardProjection = `
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  "category": coalesce(category, "Education"),
  "publishedAt": coalesce(publishedAt, _createdAt),
  coverImage
`;

const courseCardProjection = `
  _id,
  title,
  shortTitle,
  "slug": slug.current,
  "tag": coalesce(tag, ""),
  "description": coalesce(description, ""),
  "image": cardImage,
  "overlayImage": cardOverlayImage,
  "alt": coalesce(cardImage.alt, title),
  "imageClassName": coalesce(imageClassName, "course-card__image--graphic"),
  "duration": coalesce(duration, ""),
  "certificateLabel": coalesce(certificateLabel, "Certificate"),
  "modulesCount": count(coalesce(modules, []))
`;

const courseDetailProjection = `
  ${courseCardProjection},
  "heroEyebrow": coalesce(heroEyebrow, ""),
  "heroTitle": coalesce(heroTitle, title),
  "heroDescription": coalesce(heroDescription, description),
  "feeLabel": coalesce(feeLabel, ""),
  "floatingCardLabel": coalesce(floatingCardLabel, "Outcome Focus"),
  "floatingCardValue": coalesce(floatingCardValue, "Portfolio + Confidence"),
  "floatingCardCopy": coalesce(floatingCardCopy, ""),
  "sessionDuration": coalesce(sessionDuration, ""),
  "classSchedule": coalesce(classSchedule, ""),
  "mode": coalesce(mode, ""),
  "enrolled": coalesce(enrolled, ""),
  "overviewTitle": coalesce(overviewTitle, "What you'll learn"),
  "overviewParagraph": coalesce(overviewParagraph, ""),
  "outcomes": coalesce(outcomes, []),
  "modules": coalesce(modules, []),
  "featureColumns": coalesce(featureColumns, []),
  "trainers": coalesce(trainers, []),
  "placementCopy": coalesce(placementCopy, "CTDS certified learning path with mentor-led support and portfolio-focused practice."),
  "supportCopy": coalesce(supportCopy, "Need help deciding if this track is right for you?"),
  "applyUrl": coalesce(applyUrl, ""),
  "brochureUrl": brochureUrl,
  "brochureFileUrl": brochureFile.asset->url,
  "brochureFileName": brochureFile.asset->originalFilename,
  "callNumber": coalesce(callNumber, ""),
  seoTitle,
  seoDescription,
  seoImage,
  seoNoIndex
`;

export async function getAllBlogPosts(): Promise<BlogPostCard[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<BlogPostCard[]>(
    groq`*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {${blogCardProjection}}`
  );
}

export async function getLatestBlogPosts(limit: number): Promise<BlogPostCard[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<BlogPostCard[]>(
    groq`*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {${blogCardProjection}}`,
    { limit }
  );
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<string[]>(
    groq`*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc).slug.current`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasRequiredSanityEnv) {
    return null;
  }

  return fetchFromSanity<BlogPost | null>(
    groq`*[_type == "blogPost" && slug.current == $slug][0]{
      ${blogCardProjection},
      body,
      seoTitle,
      seoDescription,
      seoImage,
      seoNoIndex
    }`,
    { slug }
  );
}

export async function getRelatedBlogPosts(slug: string, limit: number): Promise<BlogPostCard[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<BlogPostCard[]>(
    groq`*[_type == "blogPost" && defined(slug.current) && slug.current != $slug] | order(coalesce(publishedAt, _createdAt) desc)[0...$limit] {${blogCardProjection}}`,
    { slug, limit }
  );
}

export async function getAllCourses(): Promise<CourseCard[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<CourseCard[]>(
    groq`*[_type == "course" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, _createdAt desc) {${courseCardProjection}}`
  );
}

export async function getHomepageCourses(limit: number): Promise<CourseCard[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  const featured = await fetchFromSanity<CourseCard[]>(
    groq`*[_type == "course" && defined(slug.current) && showOnHomepage == true] | order(coalesce(orderRank, 9999) asc, _createdAt desc)[0...$limit] {${courseCardProjection}}`,
    { limit }
  );

  if (featured.length > 0) {
    return featured;
  }

  return fetchFromSanity<CourseCard[]>(
    groq`*[_type == "course" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, _createdAt desc)[0...$limit] {${courseCardProjection}}`,
    { limit }
  );
}

export async function getAllCourseSlugs(): Promise<string[]> {
  if (!hasRequiredSanityEnv) {
    return [];
  }

  return fetchFromSanity<string[]>(
    groq`*[_type == "course" && defined(slug.current)] | order(coalesce(orderRank, 9999) asc, _createdAt desc).slug.current`
  );
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  if (!hasRequiredSanityEnv) {
    return null;
  }

  return fetchFromSanity<CourseDetail | null>(
    groq`*[_type == "course" && slug.current == $slug][0]{${courseDetailProjection}}`,
    { slug }
  );
}
