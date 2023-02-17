import { createApp } from 'vue'
import App from './App.vue'
import { setupIcons } from './icons'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import { setupPinia } from './store'
import { logger } from './utils'

const app = createApp(App)

setupIcons(app)
setupRouter(app)
setupPinia(app)
setupI18n(app)

app.mount('#app')

logger.info('Armoe Minecraft Launcher')
logger.info('文档: https://amcl.armoe.cn')
logger.info('Github: https://github.com/armoe-project/amcl-app')
