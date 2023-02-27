import { appGlobal } from '../global'
import { execShell } from './shell'

async function getJavaInfo(path: string) {
  const workspace = appGlobal.path.downloadDir.replace(/\\\\\?\\/, '')
  const output = await execShell('cd', [`'${workspace}'`, '&&', path, 'AMCLBridge'])
  const info = JSON.parse(output.stdout)
  return info
}

async function getSystemJavaListInPath() {
  let cmd = 'which -a'
  if (appGlobal.os.type == 'Windows_NT') cmd = 'where'

  const output = await execShell(cmd, ['java'])

  const list = output.stdout.split('\n').map((item) => item.replace(/\r/g, ''))
  return list
}

export { getSystemJavaListInPath, getJavaInfo }
