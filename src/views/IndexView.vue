<template>
  <div class="amcl-index">
    <n-spin class="amcl-index-loading" :show="loading">
      <template #description> {{ loadingTips }} </template>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(true)
const loadingTips = ref('启动中')

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    router.push('home')
  }, 2000)
})
</script>

<style lang="scss" scoped>
.amcl-index {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--amcl-bg-color);
}

.amcl-index-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
