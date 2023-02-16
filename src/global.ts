import { GlobalThemeOverrides } from 'naive-ui'
import { Ref, ref } from 'vue'

const globalThemeOverrides: Ref<GlobalThemeOverrides> = ref({
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
})

export { globalThemeOverrides }
