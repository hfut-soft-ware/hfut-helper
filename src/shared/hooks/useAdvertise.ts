import { getAdvertise } from '@/server/api/others'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { ADVERTISE } from '@/shared/constant'

/**
 * @description 请求广告地址
 */
export const useAdvertise = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setAdvertiseStorage] = useSyncStorage(ADVERTISE)

  getAdvertise().then(({ data }) => {
    const { advertiseUrl, redirectUri, backgroundColor } = data.data
    if (advertiseUrl && redirectUri && backgroundColor) {
      setAdvertiseStorage({
        advertiseUrl,
        redirectUri,
        backgroundColor,
      })
    }
  })
}
