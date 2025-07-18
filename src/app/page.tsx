import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import { landingPageQuery } from '@/lib/queries'
import PortableText from '@/components/PortableText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface LandingPageData {
  _id: string
  title: string
  slug: { current: string }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
  }
  heroSection?: {
    headline: string
    subheadline: string
    backgroundImage?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    ctaButton?: {
      text: string
      url: string
    }
  }
  sections?: Array<{
    _key: string
    _type: string
    title: string
    content?: any[]
    description?: string
    features?: Array<{
      title: string
      description: string
      icon?: {
        asset: {
          _id: string
          url: string
        }
        alt?: string
      }
    }>
    testimonials?: Array<{
      quote: string
      author: string
      company: string
      avatar?: {
        asset: {
          _id: string
          url: string
        }
        alt?: string
      }
    }>
    primaryButton?: {
      text: string
      url: string
    }
    secondaryButton?: {
      text: string
      url: string
    }
  }>
}

// Helper function to safely get image URL
function getImageUrl(image: any, width: number = 1200, height: number = 600): string | null {
  if (!image?.asset?.url && !image?.asset?._id) return null
  try {
    if (image.asset.url) {
      return image.asset.url
    }
    return urlFor(image).width(width).height(height).quality(90).url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return null
  }
}

// Helper function to extract text from portable text blocks
function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .filter(block => block._type === 'block' && block.children)
    .map(block => 
      block.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join(' ')
    )
    .join(' ')
}

async function getLandingPageData(): Promise<LandingPageData | null> {
  try {
    const landingPage = await client.fetch(landingPageQuery)
    console.log('Landing page data:', JSON.stringify(landingPage, null, 2))
    return landingPage
  } catch (error) {
    console.error('Error fetching landing page:', error)
    return null
  }
}

export default async function HomePage() {
  const landingPage = await getLandingPageData()
  
  if (!landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">cIV Platform</h1>
          <p className="text-xl text-gray-600 mb-8">Continuous Intelligence Validation</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/test-sanity">Test Sanity Integration</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/studio">Open Studio</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Extract different section types with proper validation
  const featureSections = landingPage.sections?.filter(section => section && section._type === 'featureSection') || []
  const testimonialSections = landingPage.sections?.filter(section => section && section._type === 'testimonialSection') || []
  const ctaSections = landingPage.sections?.filter(section => section && section._type === 'ctaSection') || []

  // Get hero background image URL
  const heroBackgroundUrl = landingPage.heroSection?.backgroundImage ? 
    getImageUrl(landingPage.heroSection.backgroundImage, 1920, 1080) : null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {landingPage.heroSection && (
        <section 
          className="relative text-white py-20 min-h-[600px] flex items-center"
          style={{
            backgroundImage: heroBackgroundUrl ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackgroundUrl})` : 'linear-gradient(to right, #2563eb, #7c3aed)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                {landingPage.heroSection.headline}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {landingPage.heroSection.subheadline}
              </p>
              {landingPage.heroSection.ctaButton && (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href={landingPage.heroSection.ctaButton.url}>
                    {landingPage.heroSection.ctaButton.text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Sections */}
      {featureSections.map((section, sectionIndex) => (
        <section key={section._key || `feature-section-${sectionIndex}`} className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
            {section.features && section.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.features.map((feature, index) => (
                  <Card key={`${section._key || sectionIndex}-feature-${index}`} className="text-center">
                    <CardHeader>
                      {feature.icon && (
                        <div className="mx-auto mb-4">
                          <Image
                            src={getImageUrl(feature.icon, 64, 64) || '/placeholder-icon.png'}
                            alt={feature.icon.alt || feature.title}
                            width={64}
                            height={64}
                            className="mx-auto"
                          />
                        </div>
                      )}
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : section.content && (
              <div className="prose max-w-none">
                <PortableText value={section.content} />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Testimonials Sections */}
      {testimonialSections.map((section, sectionIndex) => (
        <section key={section._key || `testimonial-section-${sectionIndex}`} className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{section.title}</h2>
            {section.testimonials && section.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.testimonials.map((testimonial, index) => (
                  <Card key={`${section._key || sectionIndex}-testimonial-${index}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        {testimonial.avatar && (
                          <Image
                            src={getImageUrl(testimonial.avatar, 50, 50) || '/placeholder-avatar.png'}
                            alt={testimonial.avatar.alt || testimonial.author}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                          <CardDescription>{testimonial.company}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No testimonials available yet.</p>
                <p className="text-sm text-gray-400 mt-2">Add testimonials in the Sanity Studio to see them here.</p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Sections */}
      {ctaSections.map((section, sectionIndex) => (
        <section key={section._key || `cta-section-${sectionIndex}`} className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            {section.description && (
              <p className="text-xl mb-8 opacity-90">{section.description}</p>
            )}
            <div className="space-x-4">
              {section.primaryButton && (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href={section.primaryButton.url}>
                    {section.primaryButton.text}
                  </Link>
                </Button>
              )}
              {section.secondaryButton && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href={section.secondaryButton.url}>
                    {section.secondaryButton.text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Development Links */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">Development & Testing</p>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link href="/test-sanity">Test Sanity Integration</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/studio">Open Sanity Studio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api/test-sanity">API Test</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
