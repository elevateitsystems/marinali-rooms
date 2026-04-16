import { type SchemaTypeDefinition } from 'sanity'
import { homePageType } from './homePageType'
import { aboutPageType } from './aboutPageType'
import { contactPageType } from './contactPageType'
import { settingsType } from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePageType, aboutPageType, contactPageType, settingsType],
}
