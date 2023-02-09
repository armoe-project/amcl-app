enum LogType {
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error'
}

class Logger {
  /**
   * 信息
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 Launcher
   */
  info(msg: string, tag: string = 'Launcher') {
    this.log(msg, tag, LogType.INFO)
  }

  /**
   * 警告
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 Launcher
   */
  warn(msg: string, tag: string = 'Launcher') {
    this.log(msg, tag, LogType.WARN)
  }

  /**
   * 错误
   *
   * @param msg 日志内容
   * @param tag 标签 默认为 Launcher
   */
  error(msg: string, tag: string = 'Launcher') {
    this.log(msg, tag, LogType.ERROR)
  }

  /**
   *
   * @param msg
   * @param tag
   * @param type
   * @param color
   */
  private log(msg: string, tag: string, type: LogType) {
    if (tag != '') tag = `${tag}`
    const time = new Date().toLocaleTimeString()
    const message = `[${time}-${tag}]: ${msg}`

    switch (type) {
      case LogType.INFO:
        console.log(message)
        break
      case LogType.WARN:
        console.warn(message)
        break
      case LogType.ERROR:
        console.error(message)
        break
    }
  }
}

/**
 * 日志封装
 */
export const logger = new Logger()
