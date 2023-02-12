import { createApp } from 'vue'
import App from './App.vue'
import { createSetup } from './utils'

const app = createApp(App)

const setup = createSetup(app)
setup.setupRouter()
setup.setupPinia()
setup.setupI18n()
setup.setupElementPlus()

app.mount('#app')
