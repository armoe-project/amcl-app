import { Logger } from '../utils'
import { createDir, exists, writeBinaryFile } from '@tauri-apps/api/fs'
import { appGlobal, setupAppGlobal } from './global'
import { config, setConfig, setupConfig } from './config'
import { resolve } from '@tauri-apps/api/path'

const logger = new Logger('App')

async function initializeDirectory() {
  const dataDir = appGlobal.path.dataDir
  if (!(await exists(dataDir))) await createDir(dataDir)

  const backgroundDir = appGlobal.path.backgroundDir
  if (!(await exists(backgroundDir))) await createDir(backgroundDir)

  const downloadDir = appGlobal.path.downloadDir
  if (!(await exists(downloadDir))) await createDir(downloadDir)

  const minecraftDir = appGlobal.path.minecraftDir
  if (!(await exists(minecraftDir))) await createDir(minecraftDir)

  const tempDir = appGlobal.path.tempDir
  if (!(await exists(tempDir))) await createDir(tempDir)
}

async function setupApp() {
  await setupAppGlobal()
  await initializeDirectory()
  await setupConfig()

  const response = await fetch('/classes/AMCLBridge.class')
  const buffer = await response.arrayBuffer()
  const file = await resolve(appGlobal.path.tempDir, 'AMCLBridge.class')
  await writeBinaryFile(file, buffer)

  logger.info(appGlobal.app.appName)
  logger.info('Homepage: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  const os = appGlobal.os
  logger.info(`Operating System: ${os.type} ${os.version} (${os.arch})`)
  logger.info(`App Version: ${appGlobal.app.appVersion}`)
  logger.info(`Tauri Version: ${appGlobal.app.tauriVersion}`)
}

export { setupApp, appGlobal, config, setConfig }
