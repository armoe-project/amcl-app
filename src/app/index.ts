import { platform } from '@tauri-apps/api/os'
import { appWindow } from '@tauri-apps/api/window'
import { logger } from '../utils'

async function setupApp() {
  logger.info('Armoe Minecraft Launcher')
  logger.info('文档: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  const platformName = await platform()
  if (platformName != 'darwin') {
    await appWindow.setDecorations(false)
  }
}

export { setupApp }
