<template>
  <div class="amcl-settings-body">
    <n-card class="amcl-settings-card">
      <div>
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
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { config } from '../../../app'
import { vueGlobal } from '../../../global'
import { generateTheme } from '../../../theme'

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

const themeColor = ref('')

const onThemeColorPicker = () => {
  config.themeColor = themeColor.value
  const theme = generateTheme(config.themeColor)
  vueGlobal.value.themeOverrides.common = theme
}

onMounted(() => {
  themeColor.value = config.themeColor
})
</script>
