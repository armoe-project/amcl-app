import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => {
    return {
      current: '/',
      theme: 'auto',
      lang: 'zh-CN'
    }
  }
})

export { useMainStore }
