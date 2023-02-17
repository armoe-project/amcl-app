import { useConfigStore } from '../store'
import { setBackground } from '../utils'
import { resolveResource } from '@tauri-apps/api/path'
import { createDir, exists } from '@tauri-apps/api/fs'

async function setupApp() {
  const backgroundDir = await resolveResource('AMCL/background')
  if (!(await exists(backgroundDir))) await createDir(backgroundDir, { recursive: true })
  const configStore = useConfigStore()
  const background = configStore.background
  setBackground(background.type, background.network)
}

export { setupApp }
