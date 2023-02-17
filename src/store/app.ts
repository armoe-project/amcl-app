import { GlobalThemeOverrides } from 'naive-ui'
import { defineStore } from 'pinia'

interface AppState {
  globalThemeOverrides: GlobalThemeOverrides
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    globalThemeOverrides: {
      common: {
        primaryColor: '#1677ff',
        primaryColorHover: '#4096ff',
        primaryColorPressed: '#0958d9',
        primaryColorSuppl: '#4096ff',
        infoColor: '#1677ff',
        infoColorHover: '#4096ff',
        infoColorPressed: '#0958d9',
        infoColorSuppl: '#4096ff'
      }
    }
  }),
  actions: {
    setGlobalThemeOverrides(globalThemeOverrides: GlobalThemeOverrides) {
      this.globalThemeOverrides = globalThemeOverrides
    }
  },
  persist: true
})
