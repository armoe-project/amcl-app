import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import SettingsView from '../views/settings/index.vue'
import { App } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home'
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
