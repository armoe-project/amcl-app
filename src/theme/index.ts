import { darkTheme, useOsTheme } from 'naive-ui'
import { watch } from 'vue'
import { vueGlobal } from '../global'
import { useConfigStore } from '../store'

function setTheme(theme: 'dark' | 'light' | null) {
  console.log(theme)
  if (theme == 'dark') {
    document.documentElement.style.setProperty('--amcl-bg-color', 'rgba(0, 0, 0, 0.65)')
    vueGlobal.value.theme = darkTheme
  } else {
    document.documentElement.style.setProperty('--amcl-bg-color', 'rgba(255, 255, 255, 0.5)')
    vueGlobal.value.theme = null
  }
}

function setupTheme() {
  const configStore = useConfigStore()
  const osTheme = useOsTheme()

  switch (configStore.theme) {
    case 'auto':
      watch(osTheme, (value) => setTheme(value), { immediate: true })
      break
    case 'dark':
      setTheme('dark')
      break
    case 'light':
      setTheme('light')
      break
  }
}

export { setupTheme }
