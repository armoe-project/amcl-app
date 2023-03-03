<template>
  <div class="amcl-settings-body">
    <n-card class="amcl-settings-card">
      <span class="amcl-settings-label">{{ $t('app.settings.launch.java-path.label') }}</span>
      <n-button quaternary class="amcl-settings-item" style="width: 40px" @click="showJavaPath">
        <font-awesome-icon v-show="isShowJavaPath" icon="fa-solid fa-chevron-up" />
        <font-awesome-icon v-show="!isShowJavaPath" icon="fa-solid fa-chevron-down" />
      </n-button>
      <n-collapse-transition :show="isShowJavaPath" style="overflow: auto">
        <n-spin :show="isJavaPathLoading">
          <div class="amcl-settings-divider" />
          <n-radio-group v-model:value="javaPath" @update:value="onJavaPathSelect">
            <n-space vertical>
              <n-radio v-for="java in javaList" :key="java.value" :value="java.value">
                {{ java.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
          <div class="amcl-settings-divider" />
          <n-space>
            <n-button @click="searchJavaPath" type="primary" size="small" secondary>
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </template>
              {{ $t('app.settings.launch.java-path.search') }}
            </n-button>
            <n-button @click="selectJavaPath" type="primary" size="small" secondary>
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-file-import" />
              </template>
              {{ $t('app.settings.launch.java-path.import') }}
            </n-button>
          </n-space>
        </n-spin>
      </n-collapse-transition>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { open } from '@tauri-apps/api/dialog'
import { exists } from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import { useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { appGlobal, config, setConfig } from '../../../app'
import { getJavaInfo, getSystemJavaListInPath } from '../../../app/utils'
import { Logger } from '../../../utils'

const logger = new Logger('Settings')

const message = useMessage()
const i18n = useI18n()

const javaList = ref([
  {
    label: i18n.t('app.settings.launch.java-path.auto'),
    value: 'auto'
  }
])

const javaPath = ref('')
const isShowJavaPath = ref(false)
const isJavaPathLoading = ref(true)

const showJavaPath = () => {
  isShowJavaPath.value = !isShowJavaPath.value
}

const onJavaPathSelect = () => {
  logger.info(`Java Path Select: ${javaPath.value}`)
  setConfig({
    java: {
      use: javaPath.value
    }
  })
}

const searchJavaPath = async () => {
  const list = await getSystemJavaListInPath()
  await _setupJavaList(list)
}

const selectJavaPath = async () => {
  isJavaPathLoading.value = true

  let add = true

  const selected = await open({ directory: true, recursive: true })

  if (selected != null) {
    let ext = ''

    if (appGlobal.os.type == 'Windows_NT') {
      ext = '.exe'
    }

    const file = await resolve(selected as string, 'bin', `java${ext}`)

    if (!(await exists(file))) {
      message.error(i18n.t('app.settings.launch.java-path.invalid'))
      add = false
    }

    javaList.value.forEach((value) => {
      if (value.value == file) {
        message.warning(i18n.t('app.settings.launch.java-path.exist'))
        add = false
      }
    })

    if (add) {
      _addJavaPathToList(file)
    }
  }
  isJavaPathLoading.value = false
}

const _addJavaPathToList = async (path: string) => {
  const info = await getJavaInfo(path)
  if (info) {
    javaList.value.push({
      label: `${info.specification} (${info.version} ${info.bit}) | ${info.vendor} | ${path}`,
      value: path
    })
  }
  await _saveJavaList()
}

const _saveJavaList = async () => {
  let list: string[] = []
  javaList.value.forEach((item) => {
    if (item.value != 'auto') {
      list.push(item.value)
    }
  })
  list = Array.from(new Set(list))
  list = list.filter((item) => {
    if (item != null || item != '') {
      return item
    }
  })
  await setConfig({
    java: {
      list
    }
  })
}

const _setupJavaList = async (newList?: string[]) => {
  isJavaPathLoading.value = true
  let list = config.java.list

  if (newList) {
    for (const path of newList) {
      list.push(path)
    }
  }

  list = Array.from(new Set(list))
  list = list.filter((item) => {
    if (item != null || item != '') {
      return item
    }
  })

  javaList.value.length = 1

  for (const path of list) {
    await _addJavaPathToList(path)
  }

  isJavaPathLoading.value = false
}

onMounted(async () => {
  await _setupJavaList()
  javaPath.value = config.java.use
})
</script>
