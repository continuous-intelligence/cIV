import { defineType, defineField } from 'sanity'

export const splashScreen = defineType({
  name: 'splashScreen',
  title: 'Splash Screen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Enable Splash Screen',
      type: 'boolean',
      description: 'Turn on/off the splash screen',
      initialValue: true,
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
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline displayed under the brand name',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code for background (e.g., #ffffff)',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color'),
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code for text (e.g., #000000)',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color'),
    }),
    defineField({
      name: 'animationSettings',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Duration (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(10),
          initialValue: 3,
        },
        {
          name: 'fadeIn',
          title: 'Fade In Animation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'fadeOut',
          title: 'Fade Out Animation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'scale',
          title: 'Scale Animation',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'skipButton',
      title: 'Skip Button',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: 'Show Skip Button',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'text',
          title: 'Skip Button Text',
          type: 'string',
          initialValue: 'Skip',
        },
        {
          name: 'position',
          title: 'Button Position',
          type: 'string',
          options: {
            list: [
              { title: 'Top Right', value: 'top-right' },
              { title: 'Top Left', value: 'top-left' },
              { title: 'Bottom Right', value: 'bottom-right' },
              { title: 'Bottom Left', value: 'bottom-left' },
            ],
          },
          initialValue: 'top-right',
        },
      ],
    }),
    defineField({
      name: 'redirectTo',
      title: 'Redirect To',
      type: 'string',
      description: 'Page to redirect to after splash screen (e.g., /home, /landing)',
      initialValue: '/landing',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brandName',
      media: 'logo',
    },
  },
}) 