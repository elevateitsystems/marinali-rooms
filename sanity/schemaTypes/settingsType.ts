import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex code for the background color (e.g., #F8F6F2)',
      initialValue: '#F8F6F2',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex code for the text color (e.g., #123149)',
      initialValue: '#123149',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex code for the primary color (e.g., #E11D48)',
      initialValue: '#E11D48', // Default rose-600
    }),

    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
      description: 'Hex code for the secondary color (e.g., #4F46E5)',
      initialValue: '#4F46E5', // Default indigo-600
    }),
  ],
})
