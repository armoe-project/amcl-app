<template>
  <div
    class="amcl-welcome-main"
    v-loading="loading"
    :element-loading-text="loadingTips"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const loading = ref(true)
const loadingTips = ref('启动中...')

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    router.push('home')
  }, 2000)
})
</script>

<style lang="scss" scoped>
.amcl-welcome-main {
  height: 450px;
}
</style>
