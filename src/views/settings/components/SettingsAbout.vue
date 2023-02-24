<template>
  <div class="amcl-settings-body">
    <n-card class="amcl-settings-card">
      <n-thing>
        <template #avatar>
          <img class="amcl-settings-about-logo" src="/icon.svg" />
        </template>
        <template #header> Armoe Minecraft Launcher v{{ appGlobal.app.appVersion }} </template>
        <template #description>
          {{ $t('app.settings.about.description') }}
          <div class="amcl-settings-divider" />
          <n-space>
            <n-button :loading="checkUpdateing" @click="checkUpdate">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-rotate" />
              </template>
              {{ $t('app.settings.about.check-update') }}
            </n-button>
          </n-space>
        </template>
        <template #action>
          <n-space>
            <n-button quaternary size="small" @click="open(links.github)">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-github" />
              </template>
              {{ $t('app.settings.about.github') }}
            </n-button>
            <n-button quaternary size="small" @click="open(links.docs)">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-book-open" />
              </template>
              {{ $t('app.settings.about.usage-docs') }}
            </n-button>
            <n-button quaternary size="small" @click="open(links.faq)">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-circle-question" />
              </template>
              {{ $t('app.settings.about.faq') }}
            </n-button>
            <n-button quaternary size="small" @click="open(links.qq)">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-qq" />
              </template>
              {{ $t('app.settings.about.qq-group') }}
            </n-button>
            <n-button quaternary size="small" @click="open(links.discord)">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-discord" />
              </template>
              {{ $t('app.settings.about.discord') }}
            </n-button>
          </n-space>
          <div class="amcl-settings-divider" />
          <div>鸣谢</div>
          <div class="amcl-settings-divider" />
          <n-space>
            <n-button
              quaternary
              size="small"
              v-for="item in openSourceItems"
              @click="open(item.link)"
            >
              {{ item.name }}
            </n-button>
          </n-space>
        </template>
      </n-thing>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { open } from '@tauri-apps/api/shell'
import { ref } from 'vue'
import { appGlobal } from '../../../app'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const message = useMessage()
const i18n = useI18n()

const links = {
  github: 'https://github.com/armoe-project/amcl-app',
  discord: 'https://discord.gg/twQgJNufYn',
  docs: 'https://amcl.armoe.cn',
  qq: 'https://jq.qq.com/?_wv=1027&k=KyO8SO7U',
  faq: 'https://amcl.armoe.cn/faq.html'
}

const openSourceItems = [
  {
    name: 'Tauri',
    link: 'https://github.com/tauri-apps/tauri'
  },
  {
    name: 'Vue.js',
    link: 'https://github.com/vuejs'
  },
  {
    name: 'Naive UI',
    link: 'https://github.com/tusen-ai/naive-ui'
  },
  {
    name: 'Font Awesome',
    link: 'https://github.com/FortAwesome/Font-Awesome'
  },
  {
    name: 'TypeScript',
    link: 'https://github.com/microsoft/TypeScript'
  }
]

const checkUpdateing = ref(false)

const checkUpdate = () => {
  checkUpdateing.value = true
  setTimeout(() => {
    checkUpdateing.value = false
    message.info('TODO: Check Update')
    message.info(i18n.t('app.settings.about.latest-version'))
  }, 1000)
}
</script>

<style lang="scss">
.amcl-settings-about-logo {
  height: 100px;
  width: 100px;
}
</style>
