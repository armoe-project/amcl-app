import { Arch, Platform, OsType } from '@tauri-apps/api/os'
import { GlobalThemeOverrides } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

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

interface Vue {
  theme: BuiltInGlobalTheme | null
  themeOverrides: GlobalThemeOverrides
}

export type { App, Config, Os, Path, Vue }
