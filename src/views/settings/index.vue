import SettingsAppearance from './components/SettingsAppearance.vue';

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
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.general') }}</span>
        </template>
        <settings-general />
      </n-tab-pane>
      <n-tab-pane name="appearance">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-palette" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.appearance') }}</span>
        </template>
        <settings-appearance />
      </n-tab-pane>
      <n-tab-pane name="download">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-download" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.download') }}</span>
        </template>
        <settings-download />
      </n-tab-pane>
      <n-tab-pane name="launch">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-rocket" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.launch') }}</span>
        </template>
        <settings-launch />
      </n-tab-pane>
      <n-tab-pane name="about">
        <template #tab>
          <font-awesome-icon icon="fa-solid fa-circle-info" />
          <span class="amcl-settings-tab-title">{{ $t('app.settings.title.about') }}</span>
        </template>
        <settings-about />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import SettingsAbout from './components/SettingsAbout.vue'
import SettingsAppearance from './components/SettingsAppearance.vue'
import SettingsDownload from './components/SettingsDownload.vue'
import SettingsGeneral from './components/SettingsGeneral.vue'
import SettingsLaunch from './components/SettingsLaunch.vue'
</script>

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

.amcl-settings-tab-title {
  margin-left: 5px;
}
</style>

<style lang="scss">
.amcl-settings-body {
  margin-left: 10px;
  margin-right: 10px;
}

.amcl-settings-card {
  background-color: rgba($color: #fff, $alpha: 0.3) !important;
  border: 0px !important;
}

.amcl-settings-label {
  line-height: 38px;
  font-size: 15px;
}

.amcl-settings-item {
  line-height: 38px;
  width: 120px;
  float: right;
}

.amcl-settings-divider {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
