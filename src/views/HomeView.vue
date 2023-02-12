<template>
  <div class="amcl-main">
    <div class="amcl-main-start">
      <el-button class="amcl-main-start-button" size="large" type="primary">{{
        $t('app.main.startGame')
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getMCVersions, initMCDir } from '../utils'

onMounted(async () => {
  await initMCDir()
  await getMCVersions()
})
</script>

<style lang="scss">
.amcl-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.amcl-main-start {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding-bottom: 45px;
  padding-right: 60px;
}

.amcl-main-start-button {
  height: 50px;
  width: 140px;
  font-size: 20px;
  border-style: none;
  background: rgba($color: #08f, $alpha: 0.8);
}
</style>
