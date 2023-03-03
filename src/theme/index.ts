import { readDir } from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { darkTheme, GlobalTheme, useOsTheme } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { watch } from 'vue'
import { appGlobal, config } from '../app'
import { Logger } from '../utils'
import { generateTheme } from './generator'

const logger = new Logger('Theme')

let themeWatcher: any = undefined

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

function setTheme(theme: 'auto' | 'dark' | 'light') {
  switch (theme) {
    case 'auto':
      const osTheme = useOsTheme()
      if (themeWatcher) {
        themeWatcher()
        themeWatcher = undefined
      }
      themeWatcher = watch(osTheme, (value) => _setTheme(value), { immediate: true })
      break
    case 'dark':
      _setTheme('dark')
      break
    case 'light':
      _setTheme('light')
      break
  }
}

function _setTheme(theme: 'dark' | 'light' | null) {
  logger.info(`Theme: ${theme}`)
  const bgLabel = '--amcl-bg-color'
  const homeBgLabel = '--amcl-home-card-bg-color'
  let bgValue = 'rgba(0, 0, 0, 0.65)'
  let homeBgValue = 'rgba(0, 0, 0, 0.83)'
  let globalTheme: BuiltInGlobalTheme | null = darkTheme
  if (theme != 'dark') {
    bgValue = 'rgba(255, 255, 255, 0.6)'
    homeBgValue = 'rgba(255, 255, 255, 0.78)'
    globalTheme = null
  }
  appGlobal.vue.value.theme = globalTheme
  document.documentElement.style.setProperty(bgLabel, bgValue)
  document.documentElement.style.setProperty(homeBgLabel, homeBgValue)
  appGlobal.vue.value.themeOverrides.common = generateTheme(config.themeColor)
}

function setupTheme() {
  setTheme(config.theme)

  const background = config.background
  setBackground(background.type, background.network)

  const theme = generateTheme(config.themeColor)
  appGlobal.vue.value.themeOverrides.common = theme
}

export { setupTheme, setTheme, setBackground, generateTheme }
