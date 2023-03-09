<template>
  <div data-tauri-drag-region class="amcl-toolbar">
    <span data-tauri-drag-region v-if="!isMacOS" class="amcl-toolbar-title">
      Armoe Minecraft Launcher v{{ appVersion }}
    </span>
    <n-button-group class="amcl-toolbar-button">
      <n-button v-if="!isHomePath()" quaternary @click="backToParent">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </n-button>
      <n-button v-if="isHomePath()" quaternary @click="pushToSettings">
        <font-awesome-icon icon="fa-solid fa-gear" />
      </n-button>
      <n-button v-if="!isMacOS" quaternary @click="minimizeApp">
        <font-awesome-icon icon="fa-solid fa-minus" />
      </n-button>
      <n-button v-if="!isMacOS" quaternary @click="closeApp">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </n-button>
    </n-button-group>
  </div>
</template>

<script lang="ts" setup>
import { appWindow } from '@tauri-apps/api/window'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { appGlobal } from '../app'

const router = useRouter()
const isMacOS = ref(false)
const appVersion = ref()

const isHomePath = () => {
  return router.currentRoute.value.name == 'Home'
}

const backToParent = () => {
  router.back()
}

const pushToSettings = async () => {
  await router.push('settings')
}

const minimizeApp = () => appWindow.minimize()

const closeApp = () => appWindow.close()

onMounted(() => {
  isMacOS.value = appGlobal.os.type == 'Darwin'
  appVersion.value = appGlobal.app.appVersion
})
</script>

<style lang="scss" scoped>
.amcl-toolbar {
  color: white;
  height: 30px;
  display: flex;
  position: relative;
  background-color: var(--primary-color);
}

.amcl-toolbar-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  margin: 0 auto;
}

.amcl-toolbar-button {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  button {
    height: 30px;
    color: white !important;
  }
}
</style>
