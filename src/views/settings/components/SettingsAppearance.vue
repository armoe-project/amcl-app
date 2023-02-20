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
          @update:value="onThemeColorPicker"
        />
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAppStore, useConfigStore } from '../../../store'

const appStore = useAppStore()
const configStore = useConfigStore()

const presetThemeColors = [
  '#1677FF',
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
  configStore.setThemeColor(themeColor.value)
  appStore.setGlobalThemeOverrides({
    common: {
      primaryColor: themeColor.value
    }
  })
}

onMounted(() => {
  themeColor.value = configStore.themeColor
})
</script>

<style lang="scss">
.amcl-settings-body {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
