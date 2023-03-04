<template>
  <n-space v-if="!loading" class="amcl-home">
    <home-aside />
    <home-tips />
  </n-space>
  <n-spin class="amcl-home-loading" v-else:show="loading" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { refresh } from '../../app/core/auth'
import HomeAside from './components/HomeAside.vue'
import HomeTips from './components/HomeTips.vue'

const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await refresh()
  loading.value = false
})
</script>

<style lang="scss" scoped>
.amcl-home {
  position: fixed;
  width: 100%;
  height: 100%;
}
.amcl-home-loading {
  background-color: var(--amcl-bg-color);
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
