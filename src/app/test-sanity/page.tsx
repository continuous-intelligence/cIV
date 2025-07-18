import { client } from '@/lib/sanity'
import PortableText from '@/components/PortableText'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { urlFor } from '@/lib/image'
import { landingPageQuery } from '@/lib/queries'
import Image from 'next/image'

// Helper function to safely get image URL
function getImageUrl(image: any, width: number = 100, height: number = 100): string | null {
  if (!image?.asset?._ref && !image?.asset?.url) return null
  try {
    if (image.asset?.url) {
      return image.asset.url
    }
    return urlFor(image).width(width).height(height).url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return null
  }
}

async function getTestData() {
  try {
    // Test the main landing page query
    const landingPageData = await client.fetch(landingPageQuery)
    console.log('Landing page data:', JSON.stringify(landingPageData, null, 2))
    
    // Test a simple query to see what's actually in the database
    const allLandingPages = await client.fetch(`*[_type == "landingPage"]{
      _id,
      title,
      slug,
      heroSection {
        headline,
        subheadline,
        backgroundImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    }`)
    
    return {
      landingPageData,
      allLandingPages
    }
  } catch (error) {
    console.error('Error fetching test data:', error)
    return null
  }
}

export default async function TestSanityPage() {
  const data = await getTestData()

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sanity Integration Test</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>❌ Error: Could not fetch data from Sanity</p>
          <p className="mt-2">Please check:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Sanity project configuration</li>
            <li>Environment variables</li>
            <li>Network connection</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Sanity Integration Test - Hero Image Debug</h1>
      
      <div className="grid gap-6">
        {/* Main Landing Page Data */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Main Landing Page Query Result</CardTitle>
            <CardDescription>Data from landingPageQuery</CardDescription>
          </CardHeader>
          <CardContent>
            {data.landingPageData ? (
              <div className="space-y-4">
                <div>
                  <p><strong>Title:</strong> {data.landingPageData.title}</p>
                  <p><strong>ID:</strong> {data.landingPageData._id}</p>
                </div>
                
                {data.landingPageData.heroSection ? (
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-600">Hero Section Found ✅</h4>
                    <p><strong>Headline:</strong> {data.landingPageData.heroSection.headline}</p>
                    <p><strong>Subheadline:</strong> {data.landingPageData.heroSection.subheadline}</p>
                    
                    {data.landingPageData.heroSection.backgroundImage ? (
                      <div className="mt-4 border border-green-200 p-4 rounded">
                        <h5 className="font-semibold text-green-600">Background Image Found ✅</h5>
                        <p><strong>Asset ID:</strong> {data.landingPageData.heroSection.backgroundImage.asset?._id}</p>
                        <p><strong>Asset URL:</strong> {data.landingPageData.heroSection.backgroundImage.asset?.url}</p>
                        <p><strong>Alt Text:</strong> {data.landingPageData.heroSection.backgroundImage.alt || 'No alt text'}</p>
                        
                        {data.landingPageData.heroSection.backgroundImage.asset?.url && (
                          <div className="mt-4">
                            <p className="font-semibold">Image Preview:</p>
                            <Image
                              src={data.landingPageData.heroSection.backgroundImage.asset.url}
                              alt={data.landingPageData.heroSection.backgroundImage.alt || 'Hero background'}
                              width={400}
                              height={200}
                              className="rounded border"
                            />
                          </div>
                        )}
                        
                        {/* Test urlFor function */}
                        {getImageUrl(data.landingPageData.heroSection.backgroundImage, 400, 200) && (
                          <div className="mt-4">
                            <p className="font-semibold">urlFor Generated URL:</p>
                            <p className="text-sm text-gray-600">
                              {getImageUrl(data.landingPageData.heroSection.backgroundImage, 400, 200)}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-4 rounded">
                        <p>❌ No background image found in hero section</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
                    <p>❌ No hero section found</p>
                  </div>
                )}
                
                {/* Raw Data */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Raw Data:</h4>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                    {JSON.stringify(data.landingPageData, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No landing page data found</p>
            )}
          </CardContent>
        </Card>

        {/* All Landing Pages */}
        <Card>
          <CardHeader>
            <CardTitle>🏠 All Landing Pages</CardTitle>
            <CardDescription>All landing page documents in the database</CardDescription>
          </CardHeader>
          <CardContent>
            {data.allLandingPages && data.allLandingPages.length > 0 ? (
              <div className="space-y-4">
                {data.allLandingPages.map((page: any) => (
                  <div key={page._id} className="border border-gray-200 p-4 rounded">
                    <h4 className="font-semibold">{page.title}</h4>
                    <p><strong>ID:</strong> {page._id}</p>
                    <p><strong>Slug:</strong> {page.slug?.current}</p>
                    
                    {page.heroSection ? (
                      <div className="mt-2 text-green-600">
                        <p>✅ Hero section exists</p>
                        <p><strong>Headline:</strong> {page.heroSection.headline}</p>
                        {page.heroSection.backgroundImage ? (
                          <p>✅ Background image exists</p>
                        ) : (
                          <p className="text-red-600">❌ No background image</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-600">❌ No hero section</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
                <p>⚠️ No landing pages found in database</p>
                <p className="mt-2">Please create a landing page in Sanity Studio first:</p>
                <ol className="list-decimal list-inside mt-2">
                  <li>Go to <a href="/studio" className="underline">Sanity Studio</a></li>
                  <li>Click "Landing Page" in the sidebar</li>
                  <li>Click "Create new"</li>
                  <li>Fill in the hero section with headline, subheadline, and background image</li>
                  <li>Publish the document</li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
        <p className="font-semibold">🔍 Debug Information:</p>
        <p className="mt-2">This page helps debug the hero image issue by showing exactly what data is being fetched from Sanity.</p>
        <p className="mt-1">Check the console for additional logging information.</p>
      </div>
    </div>
  )
} 