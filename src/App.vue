<template>
  <el-config-provider :locale="locale">
    <global-toolbar />
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import locale from 'element-plus/es/locale/lang/zh-cn'

const isDark = useDark()
useToggle(isDark)
</script>

<style lang="scss">
@use 'element-plus/theme-chalk/dark/css-vars.css';

:root {
  background-position: center;
  background-size: cover;
  background-image: url('/images/default-background.jpg');
}

body {
  margin: 0 auto;
}

@font-face {
  font-family: 'MiSans Regular';
  src: url('/fonts/MiSans-Regular.ttf');
}

* {
  font-family: 'MiSans Regular' !important;
  cursor: default !important;
}
</style>
