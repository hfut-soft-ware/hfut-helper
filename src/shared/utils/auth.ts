import { MD5 } from 'crypto-js'
import { SING_KEY } from '@/shared/constant'

import type { ILoginResponse } from '@/shared/types/response/auth'

export const createSign = (path: string, studentId: string, key: string) => {
  path = path.startsWith('/') ? path : `/${path}`
  const ts = Date.now()
  const str = `${path}-${ts}-${studentId}-0-${key}`
  const md5 = MD5(str).toString()
  return `${ts}-${studentId}-0-${md5}`
}

export const handeLoginKey = (loginResponse: ILoginResponse) => {
  uni.setStorageSync(SING_KEY, loginResponse.data.sign)
}
