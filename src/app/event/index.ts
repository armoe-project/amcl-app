import { listen, TauriEvent } from '@tauri-apps/api/event'

function setupEvent() {
  listen(TauriEvent.WINDOW_CLOSE_REQUESTED, (event) => {
    console.log(event)
  })
}

export { setupEvent }
