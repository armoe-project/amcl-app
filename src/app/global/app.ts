import { getName, getVersion, getTauriVersion } from '@tauri-apps/api/app'
import { appGlobal } from '.'

async function setupApp() {
  appGlobal.app = {
    appName: await getName(),
    appVersion: await getVersion(),
    tauriVersion: await getTauriVersion()
  }
}

export { setupApp }
