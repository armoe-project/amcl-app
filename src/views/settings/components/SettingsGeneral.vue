<template>
  <div class="amcl-settings-body">
    <n-card class="amcl-settings-card">
      <div>
        <span class="amcl-settings-label">{{ $t('app.settings.general.language') }}</span>
        <n-select
          class="amcl-settings-item"
          style="width: 150px; text-align: center"
          v-model:value="language"
          :options="[
            {
              label: $t('app.settings.general.language-follow-system'),
              value: 'auto'
            },
            ...languageList
          ]"
          @update:value="onLanguageSelect"
        />
      </div>
      <div class="amcl-settings-divider" />
      <div>
        <span class="amcl-settings-label">{{ $t('app.settings.general.background.label') }}</span>
        <n-select
          class="amcl-settings-item"
          style="width: 150px; text-align: center"
          v-model:value="background.type"
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
        <n-collapse-transition :show="background.type == 'default'">
          <n-alert class="amcl-settings-background-item" type="info">
            {{ $t('app.settings.general.background.default-tips') }}
          </n-alert>
        </n-collapse-transition>
        <n-collapse-transition :show="background.type == 'local'">
          <n-alert class="amcl-settings-background-item" type="info">
            {{ $t('app.settings.general.background.local-tips') }}
          </n-alert>
        </n-collapse-transition>
        <n-collapse-transition :show="background.type == 'network'">
          <n-input
            class="amcl-settings-background-item"
            v-model:value="background.network"
            type="text"
            :placeholder="$t('app.settings.general.background.network-tips')"
            @update:value="onBackgroundNetwork"
          />
        </n-collapse-transition>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore, useConfigStore } from '../../../store'
import { getSystemLanguage, setBackground } from '../../../utils'

const i18n = useI18n()
const appStore = useAppStore()
const configStore = useConfigStore()

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

const language = ref('')
const background = ref({
  type: '',
  network: ''
})

const onLanguageSelect = () => {
  if (language.value == 'auto') {
    i18n.locale.value = getSystemLanguage()
  } else {
    i18n.locale.value = language.value
  }
  configStore.setLanguage(language.value)
}

const onBackgroundSelect = () => {
  switch (background.value.type) {
    case 'default':
      setBackground('default')
      break
    case 'local':
      setBackground('local')
      break
    case 'network':
      setBackground('network', background.value.network)
  }
}

const onBackgroundNetwork = () => {
  setBackground('network', background.value.network)
}

onMounted(() => {
  language.value = configStore.language
  background.value = configStore.background
})
</script>

<style lang="scss" scoped>
.amcl-settings-background-item {
  margin-top: 15px;
}
</style>
