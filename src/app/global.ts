import { getName, getTauriVersion, getVersion } from '@tauri-apps/api/app'
import { arch, Arch, OsType, platform, Platform, tempdir, type, version } from '@tauri-apps/api/os'
import {
  appDataDir,
  dataDir as osDataDir,
  homeDir,
  resolve,
  resourceDir
} from '@tauri-apps/api/path'

interface App {
  appName: string
  appVersion: string
  tauriVersion: string
}

interface Env {
  backgroundDir: string
  dataDir: string
  devMode: boolean
  officialMinecraftDir: string
}

interface Os {
  arch: Arch
  platform: Platform
  tempDir: string
  type: OsType
  version: string
}

class AppGlobal {
  app!: App
  env!: Env
  os!: Os
}

const appGlobal = new AppGlobal()

async function dataDir() {
  switch (appGlobal.os.type) {
    case 'Windows_NT':
      return await resolve(await resourceDir(), '.amcl\\')
    case 'Darwin':
      return await resolve(await appDataDir())
    case 'Linux':
      return await resolve(await homeDir(), '.amcl/')
  }
}

async function officialMinecraftDir() {
  switch (appGlobal.os.type) {
    case 'Windows_NT':
      return await resolve(await osDataDir(), '.minecraft\\')
    case 'Darwin':
      return await resolve(await osDataDir(), 'minecraft/')
    case 'Linux':
      return await resolve(await homeDir(), '.minecraft/')
  }
}

function devMode() {
  return import.meta.env.DEV
}

async function setupAppGlobal() {
  appGlobal.app = {
    appName: await getName(),
    appVersion: await getVersion(),
    tauriVersion: await getTauriVersion()
  }
  appGlobal.os = {
    arch: await arch(),
    platform: await platform(),
    tempDir: await tempdir(),
    type: await type(),
    version: await version()
  }

  appGlobal.env = {
    backgroundDir: await resolve(await dataDir(), 'background'),
    dataDir: await dataDir(),
    devMode: devMode(),
    officialMinecraftDir: await officialMinecraftDir()
  }
}

export { appGlobal, setupAppGlobal }
