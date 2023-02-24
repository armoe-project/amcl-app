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
    common: {}
  }
})

export { vueGlobal }
