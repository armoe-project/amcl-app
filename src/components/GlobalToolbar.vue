<template>
  <div data-tauri-drag-region class="amcl-toolbar">
    <span data-tauri-drag-region v-if="!isMacOS" class="amcl-toolbar-title">
      Armoe Minecraft Launcher
    </span>
    <el-button-group class="amcl-toolbar-button">
      <el-button
        v-if="!isIndexPath() && !isHomePath()"
        text
        icon="Back"
        @click="backToParent"
      ></el-button>
      <el-button v-if="isHomePath()" text icon="Setting" @click="pushToSettings" />
      <el-button v-if="!isMacOS" text icon="Minus" @click="minimizeApp" />
      <el-button v-if="!isMacOS" text icon="Close" @click="closeApp" />
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import { appWindow } from '@tauri-apps/api/window'
import { platform } from '@tauri-apps/api/os'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const isMacOS = ref(false)

const isIndexPath = () => {
  return router.currentRoute.value.name == 'Index'
}
const isHomePath = () => {
  return router.currentRoute.value.name == 'Home'
}

const backToParent = () => {
  router.back()
}

const pushToSettings = async () => {
  await router.push('settings')
}

const minimizeApp = (e: any) => appWindow.minimize()

const closeApp = () => appWindow.close()

onMounted(async () => {
  const platformName = await platform()
  isMacOS.value = platformName == 'darwin'
})
</script>

<style lang="scss" scoped>
.amcl-toolbar {
  color: white;
  height: 30px;
  display: flex;
  position: relative;
  background-color: rgba($color: #08f, $alpha: 0.5);
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
  margin-left: auto;
  justify-content: flex-end;
  :hover,
  :focus {
    background-color: rgba($color: #6cf, $alpha: 0.2) !important;
  }

  button {
    color: white;
    :hover,
    :focus {
      background: transparent !important;
    }
  }
}
</style>
