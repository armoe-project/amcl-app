import { fetch, Body } from '@tauri-apps/api/http'
import Cookies from 'js-cookie'
import { Logger } from '../../../utils'

const logger = new Logger('Minecraft-Auth')

const root = 'https://api.minecraftservices.com'
const api = {
  minecraftAuth: `${root}/authentication/login_with_xbox`,
  mcstore: `${root}/entitlements/mcstore`,
  profile: `${root}/minecraft/profile`
}

async function minecraftAuth() {
  const uhs = Cookies.get('microsoft_uhs')
  const xstsToken = Cookies.get('microsoft_xsts_token')
  if (!uhs || !xstsToken) {
    logger.warn('uhs or xsts token is not found!')
    return false
  }
  const result = await fetch(api.minecraftAuth, {
    method: 'POST',
    body: Body.json({
      identityToken: `XBL3.0 x=${uhs};${xstsToken}`
    })
  })
  logger.debug('Auth Result: ', result)
  if (result.ok) {
    const data: any = result.data
    Cookies.set('minecraft_access_token', data.access_token)
    return true
  }
  return false
}

async function ownMinecraft() {
  const accessToken = Cookies.get('minecraft_access_token')
  if (!accessToken) {
    logger.warn('access token is not found!')
    return false
  }
  const result = await fetch(api.mcstore, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  logger.debug('Store Result: ', result)
  if (result.ok) {
    const data: any = result.data
    const items: any[] = data.items
    if (items.length == 0) return false
    for (const item of items) {
      if (item.name == 'game_minecraft') return true
    }
    return true
  }
  return false
}

async function profile() {
  const accessToken = Cookies.get('minecraft_access_token')
  if (!accessToken) {
    logger.warn('access token is not found!')
    return false
  }
  const result = await fetch(api.profile, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  logger.debug('Profile Result: ', result)
  if (result.ok) {
    localStorage.setItem('minecraft_profile', JSON.stringify(result.data))
    return true
  }
  return false
}

export { minecraftAuth, ownMinecraft, profile }
