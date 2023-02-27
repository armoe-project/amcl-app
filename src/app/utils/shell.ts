import { Command } from '@tauri-apps/api/shell'
import { appGlobal } from '..'

async function execShell(cmd: string, args: string[]) {
  let shCmd
  let shArgs
  let shEncoding = 'utf-8'
  switch (appGlobal.os.type) {
    case 'Windows_NT':
      shCmd = 'cmd'
      shArgs = ['/c', cmd, ...args]
      if (window.navigator.language.includes('zh')) {
        shEncoding = 'gbk'
      }
      break
    case 'Darwin':
    case 'Linux':
      shCmd = 'sh'
      shArgs = ['-c', `${cmd} ${args.join(' ').trim()}`]
      break
  }

  const command = new Command(shCmd, shArgs, { encoding: shEncoding })
  const output = await command.execute()
  return output
}

export { execShell }
