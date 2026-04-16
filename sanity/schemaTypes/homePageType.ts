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

    // Booking Bar Section
    defineField({
      name: 'bookingWhereLabel',
      title: 'Booking: Where Label',
      type: 'string',
      initialValue: 'Where',
    }),
    defineField({
      name: 'bookingWhereValue',
      title: 'Booking: Where Value',
      type: 'string',
      initialValue: 'Marinali Rooms',
    }),
    defineField({
      name: 'bookingDatesLabel',
      title: 'Booking: Dates Label',
      type: 'string',
      initialValue: 'Check In - Check Out',
    }),
    defineField({
      name: 'bookingDatesValue',
      title: 'Booking: Dates Value',
      type: 'string',
      initialValue: 'Select Dates',
    }),
    defineField({
      name: 'bookingWhoLabel',
      title: 'Booking: Who Label',
      type: 'string',
      initialValue: 'Guests',
    }),
    defineField({
      name: 'bookingRoomsLabel',
      title: 'Booking: Rooms Label',
      type: 'string',
      initialValue: 'Rooms',
    }),
    defineField({
      name: 'bookingCodeLabel',
      title: 'Booking: Code Label',
      type: 'string',
      initialValue: 'Do you have a code?',
    }),
    defineField({
      name: 'bookingCodeValue',
      title: 'Booking: Code Value',
      type: 'string',
      initialValue: 'Enter Code',
    }),
    defineField({
      name: 'bookingButtonText',
      title: 'Booking: Button Text',
      type: 'string',
      initialValue: 'Book Now',
    }),

  ],
})
