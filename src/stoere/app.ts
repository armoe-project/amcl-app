import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    language: 'auto'
  })
})
