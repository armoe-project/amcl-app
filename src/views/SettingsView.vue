<template>
  <div class="amcl-settings">
    <n-tabs
      animated
      class="amcl-settings-tabs"
      :tabs-padding="15"
      size="large"
      default-value="general"
    >
      <n-tab-pane name="general">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-window-restore" />
          <span class="amcl-settings-tab-pane-title">通用</span>
        </template>
        <div class="amcl-settings-body">通用设置</div>
      </n-tab-pane>
      <n-tab-pane name="appearance">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-palette" />
          <span class="amcl-settings-tab-pane-title">外观</span>
        </template>
        <div class="amcl-settings-body">外观设置</div>
      </n-tab-pane>
      <n-tab-pane name="download">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-download" />
          <span class="amcl-settings-tab-pane-title">下载</span>
        </template>
        <div class="amcl-settings-body">下载设置</div>
      </n-tab-pane>
      <n-tab-pane name="launch">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-rocket" />
          <span class="amcl-settings-tab-pane-title">启动</span>
        </template>
        <div class="amcl-settings-body">启动设置</div>
      </n-tab-pane>
      <n-tab-pane name="about">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-circle-info" />
          <span class="amcl-settings-tab-pane-title">关于</span>
        </template>
        <div class="amcl-settings-body">关于 Armoe Minecraft Launcher</div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.amcl-settings {
  position: fixed;
  background-color: rgba($color: #fff, $alpha: 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
}

.amcl-settings-tabs {
  height: 100%;
  user-select: none;
}

.amcl-settings-tab-pane-title {
  margin-left: 5px;
}

.amcl-settings-body {
  margin-left: 10px;
}
</style>
