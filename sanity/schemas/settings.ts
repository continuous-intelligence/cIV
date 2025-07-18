import { defineType, defineField } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO',
    }),
    defineField({
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'The main URL of your site',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Upload a 32x32 PNG for best results',
      options: {
        accept: 'image/png,image/x-icon',
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Recommended size: 1200x630 pixels',
        },
        {
          name: 'twitterImage',
          title: 'Default Twitter Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Recommended size: 1200x600 pixels',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Your Google Analytics tracking ID (e.g., G-XXXXXXXXXX)',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Your Google Tag Manager container ID (e.g., GTM-XXXXXXX)',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          description: 'Message to show when site is in maintenance mode',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'logo',
    },
  },
}) 