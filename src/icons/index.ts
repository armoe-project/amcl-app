import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faBookOpen,
  faCaretUp,
  faCircleInfo,
  faCircleQuestion,
  faDownload,
  faGear,
  faMinus,
  faPalette,
  faRocket,
  faRotate,
  faWindowRestore,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faQq, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { App } from 'vue'

const solidIcons = [
  faArrowLeft,
  faCaretUp,
  faCircleInfo,
  faDownload,
  faGear,
  faMinus,
  faPalette,
  faRocket,
  faWindowRestore,
  faXmark,
  faBookOpen,
  faRotate,
  faCircleQuestion
]

const brandIcons = [faQq, faDiscord, faGithub]

function setupIcons(app: App<Element>) {
  solidIcons.forEach((icon) => library.add(icon))
  brandIcons.forEach((icon) => library.add(icon))
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export { setupIcons }
