import { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/core/macro'

interface Languages {
  locale: string
  name: MessageDescriptor
  rtl: boolean
}

export type LOCALES = 'en' | 'nl' | 'zh' | 'pseudo'

const languages: Languages[] = [
  {
    locale: 'en',
    name: msg`English`,
    rtl: false,
  },
  {
    locale: 'nl',
    name: msg`Dutch`,
    rtl: false,
  },
  {
    locale: 'zl',
    name: msg`Chinese`,
    rtl: false,
  },
]

if (process.env.NODE_ENV !== 'production') {
  languages.push({
    locale: 'pseudo',
    name: msg`Pseudo`,
    rtl: false,
  })
}

export default languages
