<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    v-model:theme-overrides="globalThemeOverrides"
  >
    <n-el>
      <global-toolbar />
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </n-el>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { setupApp } from './app'
import { useAppStore } from './store'

const appStore = storeToRefs(useAppStore())
const globalThemeOverrides = appStore.globalThemeOverrides

onMounted(async () => {
  await setupApp()
})
</script>

<style lang="scss">
:root {
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

body {
  margin: 0 auto;
}

@font-face {
  font-family: 'MiSans';
  src: url('/fonts/MiSans-Regular.woff2') format('woff2');
}

* {
  font-family: 'MiSans' !important;
  cursor: default !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
