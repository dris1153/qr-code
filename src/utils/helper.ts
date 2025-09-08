import { setCookie } from '@/libs/cookie'
import { LOCALES } from '@/translations/languages'
import { loadCatalog } from '@/translations/pagesRouterI18n'
import { i18n } from '@lingui/core'

export const changeLanguage = async (lang: LOCALES) => {
  const messages = await loadCatalog(lang)
  setCookie('NEXT_LINGUI_LOCALE', lang)
  i18n.loadAndActivate({ locale: lang, messages: messages })
}
