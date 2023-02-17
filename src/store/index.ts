import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { App } from 'vue'
import { useAppStore } from './app'
import { useConfigStore } from './config'

function setupPinia(app: App<Element>) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

export { setupPinia, useAppStore, useConfigStore }
