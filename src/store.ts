import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: 'en-US'
  })
})
