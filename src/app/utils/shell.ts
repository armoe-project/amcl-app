import { Command } from '@tauri-apps/api/shell'
import { appGlobal } from '..'
import { Logger } from '../../utils'

const logger = new Logger('Shell')

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

  logger.debug('Command: ', shCmd)
  logger.debug('Args: ', ...shArgs)

  const command = new Command(shCmd, shArgs, { encoding: shEncoding })
  const output = await command.execute()

  if (output.code == 0) {
    logger.debug('Output STDOUT: ', output.stdout)
  } else {
    logger.debug('Output STDERR: ', output.code, output.stderr)
  }

  return output
}

export { execShell }
