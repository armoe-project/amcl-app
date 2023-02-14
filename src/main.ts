import { createApp } from 'vue'
import App from './App.vue'
import { logger, setupI18n, setupIcon, setupPinia, setupRouter } from './utils'

const app = createApp(App)

setupIcon(app)
setupRouter(app)
setupPinia(app)
setupI18n(app)

app.mount('#app')

logger.info('Armoe Minecraft Launcher')
logger.info('文档: https://amcl.armoe.cn')
logger.info('Github: https://github.com/armoe-project/amcl-app')
