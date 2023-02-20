import { useConfigStore } from '../store'
import { logger, setBackground } from '../utils'
import { createDir, exists } from '@tauri-apps/api/fs'
import { appGlobal, setupAppGlobal } from './global'
import { resolve } from '@tauri-apps/api/path'

async function setupBackground() {
  const backgroundDir = await resolve(appGlobal.env.dataDir, 'background')
  if (!(await exists(backgroundDir))) await createDir(backgroundDir, { recursive: true })
  const configStore = useConfigStore()
  const background = configStore.background
  setBackground(background.type, background.network)
}

async function setupApp() {
  await setupAppGlobal()
  await setupBackground()

  logger.info('Armoe Minecraft Launcher')
  logger.info('文档: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  logger.debug(appGlobal)

}

export { setupApp, appGlobal }
