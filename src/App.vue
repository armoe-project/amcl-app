<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <global-toolbar />
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN, GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1677ff',
    primaryColorHover: '#4096ff',
    primaryColorPressed: '#0958d9',
    primaryColorSuppl: '#4096ff',
    infoColor: '#1677ff',
    infoColorHover: '#4096ff',
    infoColorPressed: '#0958d9',
    infoColorSuppl: '#4096ff'
  }
}
</script>

<style lang="scss">
:root {
  background-position: center;
  background-size: cover;
  background-image: url('./assets/images/default-background.jpg');
}

body {
  margin: 0 auto;
}

@font-face {
  font-family: 'MiSans';
  src: url('./assets/fonts/MiSans-Regular.woff2') format('woff2');
}

* {
  font-family: 'MiSans' !important;
  cursor: default !important;
}
</style>
