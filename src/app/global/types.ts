import { Arch, Platform, OsType } from '@tauri-apps/api/os'

interface App {
  appName: string
  appVersion: string
  tauriVersion: string
}

interface Config {
  devMode: boolean
}

interface Os {
  arch: Arch
  platform: Platform
  type: OsType
  version: string
}

interface Path {
  backgroundDir: string
  dataDir: string
  downloadDir: string
  minecraftDir: string
}

export type { App, Config, Os, Path }
