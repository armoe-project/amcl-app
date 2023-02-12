<template>
  <suspense>
    <el-config-provider :locale="locale">
      <tool-bar />
      <router-view />
    </el-config-provider>
  </suspense>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { onMounted } from 'vue'
import locale from 'element-plus/es/locale/lang/zh-cn'
import ToolBar from './components/ToolBar.vue'
import { appWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/api/os'
import { logger } from './utils'

onMounted(async () => {
  logger.info('Armoe Minecraft Launcher')
  logger.info('文档: https://amcl.armoe.cn')
  logger.info('Github: https://github.com/armoe-project/amcl-app')

  const platformName = await platform()
  if (platformName != 'darwin') {
    appWindow.setDecorations(false)
  }
  const isDark = useDark()
  useToggle(isDark)
})
</script>

<style lang="scss">
@use 'element-plus/theme-chalk/dark/css-vars.css';
@use './styles/index.scss';
</style>
