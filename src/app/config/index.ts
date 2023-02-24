import { resolve } from '@tauri-apps/api/path'
import { exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { appGlobal } from '../global'

interface JavaInfo {
  home: string
  info: string
  version: string
}

interface Config {
  theme: 'auto' | 'dark' | 'light'
  language: string
  themeColor: string
  background: {
    type: 'default' | 'local' | 'network'
    network: string
  }
  java: {
    use: string
    list: JavaInfo[]
  }
}

let config: Config = {
  theme: 'auto',
  language: 'auto',
  themeColor: '#0088FF',
  background: {
    type: 'default',
    network: ''
  },
  java: {
    use: 'auto',
    list: []
  }
}

let file: string

async function setupConfig() {
  file = await resolve(appGlobal.path.dataDir, 'config.json')
  if (!(await exists(file))) {
    await saveConfig()
  } else {
    const json = await readTextFile(file)
    config = JSON.parse(json)
  }
}

async function saveConfig() {
  const json = JSON.stringify(config, null, 2)
  await writeTextFile(file, json)
}

export { config, setupConfig, saveConfig }
