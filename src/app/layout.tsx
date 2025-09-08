import '@/assets/fonts/fonts.css'
import type { Metadata } from 'next'
import './globals.css'
import linguiConfig from '../../lingui.config'
import { siteConfig } from '@/configs/site'
import LayoutProvider from '@/libs/common/LayoutProvider'
import { ReactQueryProvider } from '@/libs/providers'
import { LinguiProvider } from '@/libs/providers/LinguiProvider'
import { allMessages } from '@/translations/appRouterI18n'
import { cookies } from 'next/headers'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export async function generateMetadata(): Promise<Metadata> {
  // props: PageLangParam
  // const i18n = getI18nInstance((await props.params).lang)
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
  }
}
export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  // Ensure that the incoming `locale` is valid
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LINGUI_LOCALE')?.value || 'en'

  return (
    <html lang={locale}>
      <body className="antialiased">
        <LinguiProvider initialLocale={locale} initialMessages={allMessages[locale]!}>
          <ReactQueryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ReactQueryProvider>
        </LinguiProvider>
      </body>
    </html>
  )
}
