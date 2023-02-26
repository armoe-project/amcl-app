import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faBookOpen,
  faCaretUp,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCircleQuestion,
  faDownload,
  faFileImport,
  faGear,
  faMagnifyingGlass,
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
  faBookOpen,
  faCaretUp,
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faCircleQuestion,
  faDownload,
  faFileImport,
  faGear,
  faMagnifyingGlass,
  faMinus,
  faPalette,
  faRocket,
  faRotate,
  faWindowRestore,
  faXmark
]

const brandIcons = [faQq, faDiscord, faGithub]

function setupIcons(app: App<Element>) {
  solidIcons.forEach((icon) => library.add(icon))
  brandIcons.forEach((icon) => library.add(icon))
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export { setupIcons }
