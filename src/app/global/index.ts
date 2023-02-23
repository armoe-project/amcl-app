import { setupApp } from './app'
import { setupConfig } from './config'
import { setupOs } from './os'
import { setupPath } from './path'
import { App, Config, Os, Path } from './types'

class AppGlobal {
  app!: App
  config!: Config
  os!: Os
  path!: Path
}

const appGlobal = new AppGlobal()

async function setupAppGlobal() {
  await setupApp()
  await setupOs()
  await setupPath()
  await setupConfig()
}

export { appGlobal, setupAppGlobal }
