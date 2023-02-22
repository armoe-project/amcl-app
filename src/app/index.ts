import { useConfigStore } from '../store'
import { logger, setBackground } from '../utils'
import { createDir, exists } from '@tauri-apps/api/fs'
import { appGlobal, setupAppGlobal } from './global'

async function initializeDirectory() {
  const dataDir = appGlobal.env.dataDir
  if (!(await exists(dataDir))) await createDir(dataDir)

  const backgroundDir = appGlobal.env.backgroundDir
  if (!(await exists(backgroundDir))) await createDir(backgroundDir)

  const tempDir = appGlobal.env.tempDir
  if (!(await exists(tempDir))) await createDir(tempDir)
}

async function setupBackground() {
  const configStore = useConfigStore()
  const background = configStore.background
  setBackground(background.type, background.network)
}

async function setupApp() {
  await setupAppGlobal()
  await initializeDirectory()
  await setupBackground()

  logger.info('Armoe Minecraft Launcher')
  logger.info('文档: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  logger.debug(appGlobal)
}

export { setupApp, appGlobal }
