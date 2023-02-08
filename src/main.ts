import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')

console.log('Armoe Minecraft Launcher')
console.log('Github: https://github.com/armoe-project/amcl-app')
