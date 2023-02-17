<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    v-model:theme-overrides="globalThemeOverrides"
  >
    <n-el>
      <global-toolbar />
      <router-view />
    </n-el>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAppStore } from './store'

const store = storeToRefs(useAppStore())
const globalThemeOverrides = store.globalThemeOverrides
</script>

<style lang="scss">
:root {
  background-position: center;
  background-size: cover;
  background-image: url('./assets/images/default-background.webp');
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
