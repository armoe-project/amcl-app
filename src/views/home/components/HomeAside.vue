<template>
  <n-card :bordered="false" class="amcl-home-profile-card">
    <div v-if="!isLogin">
      <n-space vertical>
        <font-awesome-icon style="font-size: 48px" icon="fa-brands fa-microsoft" />
        <span>{{ $t('app.home.profile.not-account-info') }}</span>
        <n-button type="primary" secondary @click="addAccount">
          {{ $t('app.home.profile.account-login') }}
        </n-button>
        <n-modal
          v-model:show="showAddAccountModel"
          preset="card"
          :mask-closable="false"
          style="width: 450px"
          :title="$t('app.home.profile.microsoft-login.title')"
        >
          <n-alert :title="$t('app.common.tips')" type="info">
            TODO: Microsoft Account Login
          </n-alert>
        </n-modal>
      </n-space>
    </div>
    <div v-else>
      <n-space vertical>
        <img style="width: 48px; height;: 48px" src="/icon.svg" />
        <span>zhen_xin</span>
        <div>
          <n-button type="primary" secondary @click="addAccount">
            {{ $t('app.home.profile.skin-admin') }}
          </n-button>
          <n-button type="primary" secondary @click="addAccount" style="margin-left: 10px">
            {{ $t('app.home.profile.switch-account') }}
          </n-button>
        </div>
      </n-space>
    </div>
  </n-card>
  <n-card :bordered="false" class="amcl-home-action-card">
    <div v-if="isGameListEmpty()">
      <n-space vertical>
        <font-awesome-icon style="font-size: 48px" icon="fa-brands fa-instalod" />
        <span> {{ $t('app.home.launch.not-find-game') }} </span>
        <n-button type="primary" size="large" style="width: 200px; height: 50px" secondary>
          {{ $t('app.home.launch.download-game') }}
        </n-button>
        <div>
          <n-button type="primary" secondary disabled>
            {{ $t('app.home.launch.version-select') }}
          </n-button>
          <n-button type="primary" secondary disabled style="margin-left: 31px">
            {{ $t('app.home.launch.version-settings') }}
          </n-button>
        </div>
      </n-space>
    </div>
    <div v-else>
      <n-space vertical>
        <img style="width: 48px; height;: 48px" src="/icon.svg" />
        <span>
          {{ game }}
        </span>
        <n-button type="primary" size="large" style="width: 200px; height: 50px" secondary>
          {{ $t('app.home.launch.launch-game') }}
        </n-button>
        <div>
          <n-button type="primary" secondary>
            {{ $t('app.home.launch.version-select') }}
          </n-button>
          <n-button type="primary" secondary style="margin-left: 31px">
            {{ $t('app.home.launch.version-settings') }}
          </n-button>
        </div>
      </n-space>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const isLogin = ref(false)

const showAddAccountModel = ref(false)
const game = ref('')
const gameList = ref([])

const isGameListEmpty = () => {
  return gameList.value.length == 0
}

const addAccount = () => {
  showAddAccountModel.value = true
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.amcl-home-base-crad {
  background-color: var(--amcl-home-card-bg-color);
  left: 13px;
  position: fixed;
  text-align: center;
  width: 320px;
}
.amcl-home-profile-card {
  @extend .amcl-home-base-crad;
  top: 43px;
}

.amcl-home-action-card {
  @extend .amcl-home-base-crad;
  bottom: 13px;
}
</style>
