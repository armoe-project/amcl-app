<template>
  <div class="amcl-home">
    <n-space>
      <home-aside />
      <home-tips />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import HomeAside from './components/HomeAside.vue'
import HomeTips from './components/HomeTips.vue'
</script>

<style lang="scss" scoped>
.amcl-home {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
