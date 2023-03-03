import { Ref } from 'vue'
import { setupApp } from './app'
import { setupOs } from './os'
import { setupPath } from './path'
import { App, Os, Path, Vue } from './types'
import { setupVue } from './vue'

class AppGlobal {
  app!: App
  os!: Os
  path!: Path
  vue!: Ref<Vue>
}

const appGlobal = new AppGlobal()

async function setupAppGlobal() {
  await setupApp()
  await setupOs()
  await setupPath()
  await setupVue()
}

export { appGlobal, setupAppGlobal }
