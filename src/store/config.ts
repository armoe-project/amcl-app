import { defineStore } from 'pinia'

interface ConfigStore {
  language: string
  themeColor: string
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigStore => ({
    language: 'auto',
    themeColor: '#1166FF'
  }),
  actions: {
    setLanguage(language: string) {
      this.language = language
    },
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor
    }
  },
  persist: true
})
