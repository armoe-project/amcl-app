import { fetch, Body } from '@tauri-apps/api/http'
import Cookies from 'js-cookie'
import { Logger } from '../../../utils'

const logger = new Logger('Microsoft-Auth')

const root = 'https://login.microsoftonline.com'
const api = {
  devicecode: `${root}/consumers/oauth2/v2.0/devicecode`,
  token: `${root}/consumers/oauth2/v2.0/token`,
  xblAuth: 'https://user.auth.xboxlive.com/user/authenticate',
  xstsAuth: 'https://xsts.auth.xboxlive.com/xsts/authorize'
}

const clientId = '513073fc-641c-453a-9ddd-d1351f85c7d0'

async function devicecode(): Promise<any | undefined> {
  const from = new FormData()
  from.append('client_id', clientId)
  from.append('scope', 'XboxLive.signin offline_access')
  const result = await fetch(api.devicecode, {
    method: 'POST',
    body: Body.form(from)
  })
  if (result.ok) return result.data
  return undefined
}

async function token(deviceCode: string) {
  const from = new FormData()
  from.append('client_id', clientId)
  from.append('device_code', deviceCode)
  from.append('grant_type', 'urn:ietf:params:oauth:grant-type:device_code')
  const result = await fetch(api.token, {
    method: 'POST',
    body: Body.form(from)
  })
  logger.debug('Token Result: ', result)
  if (result.ok) {
    const data: any = result.data
    Cookies.set('microsoft_access_token', data.access_token, { expires: 365 })
    Cookies.set('microsoft_refresh_token', data.refresh_token, { expires: 365 })
    return true
  }
  return false
}

async function refresh() {
  const refreshToken = Cookies.get('microsoft_refresh_token')
  if (!refreshToken) {
    logger.warn('refresh token is not found!')
    return false
  }
  const from = new FormData()
  from.append('client_id', clientId)
  from.append('refresh_token', refreshToken)
  from.append('grant_type', 'refresh_token')
  const result = await fetch(api.token, {
    method: 'POST',
    body: Body.form(from)
  })
  logger.debug('Refresh Result: ', result)
  if (result.ok) {
    const data: any = result.data
    Cookies.set('microsoft_access_token', data.access_token, { expires: 365 })
    Cookies.set('microsoft_refresh_token', data.refresh_token, { expires: 365 })
    return true
  }
  return false
}

async function xblAuth() {
  const accessToken = Cookies.get('microsoft_access_token')
  if (!accessToken) {
    logger.warn('access token is not found!')
    return false
  }
  const result = await fetch(api.xblAuth, {
    method: 'POST',
    body: Body.json({
      Properties: {
        AuthMethod: 'RPS',
        SiteName: 'user.auth.xboxlive.com',
        RpsTicket: `d=${accessToken}`
      },
      RelyingParty: 'http://auth.xboxlive.com',
      TokenType: 'JWT'
    })
  })
  logger.debug('XBLAuth Result: ', result)
  if (result.ok) {
    const data: any = result.data
    Cookies.set('microsoft_xbl_token', data.Token, { expires: 365 })
    Cookies.set('microsoft_uhs', data.DisplayClaims.xui[0].uhs, { expires: 365 })
    return true
  }
  return false
}

async function xstsAuth() {
  const xblToken = Cookies.get('microsoft_xbl_token')
  if (!xblToken) {
    logger.warn('xbl token is not found!')
    return false
  }
  const result = await fetch(api.xstsAuth, {
    method: 'POST',
    body: Body.json({
      Properties: {
        SandboxId: 'RETAIL',
        UserTokens: [xblToken]
      },
      RelyingParty: 'rp://api.minecraftservices.com/',
      TokenType: 'JWT'
    })
  })
  logger.debug('XSTSAuth Result: ', result)
  if (result.ok) {
    const data: any = result.data
    Cookies.set('microsoft_xsts_token', data.Token, { expires: 365 })
    return true
  }
  return undefined
}

export { devicecode, token, refresh, xblAuth, xstsAuth }
