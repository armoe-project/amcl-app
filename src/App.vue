<template>
  <el-config-provider :locale="locale">
    <global-toolbar />
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import locale from 'element-plus/es/locale/lang/zh-cn'
</script>

<style lang="scss">
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
@use './styles/index.scss';
</style>
