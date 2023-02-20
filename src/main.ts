import { createApp } from 'vue'
import App from './App.vue'
import { setupIcons } from './icons'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import { setupPinia } from './store'

const app = createApp(App)

setupIcons(app)
setupRouter(app)
setupPinia(app)
setupI18n(app)

app.mount('#app')
