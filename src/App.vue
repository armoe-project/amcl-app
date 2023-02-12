<template>
  <el-config-provider :locale="locale">
    <global-toolbar />
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import locale from 'element-plus/es/locale/lang/zh-cn'
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
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
@use './styles/index.scss';
</style>
