import { useConfigStore } from '../store'
import { logger, setBackground } from '../utils'
import { createDir, exists } from '@tauri-apps/api/fs'
import { appGlobal, setupAppGlobal } from './global'

async function initializeDirectory() {
  const dataDir = appGlobal.path.dataDir
  if (!(await exists(dataDir))) await createDir(dataDir)

  const backgroundDir = appGlobal.path.backgroundDir
  if (!(await exists(backgroundDir))) await createDir(backgroundDir)

  const downloadDir = appGlobal.path.downloadDir
  if (!(await exists(downloadDir))) await createDir(downloadDir)

  const minecraftDir = appGlobal.path.minecraftDir
  if (!(await exists(minecraftDir))) await createDir(minecraftDir)
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

  logger.info(appGlobal.app.appName)
  logger.info('Homepage: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  const os = appGlobal.os
  logger.info(`Operating System: ${os.type} ${os.version} (${os.arch})`)
  logger.info(`App Version: ${appGlobal.app.appVersion}`)
  logger.info(`Tauri Version: ${appGlobal.app.tauriVersion}`)

  logger.debug(appGlobal)
}

export { setupApp, appGlobal }
