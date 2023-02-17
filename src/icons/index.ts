import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faCaretUp,
  faCircleInfo,
  faDownload,
  faGear,
  faMinus,
  faPalette,
  faRocket,
  faWindowRestore,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { App } from 'vue'

const icons = [
  faArrowLeft,
  faCaretUp,
  faCircleInfo,
  faDownload,
  faGear,
  faMinus,
  faPalette,
  faRocket,
  faWindowRestore,
  faXmark
]

function setupIcons(app: App<Element>) {
  icons.forEach((icon) => {
    library.add(icon)
  })
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export { setupIcons }
