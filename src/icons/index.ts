import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faXmark,
  faGear,
  faMinus,
  faArrowLeft,
  faCaretUp,
  faWindowRestore,
  faDownload,
  faPalette,
  faCircleInfo,
  faRocket
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { App } from 'vue'

const icons = [
  faArrowLeft,
  faGear,
  faMinus,
  faXmark,
  faCaretUp,
  faWindowRestore,
  faDownload,
  faPalette,
  faRocket,
  faCircleInfo
]

function setupIcons(app: App<Element>) {
  icons.forEach((icon) => {
    library.add(icon)
  })
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export { setupIcons }
