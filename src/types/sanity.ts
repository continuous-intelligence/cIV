import { PortableTextBlock } from '@portabletext/types';

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface Author extends SanityDocument {
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  image?: SanityImageAsset;
  bio?: PortableTextBlock[];
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface BlogPost extends SanityDocument {
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  author: Author;
  mainImage?: SanityImageAsset;
  categories?: string[];
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageAsset;
  };
  featured?: boolean;
  readTime?: number;
}

export interface Feature {
  title: string;
  description: string;
  icon?: SanityImageAsset;
}

export interface Testimonial {
  quote: string;
  author: string;
  company?: string;
  avatar?: SanityImageAsset;
}

export interface CTAButton {
  text: string;
  url: string;
}

export interface HeroSection {
  headline: string;
  subheadline?: string;
  backgroundImage?: SanityImageAsset;
  ctaButton?: CTAButton;
}

export interface FeatureSection {
  _type: 'featureSection';
  title?: string;
  content?: PortableTextBlock[];
  features: Feature[];
}

export interface TestimonialSection {
  _type: 'testimonialSection';
  title?: string;
  testimonials: Testimonial[];
}

export interface CTASection {
  _type: 'ctaSection';
  title?: string;
  description?: string;
  primaryButton?: CTAButton;
  secondaryButton?: CTAButton;
}

export type PageSection = FeatureSection | TestimonialSection | CTASection;

export interface LandingPage extends SanityDocument {
  _type: 'landingPage';
  title: string;
  slug: {
    current: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageAsset;
  };
  heroSection: HeroSection;
  sections: PageSection[];
}

export interface SplashScreen extends SanityDocument {
  _type: 'splashScreen';
  title: string;
  isActive: boolean;
  logo?: SanityImageAsset;
  brandName: string;
  tagline?: string;
  backgroundColor?: string;
  textColor?: string;
  animationSettings: {
    duration: number;
    fadeIn: boolean;
    fadeOut: boolean;
    scale: boolean;
  };
  skipButton: {
    show: boolean;
    text: string;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  };
  redirectTo: string;
}

export interface Settings extends SanityDocument {
  _type: 'settings';
  title: string;
  description?: string;
  keywords?: string[];
  url?: string;
  logo?: SanityImageAsset;
  favicon?: SanityImageAsset;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageAsset;
    twitterImage?: SanityImageAsset;
  };
  analytics?: {
    googleAnalyticsId?: string;
    googleTagManagerId?: string;
    facebookPixelId?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  maintenance?: {
    enabled: boolean;
    message?: string;
  };
}
