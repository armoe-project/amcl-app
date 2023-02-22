import { defineStore } from 'pinia'

interface ConfigStore {
  theme: 'auto' | 'light' | 'dark'
  language: string
  themeColor: string
  background: {
    type: 'default' | 'local' | 'network'
    network: string
  }
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    theme: 'auto',
    language: 'auto',
    themeColor: '#1166FF',
    background: {
      type: 'default',
      network: ''
    }
  }),
  actions: {
    setTheme(theme: 'auto' | 'light' | 'dark') {
      this.theme = theme
    },
    setLanguage(language: string) {
      this.language = language
    },
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor
    },
    setBackground(type: 'default' | 'local' | 'network', network?: string) {
      this.background.type = type
      if (network) {
        this.background.network = network
      }
    },
    resetBackground() {
      this.background.type = 'default'
    }
  },
  persist: true
})
