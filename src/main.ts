import { createApp } from 'vue'
import { setupApp } from './app'
import App from './App.vue'
import { setupIcons } from './icons'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import { setupTheme } from './theme'

const app = createApp(App)

async function setup() {
  await setupApp()
  setupIcons(app)
  setupRouter(app)
  setupI18n(app)
  app.mount('#app')
  setupTheme()
}

setup()
