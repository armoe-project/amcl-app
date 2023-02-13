import { getClient } from '@tauri-apps/api/http'
const client = await getClient()

class Request {
  async get(url: string) {
    return client.get('https://api.armoe.cn/amcl/all')
  }

  async post(url: string, data: any) {}
}

export const request = new Request()
