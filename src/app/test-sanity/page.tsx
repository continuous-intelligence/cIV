import { client } from '@/lib/sanity';
import { landingPageQuery } from '@/lib/queries';
import { urlFor } from '@/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import { LandingPage } from '@/types/sanity';

async function getLandingPageData(): Promise<LandingPage | null> {
  try {
    const landingPage = await client.fetch(landingPageQuery);
    return landingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}

export default async function TestSanityPage() {
  const data = await getLandingPageData();

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sanity Test Page</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> Unable to fetch data from Sanity. Please check
          your connection.
        </div>
      </div>
    );
  }

  const heroBackgroundUrl = data.heroSection?.backgroundImage
    ? urlFor(data.heroSection.backgroundImage).url()
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
        <strong>Success:</strong> Connected to Sanity successfully!
      </div>

      <h1 className="text-3xl font-bold mb-6">Sanity Integration Test</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Data from Sanity</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Basic Info</h3>
            <p>
              <strong>Title:</strong> {data.title}
            </p>
            <p>
              <strong>Slug:</strong> {data.slug?.current}
            </p>
            <p>
              <strong>Document ID:</strong> {data._id}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Hero Section</h3>
            <p>
              <strong>Headline:</strong> {data.heroSection?.headline}
            </p>
            <p>
              <strong>Subheadline:</strong> {data.heroSection?.subheadline}
            </p>
            <p>
              <strong>Background Image:</strong>{' '}
              {heroBackgroundUrl ? 'Yes' : 'No'}
            </p>
            {heroBackgroundUrl && (
              <div className="mt-2">
                <p>
                  <strong>Image URL:</strong> {heroBackgroundUrl}
                </p>
                <Image
                  src={heroBackgroundUrl}
                  alt="Hero Background"
                  width={400}
                  height={200}
                  className="mt-2 max-w-xs rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">Sections</h3>
            <p>
              <strong>Total Sections:</strong> {data.sections?.length || 0}
            </p>
            {data.sections && data.sections.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium">Section Types:</h4>
                <ul className="list-disc list-inside">
                  {data.sections.map((section, index) => (
                    <li key={index}>
                      {section._type} - {section.title || 'No title'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">SEO</h3>
            <p>
              <strong>Meta Title:</strong> {data.seo?.metaTitle || 'Not set'}
            </p>
            <p>
              <strong>Meta Description:</strong>{' '}
              {data.seo?.metaDescription || 'Not set'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Raw Data (JSON)</h2>
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div className="mt-6 space-x-4">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Homepage
        </Link>
        <Link
          href="/studio"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Open Studio
        </Link>
      </div>
    </div>
  );
}
