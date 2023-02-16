<template>
  <div class="amcl-main">
    <div class="amcl-main-start">
      <n-button-group>
        <n-button class="amcl-main-start-button-start" size="large" type="primary">
          {{ $t('app.main.startGame') }}
        </n-button>
        <n-popselect v-model:value="game" :options="gameList" trigger="click" scrollable>
          <n-button class="amcl-main-start-button-more" size="small" type="primary">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-caret-up" />
            </template>
          </n-button>
        </n-popselect>
      </n-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const game = ref('1.19.3-Fabric 0.14.11')
const gameList = ref([
  {
    label: '1.19.3-Fabric 0.14.11',
    value: '1.19.3-Fabric 0.14.11'
  }
])
</script>

<style lang="scss" scoped>
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

.amcl-main-start-button-start {
  height: 50px;
  width: 140px;
  font-size: 18px;
}
.amcl-main-start-button-more {
  height: 50px;
  width: 10px;
}
</style>
