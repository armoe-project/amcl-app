import { appGlobal } from '.'

async function setupConfig() {
  appGlobal.config = {
    devMode: import.meta.env.DEV
  }
}

export { setupConfig }
