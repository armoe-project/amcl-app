<template>
  <div class="amcl-settings">
    <span>Test</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { request } from '../app/utils'

onMounted(async () => {
  const res = await request.get('')
  console.log(res.data)
})
</script>

<style lang="scss" scoped>
.amcl-settings {
  position: fixed;
  background-color: var(--el-bg-color);
  opacity: 0.5;
  width: 100%;
  height: 100%;
}
</style>
