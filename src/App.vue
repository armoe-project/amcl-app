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

onMounted(async () => {
  const platformName = await platform()
  if (platformName != 'darwin') {
    appWindow.setDecorations(false)
  }
  const isDark = useDark()
  useToggle(isDark)
})
</script>
