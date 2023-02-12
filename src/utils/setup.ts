import router from '../router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { App } from 'vue'
import { useAppStore } from '../stoere'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { logger } from '.'
import { platform } from '@tauri-apps/api/os'
import { appWindow } from '@tauri-apps/api/window'
import { useDark, useToggle } from '@vueuse/core'

async function setupApp() {
  logger.info('Armoe Minecraft Launcher')
  logger.info('文档: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  const platformName = await platform()
  if (platformName != 'darwin') {
    await appWindow.setDecorations(false)
  }

  const isDark = useDark()
  useToggle(isDark)
}

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

export { setupApp, setupIcon, setupRouter, setupPinia, setupI18n }
