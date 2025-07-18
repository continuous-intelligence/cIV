export const projectId = '2wkojhph';
export const dataset = 'production';
export const apiVersion = '2024-01-01';
export const useCdn = process.env.NODE_ENV === 'production';

// Used for the client
export const token = process.env.SANITY_AUTH_TOKEN || '';

// Used for Sanity Studio
export const previewSecretId = 'preview.secret';
