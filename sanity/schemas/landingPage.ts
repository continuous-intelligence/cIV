import { defineType, defineField } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureSection',
          title: 'Feature Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Feature Title',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Feature Description',
                      type: 'text',
                    },
                    {
                      name: 'icon',
                      title: 'Feature Icon',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'testimonialSection',
          title: 'Testimonial Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'quote',
                      title: 'Quote',
                      type: 'text',
                    },
                    {
                      name: 'author',
                      title: 'Author',
                      type: 'string',
                    },
                    {
                      name: 'company',
                      title: 'Company',
                      type: 'string',
                    },
                    {
                      name: 'avatar',
                      title: 'Avatar',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call to Action Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'primaryButton',
              title: 'Primary Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                },
              ],
            },
            {
              name: 'secondaryButton',
              title: 'Secondary Button',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
}) 