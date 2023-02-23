import { Arch, Platform, OsType, arch, platform, type, version } from '@tauri-apps/api/os'
import { appGlobal } from '.'

async function setupOs() {
  appGlobal.os = {
    arch: await arch(),
    platform: await platform(),
    type: await type(),
    version: await version()
  }
}

export { setupOs }
