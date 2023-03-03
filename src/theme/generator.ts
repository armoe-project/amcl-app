import { generate } from '@ant-design/colors'
import { useOsTheme } from 'naive-ui'
import { config } from '../app'

function generateTheme(color: string) {
  let theme: 'dark' | 'default' = 'default'

  switch (config.theme) {
    case 'auto':
      const osTheme = useOsTheme()
      if (osTheme.value == 'dark') {
        theme = 'dark'
      }
      break
    case 'dark':
      theme = 'dark'
      break
  }

  const colors = generate(color, { theme })
  return {
    primaryColor: colors[5],
    primaryColorHover: colors[3],
    primaryColorPressed: colors[6],
    primaryColorSuppl: colors[4]
  }
}

export { generateTheme }
