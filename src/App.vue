<template>
  <n-config-provider
    v-model:locale="locale.locale"
    v-model:date-locale="locale.dateLocale"
    v-model:theme-overrides="vueGlobal.themeOverrides"
    v-model:theme="vueGlobal.theme"
  >
    <n-dialog-provider>
      <n-message-provider placement="bottom">
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
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { computed } from 'vue'
import { appGlobal, config } from './app'
import { getSystemLanguage } from './utils'

const vueGlobal = appGlobal.vue

const locale = computed(() => {
  let language = config.language
  if (language == 'auto') language = getSystemLanguage()
  switch (config.language) {
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
</script>

<style lang="scss">
:root {
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0px !important;
  }
  user-select: none;
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
