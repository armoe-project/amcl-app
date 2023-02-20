import { readDir } from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { appGlobal } from '../app'

function getSystemLanguage() {
  const arr = navigator.language.split('-')
  return `${arr[0]}-${arr[1].toUpperCase()}`
}

async function setBackground(type: 'default' | 'local' | 'network', network?: string) {
  let background = 'url(/images/default-background.jpg)'
  switch (type) {
    case 'local':
      const backgroundDir = await resolve(appGlobal.env.dataDir, 'background')
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

export { getSystemLanguage, setBackground }
