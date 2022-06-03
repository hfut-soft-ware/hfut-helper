import { isUndefined } from '@/shared/utils'

export function useSyncStorage(key: string) {
  const setStorage = (value: any) => uni.setStorageSync(key, value)
  const getStorage = <T = any>(initVal?: T) => {
    const data = uni.getStorageSync(key) as T
    if (!data && !isUndefined(initVal)) {
      setStorage(initVal)
      return initVal
    }

    return data
  }

  const removeStorage = () => uni.removeStorageSync(key)

  return [getStorage, setStorage, removeStorage] as const
}
