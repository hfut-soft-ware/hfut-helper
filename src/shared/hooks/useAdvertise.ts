import { getAdvertise } from '@/server/api/others'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { ADVERTISE } from '@/shared/constant'

/**
 * @description 请求广告地址
 */
export const useAdvertise = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setAdvertiseStorage, removeAdvertiseStorage] = useSyncStorage(ADVERTISE)

  getAdvertise().then(({ data }) => {
    const { advertiseUrl, redirectUri, backgroundColor, campusCode } = data.data
    if (advertiseUrl && redirectUri && backgroundColor && campusCode) {
      setAdvertiseStorage({
        advertiseUrl,
        redirectUri,
        backgroundColor,
        campusCode,
      })
    } else {
      removeAdvertiseStorage()
    }
  })
}
