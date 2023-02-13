import router from '../router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { App } from 'vue'
import { useAppStore } from '../stoere'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function setupIcon(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

function setupRouter(app: App<Element>) {
  app.use(router)
}

function setupPinia(app: App<Element>) {
  const pinia = createPinia()
  app.use(pinia)
}

function setupI18n(app: App<Element>) {
  const store = useAppStore()
  let language = store.language
  if (language == 'auto') {
    language = navigator.language
  }
  const i18n = createI18n({
    fallbackLocale: 'en-US',
    locale: language,
    messages
  })
  app.use(i18n)
}

export { setupIcon, setupRouter, setupPinia, setupI18n }
