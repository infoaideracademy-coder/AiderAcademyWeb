import type { TypedObject } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage?: SanityImageSource & { alt?: string };
};

export type BlogPost = BlogPostCard & {
  body: TypedObject[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageSource & { alt?: string };
  seoNoIndex?: boolean;
};

export type CourseModule = {
  title: string;
  summary: string;
};

export type CourseFeatureColumn = {
  title: string;
  items: string[];
};

export type CourseTrainer = {
  name: string;
  role: string;
  bio: string;
  image?: SanityImageSource & { alt?: string };
};

export type CourseCard = {
  _id: string;
  slug: string;
  tag: string;
  title: string;
  shortTitle: string;
  description: string;
  image?: SanityImageSource & { alt?: string };
  overlayImage?: SanityImageSource & { alt?: string };
  alt: string;
  imageClassName: string;
  duration: string;
  certificateLabel: string;
  modulesCount: number;
  showOnHomepage?: boolean;
};

export type CourseDetail = CourseCard & {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  feeLabel: string;
  floatingCardLabel: string;
  floatingCardValue: string;
  floatingCardCopy: string;
  sessionDuration: string;
  classSchedule: string;
  mode: string;
  enrolled: string;
  overviewTitle: string;
  overviewParagraph: string;
  outcomes: string[];
  modules: CourseModule[];
  featureColumns: CourseFeatureColumn[];
  trainers: CourseTrainer[];
  placementCopy: string;
  supportCopy: string;
  applyUrl: string;
  brochureUrl?: string;
  brochureFileUrl?: string;
  brochureFileName?: string;
  callNumber: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageSource & { alt?: string };
  seoNoIndex?: boolean;
};

export type PartnerLogoItem = {
  _key: string;
  name?: string;
  logo: SanityImageSource & { alt?: string };
};

export type PartnersSection = {
  _id: string;
  title?: string;
  logos: PartnerLogoItem[];
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  quote: string;
  image?: SanityImageSource & { alt?: string };
  order: number;
};
