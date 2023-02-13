import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n, setupIcon, setupPinia, setupRouter } from './utils'
import { setupApp } from './app'

setupApp()

const app = createApp(App)

setupIcon(app)
setupRouter(app)
setupPinia(app)
setupI18n(app)

app.mount('#app')
