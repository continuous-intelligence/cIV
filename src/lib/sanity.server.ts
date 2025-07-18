import { client } from './sanity';
import {
  landingPageQuery,
  blogPostsQuery,
  blogPostQuery,
  featuredBlogPostsQuery,
  authorQuery,
  authorsQuery,
  splashScreenQuery,
  settingsQuery,
  searchQuery,
  categoryQuery,
  relatedPostsQuery,
} from './queries';
import type {
  LandingPage,
  BlogPost,
  Author,
  SplashScreen,
  Settings,
} from '../types/sanity';

// Landing Page
export async function getLandingPage(): Promise<LandingPage | null> {
  return await client.fetch(landingPageQuery);
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(blogPostsQuery);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(blogPostQuery, { slug });
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(featuredBlogPostsQuery);
}

export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  return await client.fetch(categoryQuery, { category });
}

export async function getRelatedPosts(
  currentId: string,
  categories: string[]
): Promise<BlogPost[]> {
  return await client.fetch(relatedPostsQuery, { currentId, categories });
}

// Authors
export async function getAuthor(slug: string): Promise<Author | null> {
  return await client.fetch(authorQuery, { slug });
}

export async function getAuthors(): Promise<Author[]> {
  return await client.fetch(authorsQuery);
}

// Splash Screen
export async function getSplashScreen(): Promise<SplashScreen | null> {
  return await client.fetch(splashScreenQuery);
}

// Settings
export async function getSettings(): Promise<Settings | null> {
  return await client.fetch(settingsQuery);
}

// Search
export async function searchContent(searchTerm: string): Promise<unknown[]> {
  return await client.fetch(searchQuery, {
    searchTerm: `*${searchTerm}*`,
  });
}

// Helper function to get all unique categories
export async function getCategories(): Promise<string[]> {
  const categoriesQuery = `*[_type == "blogPost" && defined(categories)].categories[]`;
  const categories = (await client.fetch(categoriesQuery)) as string[];
  return [...new Set(categories)].sort();
}

// Helper function to get recent posts
export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  const recentPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    author-> {
      name
    },
    publishedAt,
    excerpt
  }`;
  return await client.fetch(recentPostsQuery);
}

// Helper function to check if content exists
export async function hasContent(type: string): Promise<boolean> {
  const query = `count(*[_type == "${type}"])`;
  const count = await client.fetch(query);
  return count > 0;
}

// Helper function to get content by type with pagination
export async function getContentByType(
  type: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: unknown[]; total: number; hasMore: boolean }> {
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    client.fetch(
      `*[_type == "${type}"] | order(_createdAt desc) [${offset}...${offset + limit}]`
    ),
    client.fetch(`count(*[_type == "${type}"])`),
  ]);

  return {
    data,
    total,
    hasMore: offset + limit < total,
  };
}
