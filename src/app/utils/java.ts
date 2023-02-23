import { appGlobal } from '../global'
import { execShell } from './shell'

function formatJavaVersion(path: string, info: string) {
  const home = path.replace('bin/java.exe', '').replace('bin/java', '')
  const version = info.split('version "')[1].split('"')[0]
  return {
    home,
    info,
    version
  }
}

async function getSystemJavaListinPath() {
  const javaList: any[] = []
  let cmd = 'which'
  if (appGlobal.os.type == 'Windows_NT') cmd = 'where'

  const output = await execShell(cmd, ['java'])

  const list = output.stdout.split('\n').map((item) => item.replace(/\r/g, ''))

  for (const item of list) {
    const output = await execShell(item, ['-version'])
    const stderr = output.stderr
    javaList.push(formatJavaVersion(item, stderr))
  }
  console.log(javaList)
  return javaList
}

export { getSystemJavaListinPath }
