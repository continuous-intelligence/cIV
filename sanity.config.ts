'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'civ-cms',
  title: 'cIV CMS',

  projectId: '2wkojhph',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',

  // Configure the API version
  apiVersion: '2024-01-01',

  // Configure CORS for development
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://localhost:3000'],
  },
});
