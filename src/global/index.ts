import { GlobalThemeOverrides } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { Ref, ref } from 'vue'

interface VueGlobal {
  theme: BuiltInGlobalTheme | null
  themeOverrides: GlobalThemeOverrides
}

const vueGlobal: Ref<VueGlobal> = ref({
  theme: null,
  themeOverrides: {
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
})

export { vueGlobal }
