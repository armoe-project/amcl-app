import { readDir } from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { darkTheme, useOsTheme } from 'naive-ui'
import { watch } from 'vue'
import { appGlobal, config } from '../app'
import { vueGlobal } from '../global'
import { logger } from '../utils'

async function setBackground(type: 'default' | 'local' | 'network', network?: string) {
  let background = 'url(/images/default-background.jpg)'
  switch (type) {
    case 'local':
      const backgroundDir = await resolve(appGlobal.path.dataDir, 'background')
      const backgrounds = await readDir(backgroundDir)
      if (backgrounds.length == 0) break
      const random = Math.floor(Math.random() * backgrounds.length)
      const bg = backgrounds[random]
      const url = convertFileSrc(bg.path)
      background = `url(${url})`
      break
    case 'network':
      if (network == '') break
      background = `url(${network})`
  }
  const element = document.documentElement
  element.style.setProperty('background-image', background)
}

function setTheme(theme: 'dark' | 'light' | null) {
  logger.info(`Theme: ${theme}`)
  if (theme == 'dark') {
    document.documentElement.style.setProperty('--amcl-bg-color', 'rgba(0, 0, 0, 0.65)')
    vueGlobal.value.theme = darkTheme
  } else {
    document.documentElement.style.setProperty('--amcl-bg-color', 'rgba(255, 255, 255, 0.5)')
    vueGlobal.value.theme = null
  }
}

function setupTheme() {
  const osTheme = useOsTheme()

  switch (config.theme) {
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

  const background = config.background
  setBackground(background.type, background.network)
}

export { setupTheme, setBackground }
