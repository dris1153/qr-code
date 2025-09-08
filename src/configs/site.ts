import { envConfig } from '@/utils'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: '',
  description: '',
  keywords: '',
  url: envConfig.APP_URL,
  ogImage: `${envConfig.APP_URL + '/imgs/og-image.jpg'}`,
}
