import router from '../router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { App } from 'vue'
import { useAppStore } from '../stoere'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

class Setup {
  app: App<Element>

  constructor(app: App<Element>) {
    this.app = app
  }

  setupElementPlus() {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      this.app.component(key, component)
    }
  }

  setupRouter() {
    this.app.use(router)
  }

  setupPinia() {
    const pinia = createPinia()
    this.app.use(pinia)
  }

  setupI18n() {
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
    this.app.use(i18n)
  }
}

export const createSetup = (app: App<Element>) => new Setup(app)
