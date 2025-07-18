import { client } from '@/lib/sanity';
import { landingPageQuery } from '@/lib/queries';
import PortableText from '@/components/PortableText';
import { urlFor } from '@/lib/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import {
  LandingPage,
  FeatureSection,
  TestimonialSection,
  CTASection,
  Feature,
  Testimonial,
} from '@/types/sanity';

async function getLandingPageData(): Promise<LandingPage | null> {
  try {
    const landingPage = await client.fetch(landingPageQuery);
    if (!landingPage) return null;
    return landingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export default async function Page() {
  const data = await getLandingPageData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Content Loading...</h1>
          <p className="text-gray-600">
            Please check back later or contact support if this persists.
          </p>
        </div>
      </div>
    );
  }

  // Extract different section types with proper validation
  const featureSections =
    data.sections?.filter(
      (section): section is FeatureSection =>
        section && section._type === 'featureSection'
    ) || [];

  const testimonialSections =
    data.sections?.filter(
      (section): section is TestimonialSection =>
        section && section._type === 'testimonialSection'
    ) || [];

  const ctaSections =
    data.sections?.filter(
      (section): section is CTASection =>
        section && section._type === 'ctaSection'
    ) || [];

  // Get hero background image URL
  const heroBackground = data.heroSection?.backgroundImage
    ? urlFor(data.heroSection.backgroundImage).url()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 min-h-[600px] flex items-center"
        style={{
          backgroundImage: heroBackground
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBackground})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {data.heroSection.headline}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {data.heroSection.subheadline}
            </p>
            {data.heroSection.ctaButton && (
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href={data.heroSection.ctaButton.url}>
                  {data.heroSection.ctaButton.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Sections */}
      {featureSections.map((section, sectionIndex) => (
        <section
          key={section._type || `feature-section-${sectionIndex}`}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            {section.title && (
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {section.title}
              </h2>
            )}

            {section.content && (
              <div className="max-w-4xl mx-auto mb-12">
                <PortableText value={section.content} />
              </div>
            )}

            {section.features && section.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.features.map((feature: Feature, index) => (
                  <Card
                    key={`feature-${index}`}
                    className="text-center p-6 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        {feature.icon ? (
                          <Image
                            src={
                              urlFor(feature.icon).url() ||
                              '/placeholder-icon.png'
                            }
                            alt={feature.icon.alt || feature.title}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-blue-600" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-semibold">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No features available yet.</p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Testimonials Sections */}
      {testimonialSections.map((section, sectionIndex) => (
        <section
          key={section._type || `testimonial-section-${sectionIndex}`}
          className="py-20 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            {section.title && (
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {section.title}
              </h2>
            )}

            {section.testimonials && section.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.testimonials.map((testimonial: Testimonial, index) => (
                  <Card
                    key={`testimonial-${index}`}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        {testimonial.avatar && (
                          <Image
                            src={
                              urlFor(testimonial.avatar).url() ||
                              '/placeholder-avatar.png'
                            }
                            alt={testimonial.avatar.alt || testimonial.author}
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                          />
                        )}
                        <div>
                          <CardTitle className="text-lg">
                            {testimonial.author}
                          </CardTitle>
                          <CardDescription>
                            {testimonial.company}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No testimonials available yet.</p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Sections */}
      {ctaSections.map((section, sectionIndex) => (
        <section
          key={section._type || `cta-section-${sectionIndex}`}
          className="py-20 bg-blue-600 text-white"
        >
          <div className="container mx-auto px-4 text-center">
            {section.title && (
              <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            )}
            {section.description && (
              <p className="text-xl mb-8 opacity-90">{section.description}</p>
            )}
            <div className="flex justify-center space-x-4">
              {section.primaryButton && (
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href={section.primaryButton.url}>
                    {section.primaryButton.text}
                  </Link>
                </Button>
              )}
              {section.secondaryButton && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link href={section.secondaryButton.url}>
                    {section.secondaryButton.text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-400">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:text-blue-400">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-blue-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-blue-400">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="hover:text-blue-400">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-blue-400">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-blue-400">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
