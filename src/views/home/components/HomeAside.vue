<template>
  <n-card :bordered="false" class="amcl-home-profile-card">
    <div v-if="!isLogin">
      <n-space vertical>
        <font-awesome-icon style="font-size: 48px" icon="fa-brands fa-microsoft" />
        <span>{{ $t('app.home.profile.not-account-info') }}</span>
        <n-button type="primary" secondary @click="accountLogin()" :loading="isLoginIn">
          {{ $t('app.home.profile.account-login') }}
        </n-button>
      </n-space>
    </div>
    <div v-else>
      <n-space vertical>
        <img class="amcl-home-profile-avatar" :src="profileAvatar" />
        <span>{{ profileName }}</span>
        <div>
          <n-button type="primary" secondary>
            {{ $t('app.home.profile.skin-admin') }}
          </n-button>
          <n-button type="primary" secondary style="margin-left: 10px" @click="accountLogin()">
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
import { writeText } from '@tauri-apps/api/clipboard'
import { open } from '@tauri-apps/api/shell'
import { DialogReactive, NSpace, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  devicecode,
  token,
  xblAuth,
  xstsAuth,
  minecraftAuth,
  ownMinecraft,
  profile
} from '../../../app/core/auth'

const dialog = useDialog()

const i18n = useI18n()

const isLogin = ref(false)
const isLoginIn = ref(false)

const profileName = ref('')
const profileAvatar = ref('/icon.svg')

const game = ref('')
const gameList = ref([])

let interval: number | undefined = undefined

const isGameListEmpty = () => {
  return gameList.value.length == 0
}

const _initProfile = () => {
  const data = localStorage.getItem('minecraft_profile')
  if (data) {
    const profile = JSON.parse(data)
    isLogin.value = true
    profileName.value = profile.name
    profileAvatar.value = `https://minotar.net/avatar/${profile.name}`
  }
}

const _dialogContent = (userCode: string) => {
  return h(
    NSpace,
    { vertical: true },
    {
      default: () => [
        h('span', i18n.t('app.home.profile.microsoft-login.content[0]')),
        h('span', i18n.t('app.home.profile.microsoft-login.content[1]')),
        h('span', i18n.t('app.home.profile.microsoft-login.content[2]', [userCode])),
        h('span', i18n.t('app.home.profile.microsoft-login.content[3]')),
        h('span', i18n.t('app.home.profile.microsoft-login.content[4]'))
      ]
    }
  )
}

const _startLogin = async (deviceCode: string, verificationUri: string, d: DialogReactive) => {
  d.loading = true
  await open(verificationUri)
  await new Promise<void>((resolve) => {
    d.positiveText = i18n.t('app.home.profile.microsoft-login.button.wait-login')
    interval = setInterval(async () => {
      if (await token(deviceCode)) {
        _stopLogin()
        d.positiveText = i18n.t('app.home.profile.microsoft-login.button.get-xbl-token')
        await xblAuth()
        d.positiveText = i18n.t('app.home.profile.microsoft-login.button.get-xsts-token')
        await xstsAuth()
        d.positiveText = i18n.t('app.home.profile.microsoft-login.button.get-minecraft-token')
        await minecraftAuth()
        d.positiveText = i18n.t('app.home.profile.microsoft-login.button.check-own-minecraft')
        if (!(await ownMinecraft())) {
          dialog.warning({
            title: i18n.t('app.common.tips'),
            content: i18n.t('app.home.profile.microsoft-login.do-not-own-minecraft')
          })
          resolve()
        }
        d.positiveText = i18n.t('app.home.profile.microsoft-login.button.get-minecraft-profile')
        await profile()
        _initProfile()
        resolve()
      }
    }, 2000)
  })
  d.loading = false
}

const _stopLogin = () => {
  clearInterval(interval)
  interval = undefined
}

const accountLogin = async () => {
  isLoginIn.value = true
  const data = await devicecode()
  const deviceCode = data.device_code
  const userCode = data.user_code
  const verificationUri = data.verification_uri
  await writeText(userCode)

  const d = dialog.info({
    title: i18n.t('app.home.profile.microsoft-login.title'),
    positiveText: i18n.t('app.home.profile.microsoft-login.button.login'),
    maskClosable: false,
    content: () => _dialogContent(userCode),
    onPositiveClick: async () => await _startLogin(deviceCode, verificationUri, d),
    onClose: async () => _stopLogin()
  })
  isLoginIn.value = false
}

onMounted(async () => {
  _initProfile()
})
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

.amcl-home-profile-avatar {
  width: 48px;
  height: 48px;
  border: 0.1px solid gray;
}

.amcl-home-action-card {
  @extend .amcl-home-base-crad;
  bottom: 13px;
}
</style>
