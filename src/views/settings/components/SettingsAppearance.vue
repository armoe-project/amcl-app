<template>
  <div class="amcl-settings-body">
    <n-card class="amcl-settings-card">
      <span class="amcl-settings-label">{{ $t('app.settings.appearance.theme.label') }}</span>
      <n-select
        class="amcl-settings-item"
        style="width: 150px; text-align: center"
        v-model:value="theme"
        :options="[
          {
            label: $t('app.common.follow-system'),
            value: 'auto'
          },
          {
            label: $t('app.settings.appearance.theme.dark'),
            value: 'dark'
          },
          {
            label: $t('app.settings.appearance.theme.light'),
            value: 'light'
          }
        ]"
        @update:value="onThemeModeSelect"
      />
      <div class="amcl-settings-divider" />
      <span class="amcl-settings-label">{{ $t('app.settings.appearance.themeColor') }}</span>
      <n-color-picker
        class="amcl-settings-item"
        v-model:value="themeColor"
        :modes="['hex']"
        :show-alpha="false"
        :show-preview="true"
        :swatches="presetThemeColors"
        @update:show="onThemeColorPicker"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { appGlobal, config, setConfig } from '../../../app'
import { generateTheme, setTheme } from '../../../theme'

const presetThemeColors = [
  '#0088FF',
  '#fB7299',
  '#FFBB33',
  '#0F9D58',
  '#2196F3',
  '#AA66CC',
  '#DB4437',
  '#FF8833'
]

const theme = ref<'auto' | 'dark' | 'light'>('auto')
const themeColor = ref()

const onThemeModeSelect = () => {
  setTheme(theme.value)
  setConfig({
    theme: theme.value
  })
}

const onThemeColorPicker = () => {
  setConfig({
    themeColor: themeColor.value
  })
  const theme = generateTheme(config.themeColor)
  appGlobal.vue.value.themeOverrides.common = theme
}

onMounted(() => {
  themeColor.value = config.themeColor
})
</script>
