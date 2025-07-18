import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    // Test queries for all content types
    const [settings, authors, splashScreens, landingPages, blogPosts] = await Promise.all([
      client.fetch(`*[_type == "settings"]{
        _id,
        title,
        description,
        seo,
        socialLinks,
        contact
      }`),
      client.fetch(`*[_type == "author"]{
        _id,
        name,
        "slug": slug.current,
        email,
        socialLinks
      }`),
      client.fetch(`*[_type == "splashScreen"]{
        _id,
        title,
        brandName,
        tagline,
        isActive,
        backgroundColor,
        textColor,
        redirectTo
      }`),
      client.fetch(`*[_type == "landingPage"]{
        _id,
        title,
        "slug": slug.current,
        seo,
        heroSection
      }`),
      client.fetch(`*[_type == "blogPost"]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        categories,
        featured,
        readTime,
        seo
      }`)
    ])

    return NextResponse.json({
      success: true,
      message: 'Sanity integration working properly!',
      data: {
        settings: settings.length,
        authors: authors.length,
        splashScreens: splashScreens.length,
        landingPages: landingPages.length,
        blogPosts: blogPosts.length
      },
      sampleData: {
        settings: settings[0],
        authors: authors[0],
        splashScreens: splashScreens[0],
        landingPages: landingPages[0],
        blogPosts: blogPosts[0]
      }
    })
  } catch (error) {
    console.error('Sanity integration test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sanity integration test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 