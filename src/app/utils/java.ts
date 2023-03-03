import { appGlobal } from '../global'
import { execShell } from './shell'

async function getJavaInfo(path: string): Promise<any | undefined> {
  let workspace = appGlobal.path.tempDir.replace(/\\\\\?\\/, '')
  if (appGlobal.os.type != 'Windows_NT') {
    workspace = `'${workspace}'`
  }
  const output = await execShell('cd', [workspace, '&&', path, 'AMCLBridge'])
  try {
    const info = JSON.parse(output.stdout)
    return info
  } catch (e) {
    return undefined
  }
}

async function getSystemJavaListInPath() {
  let cmd = 'which -a'
  if (appGlobal.os.type == 'Windows_NT') cmd = 'where'

  const output = await execShell(cmd, ['java'])

  if ((output.stdout = '')) return []

  const list = output.stdout.split('\n').map((item) => item.replace(/\r/g, ''))
  return list
}

export { getSystemJavaListInPath, getJavaInfo }
