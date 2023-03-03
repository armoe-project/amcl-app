import messages from '@intlify/unplugin-vue-i18n/messages'
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { config } from '../app'
import { getSystemLanguage } from '../utils'

function setupI18n(app: App<Element>) {
  let language = config.language
  if (language == 'auto') {
    language = getSystemLanguage()
  }
  const i18n = createI18n({
    fallbackLocale: 'en-US',
    locale: language,
    messages
  })
  app.use(i18n)
}

export { setupI18n }
