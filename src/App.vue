<template>
  <n-config-provider
    v-model:locale="locale.locale"
    v-model:date-locale="locale.dateLocale"
    v-model:theme-overrides="vueGlobal.themeOverrides"
    v-model:theme="vueGlobal.theme"
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
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { setupApp } from './app'
import { vueGlobal } from './global'
import { useConfigStore } from './store'
import { setupTheme } from './theme'

const configStore = storeToRefs(useConfigStore())

const locale = computed(() => {
  switch (configStore.language.value) {
    case 'zh-CN':
      return {
        locale: zhCN,
        dateLocale: dateZhCN
      }
    default:
      return {
        locale: enUS,
        dateLocale: dateEnUS
      }
  }
})

onMounted(async () => {
  setupTheme()
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

* {
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
