import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import HomeView from '../views/HomeView.vue'
import SettingsView from '../views/SettingsView.vue'

export default createRouter({
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
