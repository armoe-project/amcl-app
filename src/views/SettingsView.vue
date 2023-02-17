<template>
  <div class="amcl-settings">
    <n-tabs
      animated
      class="amcl-settings-tabs"
      :tabs-padding="15"
      size="large"
      default-value="general"
    >
      <n-tab-pane name="general">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-window-restore" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.general') }}</span>
        </template>
        <div class="amcl-settings-body">
          <n-card>
            <div class="amcl-settings-item">
              <span>{{ $t('app.settings.general.language') }}</span>
              <n-select
                class="amcl-settings-item-select"
                style="width: 150px; text-align: center"
                v-model:value="config.language"
                :options="[
                  {
                    label: i18n.t('app.settings.general.language-follow-system'),
                    value: 'auto'
                  },
                  ...languageList
                ]"
                @update:value="onLanguageSelect"
              />
            </div>
            <n-divider />
            <div class="amcl-settings-item">
              <span>{{ $t('app.settings.general.background.label') }}</span>
              <span>{{ backgroundDesc }}</span>
              <n-select
                class="amcl-settings-item-select"
                style="width: 150px; text-align: center"
                v-model:value="config.background.type"
                :options="[
                  {
                    label: $t('app.settings.general.background.default-label'),
                    value: 'default'
                  },
                  {
                    label: $t('app.settings.general.background.local-label'),
                    value: 'local'
                  },
                  {
                    label: $t('app.settings.general.background.network-label'),
                    value: 'network'
                  }
                ]"
                @update:value="onBackgroundSelect"
              />
              <n-collapse-transition :show="config.background.type == 'default'">
                <n-alert class="amcl-settings-background-item" type="info">
                  {{ $t('app.settings.general.background.default-tips') }}
                </n-alert>
              </n-collapse-transition>
              <n-collapse-transition :show="config.background.type == 'local'">
                <n-alert class="amcl-settings-background-item" type="info">
                  {{ $t('app.settings.general.background.local-tips') }}
                </n-alert>
              </n-collapse-transition>
              <n-collapse-transition :show="config.background.type == 'network'">
                <n-input
                  class="amcl-settings-background-item"
                  v-model:value="config.background.network"
                  type="text"
                  :placeholder="$t('app.settings.general.background.network-tips')"
                  @update:value="onBackgroundNetwork"
                />
              </n-collapse-transition>
            </div>
          </n-card>
        </div>
      </n-tab-pane>
      <n-tab-pane name="appearance">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-palette" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.appearance') }}</span>
        </template>
        <div class="amcl-settings-body">
          <n-card>
            <div class="amcl-settings-item">
              <span>{{ $t('app.settings.appearance.themeColor') }}</span>
              <n-color-picker
                class="amcl-settings-item-select"
                v-model:value="config.themeColor"
                :modes="['hex']"
                :show-alpha="false"
                :show-preview="true"
                :swatches="presetColors"
                @update:value="onColorPicker"
                style="width: 100px"
              />
            </div>
          </n-card>
        </div>
      </n-tab-pane>
      <n-tab-pane name="download">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-download" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.download') }}</span>
        </template>
        <div class="amcl-settings-body">下载设置</div>
      </n-tab-pane>
      <n-tab-pane name="launch">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-rocket" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.launch') }}</span>
        </template>
        <div class="amcl-settings-body">启动设置</div>
      </n-tab-pane>
      <n-tab-pane name="about">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-circle-info" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.about') }}</span>
        </template>
        <div class="amcl-settings-body">关于 Armoe Minecraft Launcher</div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAppStore, useConfigStore } from '../store'
import { useI18n } from 'vue-i18n'
import { getSystemLanguage, setBackground } from '../utils'

const i18n = useI18n()
const appStore = useAppStore()
const configStore = useConfigStore()

const tabIndex = ref('general')

const presetColors = [
  '#1677FF',
  '#fB7299',
  '#FFBB33',
  '#0F9D58',
  '#2196F3',
  '#AA66CC',
  '#DB4437',
  '#FF8833'
]

const backgroundDesc = ref('')

const languageList = [
  {
    label: '中文 (简体)',
    value: 'zh-CN'
  },
  {
    label: 'English (US)',
    value: 'en-US'
  }
]

const config = ref({
  language: '',
  themeColor: '',
  background: {
    type: '',
    network: ''
  }
})

const onLanguageSelect = () => {
  const language = config.value.language
  if (language == 'auto') {
    i18n.locale.value = getSystemLanguage()
  } else {
    i18n.locale.value = language
  }
  configStore.setLanguage(language)
}

const onBackgroundSelect = () => {
  const background = config.value.background
  switch (background.type) {
    case 'default':
      setBackground('default')
      break
    case 'local':
      setBackground('local')
      break
    case 'network':
      setBackground('network', config.value.background.network)
  }
}

const onBackgroundNetwork = () => {
  setBackground('network', config.value.background.network)
}

const onColorPicker = () => {
  const themeColor = config.value.themeColor
  configStore.setThemeColor(themeColor)
  appStore.setGlobalThemeOverrides({
    common: {
      primaryColor: themeColor
    }
  })
}

onMounted(() => {
  config.value = {
    language: configStore.language,
    themeColor: configStore.themeColor,
    background: configStore.background
  }
  console.log(config.value)
})
</script>

<style lang="scss" scoped>
.amcl-settings {
  position: fixed;
  background-color: rgba($color: #fff, $alpha: 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
}

.amcl-settings-tabs {
  height: 100%;
  user-select: none;
}

.amcl-settings-tab-title {
  margin-left: 5px;
}

.amcl-settings-body {
  margin-left: 10px;
  margin-right: 10px;
}

.amcl-settings-item {
  span {
    line-height: 38px;
    font-size: 16px;
  }
}

.amcl-settings-item-select {
  line-height: 38px;
  float: right;
}

.amcl-settings-background-item {
  margin-top: 15px;
}
</style>
