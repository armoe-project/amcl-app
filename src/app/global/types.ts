import { Arch, Platform, OsType } from '@tauri-apps/api/os'
import { GlobalThemeOverrides } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

interface App {
  appName: string
  appVersion: string
  tauriVersion: string
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
  tempDir: string
}

interface Vue {
  theme: BuiltInGlobalTheme | null
  themeOverrides: GlobalThemeOverrides
}

export type { App, Os, Path, Vue }
