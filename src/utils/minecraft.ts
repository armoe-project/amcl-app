import { exists, BaseDirectory, createDir, readDir } from '@tauri-apps/api/fs'
import { logger } from './'

const options = { dir: BaseDirectory.Resource, recursive: true }

async function getMCVersions() {
  const result = [{}]
  const dir = '.minecraft/versions'
  if (!(await exists(dir, options))) {
    logger.warn(`目录 ${dir} 不存在.`)
    return
  }
  const versions = await readDir(dir, options)
  versions.forEach((version) => {
    const name = version.name
    const children = version.children
    console.log(name)
    if (children) {
      children.forEach((v) => {
        if (v.name == `${name}.json`) {
          console.log(v.name)
        }
      })
    }
  })
  return result
}

async function initMCDir() {
  const dir = '.minecraft'
  const isExists = await exists(dir, options)
  if (!isExists) {
    createDir(dir, options)
  }
}

export { getMCVersions, initMCDir }
