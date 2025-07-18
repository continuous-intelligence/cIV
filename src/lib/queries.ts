import { groq } from 'next-sanity'

// Landing Page Queries
export const landingPageQuery = groq`
  *[_type == "landingPage"][0] {
    _id,
    _type,
    title,
    slug,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    heroSection {
      headline,
      subheadline,
      backgroundImage {
        asset->{
          _id,
          url
        },
        alt
      },
      ctaButton {
        text,
        url
      }
    },
    sections[] {
      _type,
      _type == "featureSection" => {
        title,
        content,
        features[] {
          title,
          description,
          icon {
            asset->{
              _id,
              url
            },
            alt
          }
        }
      },
      _type == "testimonialSection" => {
        title,
        testimonials[] {
          quote,
          author,
          company,
          avatar {
            asset->{
              _id,
              url
            },
            alt
          }
        }
      },
      _type == "ctaSection" => {
        title,
        description,
        primaryButton {
          text,
          url
        },
        secondaryButton {
          text,
          url
        }
      }
    }
  }
`

// Blog Post Queries
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author-> {
      _id,
      name,
      slug,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories,
    publishedAt,
    excerpt,
    featured,
    readTime
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author-> {
      _id,
      name,
      slug,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      bio,
      email,
      socialLinks
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories,
    publishedAt,
    excerpt,
    body,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    featured,
    readTime
  }
`

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    author-> {
      name,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    excerpt,
    readTime
  }
`

// Author Queries
export const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    bio,
    email,
    socialLinks
  }
`

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    bio
  }
`

// Splash Screen Query
export const splashScreenQuery = groq`
  *[_type == "splashScreen"][0] {
    _id,
    title,
    isActive,
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    brandName,
    tagline,
    backgroundColor,
    textColor,
    animationSettings {
      duration,
      fadeIn,
      fadeOut,
      scale
    },
    skipButton {
      show,
      text,
      position
    },
    redirectTo
  }
`

// Settings Query
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    _id,
    title,
    description,
    keywords,
    url,
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    favicon {
      asset->{
        _id,
        url
      },
      alt
    },
    socialLinks,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        },
        alt
      },
      twitterImage {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    analytics,
    contact,
    maintenance
  }
`

// Search Query
export const searchQuery = groq`
  *[_type in ["blogPost", "landingPage"] && (title match $searchTerm || body match $searchTerm)] {
    _id,
    _type,
    title,
    slug,
    _type == "blogPost" => {
      author-> {
        name
      },
      publishedAt,
      excerpt
    }
  }
`

// Category Query
export const categoryQuery = groq`
  *[_type == "blogPost" && $category in categories] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author-> {
      name,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    excerpt,
    readTime
  }
`

// Related Posts Query
export const relatedPostsQuery = groq`
  *[_type == "blogPost" && _id != $currentId && count(categories[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    author-> {
      name
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    excerpt,
    readTime
  }
` 