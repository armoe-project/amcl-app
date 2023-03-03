import { appGlobal, config } from '../app'

class Logger {
  private tag: string

  constructor(tag: string) {
    this.tag = tag
  }

  /**
   * 信息
   *
   * @param msg 日志内容
   */
  info(...msg: any[]) {
    this.log('INFO', ...msg)
  }

  /**
   * 警告
   *
   * @param msg 日志内容
   */
  warn(...msg: any[]) {
    this.log('WARN', ...msg)
  }

  /**
   * 错误
   *
   * @param msg 日志内容
   */
  error(...msg: any[]) {
    this.log('ERROR', ...msg)
  }

  /**
   * 调试信息
   *
   * @param msg 日志内容
   */
  debug(...msg: any[]) {
    this.log('DEBUG', ...msg)
  }

  private log(type: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', ...msg: any) {
    const time = new Date().toLocaleTimeString()
    const prefix = `[${time}-${type}][${this.tag}]:`

    switch (type) {
      case 'INFO':
        console.info(prefix, ...msg)
        break
      case 'WARN':
        console.warn(prefix, ...msg)
        break
      case 'ERROR':
        console.error(prefix, ...msg)
        break
      case 'DEBUG':
        if (!config.debug) if (!import.meta.env.DEV) return
        console.log(prefix, ...msg)
        break
    }
  }
}

export { Logger }
