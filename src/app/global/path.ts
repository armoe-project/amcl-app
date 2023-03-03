import { tempdir } from '@tauri-apps/api/os'
import { dataDir as osDataDir, resolve, resourceDir, homeDir } from '@tauri-apps/api/path'
import { appGlobal } from '.'

async function backgroundDir() {
  return await resolve(await dataDir(), 'background')
}

async function dataDir() {
  switch (appGlobal.os.type) {
    case 'Windows_NT':
      return await resolve(await resourceDir(), 'AMCL')
    case 'Darwin':
      return await resolve(await osDataDir(), 'AMCL')
    case 'Linux':
      return await resolve(await homeDir(), '.amcl')
  }
}

async function downloadDir() {
  return await resolve(await dataDir(), 'download')
}

async function minecraftDir() {
  switch (appGlobal.os.type) {
    case 'Windows_NT':
      return await resolve(await resourceDir(), '.minecraft')
    case 'Darwin':
      return await resolve(await osDataDir(), 'minecraft')
    case 'Linux':
      return await resolve(await homeDir(), '.minecraft')
  }
}

async function setupPath() {
  appGlobal.path = {
    backgroundDir: await backgroundDir(),
    dataDir: await dataDir(),
    downloadDir: await downloadDir(),
    minecraftDir: await minecraftDir(),
    tempDir: await resolve(await dataDir(), 'temp')
  }
}

export { setupPath }
