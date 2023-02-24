import { ref } from 'vue'
import { appGlobal } from '.'

async function setupVue() {
  appGlobal.vue = ref({
    theme: null,
    themeOverrides: {}
  })
}

export { setupVue }
