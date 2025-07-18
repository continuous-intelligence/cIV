import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './sanity.api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: 'published',
})

// Client for server-side with auth token
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
  perspective: 'published',
})

// Client for preview mode
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
  perspective: 'previewDrafts',
})

// Helper function to get the right client
export function getClient(preview?: boolean) {
  return preview ? previewClient : client
} 