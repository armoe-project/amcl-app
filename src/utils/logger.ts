import { appGlobal } from '../app'

enum LogType {
  INFO = 'I',
  WARN = 'W',
  ERROR = 'E',
  DEBUG = 'D'
}

class Logger {
  /**
   * 信息
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 App
   */
  info(msg: any, tag: string = 'App') {
    this.log(msg, tag, LogType.INFO)
  }

  /**
   * 警告
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 App
   */
  warn(msg: any, tag: string = 'App') {
    this.log(msg, tag, LogType.WARN)
  }

  /**
   * 错误
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 App
   */
  error(msg: any, tag: string = 'App') {
    this.log(msg, tag, LogType.ERROR)
  }

  /**
   * 调试信息
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 App
   */
  debug(msg: any, tag: string = 'App') {
    if (appGlobal.env.devMode) {
      this.log(msg, tag, LogType.DEBUG)
    }
  }

  /**
   *
   * @param msg
   * @param tag
   * @param type
   * @param color
   */
  private log(msg: any, tag: string, type: LogType) {
    if (tag != '') tag = `${tag}`
    const time = new Date().toLocaleTimeString()
    const prefix = `[${type}][${time}-${tag}]:`

    switch (type) {
      case LogType.INFO:
        if (typeof msg == 'string') {
          console.log(`${prefix} ${msg}`)
        } else {
          console.log(prefix, msg)
        }
        break
      case LogType.WARN:
        if (typeof msg == 'string') {
          console.warn(`${prefix} ${msg}`)
        } else {
          console.warn(prefix, msg)
        }
        break
      case LogType.ERROR:
        if (typeof msg == 'string') {
          console.error(`${prefix} ${msg}`)
        } else {
          console.error(prefix, msg)
        }
        break
      case LogType.DEBUG:
        if (typeof msg == 'string') {
          console.warn(`${prefix} ${msg}`)
        } else {
          console.warn(prefix, msg)
        }
        break
    }
  }
}

/**
 * 日志封装
 */
export const logger = new Logger()
