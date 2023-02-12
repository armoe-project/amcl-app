import { createApp } from 'vue'
import App from './App.vue'
import { setupApp, setupI18n, setupIcon, setupPinia, setupRouter } from './utils'

await setupApp()

const app = createApp(App)

setupIcon(app)
setupRouter(app)
setupPinia(app)
setupI18n(app)

app.mount('#app')
