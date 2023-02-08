<template>
  <el-config-provider :locale="locale">
    <tool-bar />
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { onMounted } from 'vue'
import locale from 'element-plus/es/locale/lang/zh-cn'
import ToolBar from './components/ToolBar.vue'

onMounted(() => {
  const isDark = useDark()
  useToggle(isDark)
})
</script>
