import messages from '@intlify/unplugin-vue-i18n/messages'
import { App } from 'vue'
import { createI18n, I18n } from 'vue-i18n'
import { useConfigStore } from '../store'

let i18n: I18n

function setupI18n(app: App<Element>) {
  const store = useConfigStore()
  let language = store.language
  if (language == 'auto') {
    language = navigator.language
  }
  i18n = createI18n({
    fallbackLocale: 'en-US',
    locale: language,
    messages
  })
  app.use(i18n)
}

function setLanguage(language: string) {
  i18n.global.locale = language
}

export { setupI18n, setLanguage }
