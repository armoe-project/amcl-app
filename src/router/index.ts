import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index/index.vue'
import HomeView from '../views/home/index.vue'
import SettingsView from '../views/settings/index.vue'
import { App } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView
    }
  ]
})

function setupRouter(app: App<Element>) {
  app.use(router)
}

export { setupRouter }
