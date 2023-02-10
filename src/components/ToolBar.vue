<template>
  <div data-tauri-drag-region class="amcl-toolbar">
    <div v-if="!isMacOS">
      <img
        data-tauri-drag-region
        class="amcl-toolbar-icon"
        src="/images/icon.png"
      />
      <span data-tauri-drag-region class="amcl-toolbar-title">
        Armoe Minecraft Launcher
      </span>
      <el-button-group class="amcl-toobar-button">
        <el-button
          v-if="!isIndexPath() && !isHomePath()"
          text
          icon="Back"
          @click="backToParent"
        ></el-button>
        <el-button
          v-if="isHomePath()"
          text
          icon="Setting"
          @click="pushToSettings"
        />
        <el-button text icon="Minus" @click="minimizeApp" />
        <el-button text icon="Close" @click="closeApp" />
      </el-button-group>
    </div>
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
  return window.location.pathname == '/'
}
const isHomePath = () => {
  return window.location.pathname == '/home'
}

const backToParent = () => {
  router.back()
}

const pushToSettings = () => {
  router.push('/')
}

const minimizeApp = (e: any) => appWindow.minimize()

const closeApp = () => appWindow.close()

onMounted(async () => {
  const platformName = await platform()
  isMacOS.value = platformName == 'darwin'
})
</script>

<style lang="scss">
.amcl-toolbar {
  height: 30px;
  display: flex;
  background-color: rgba($color: #08f, $alpha: 0.3);
  color: #fff;
}

.amcl-toolbar-icon {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 5px;
}

.amcl-toolbar-title {
  margin-top: 7px;
  margin-left: 7px;
  font-size: 10px;
  cursor: default;
}

.amcl-toobar-button {
  margin-left: auto;
  justify-content: flex-end;
  :hover,
  :focus {
    background-color: rgba($color: #6cf, $alpha: 0.2) !important;
  }
  button {
    :hover,
    :focus {
      background: transparent !important;
    }
  }
  i {
    color: #fff;
  }
}
</style>
