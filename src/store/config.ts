import { defineStore } from 'pinia'

interface ConfigStore {
  language: string
  themeColor: string
  background: {
    type: 'default' | 'local' | 'network'
    network: string
  }
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    language: 'auto',
    themeColor: '#1166FF',
    background: {
      type: 'default',
      network: ''
    }
  }),
  actions: {
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
