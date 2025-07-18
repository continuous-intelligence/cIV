import { landingPage } from './schemas/landingPage'
import { blogPost } from './schemas/blogPost'
import { author } from './schemas/author'
import { splashScreen } from './schemas/splashScreen'
import { settings } from './schemas/settings'

export const schemaTypes = [
  // Pages
  landingPage,
  splashScreen,
  
  // Content
  blogPost,
  author,
  
  // Settings
  settings,
] 