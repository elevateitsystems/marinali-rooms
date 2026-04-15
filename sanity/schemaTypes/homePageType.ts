import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Italian', value: 'it' },
          { title: 'German', value: 'de' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'en',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'text',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
    }),
  ],
})
