import { ref } from 'vue'
import { isStorageEmpty, useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { assetsUrl } from '@/shared/constant'

export const AvatarKey = '__AVATAR__'

export const [
  getAvatarStorage,
  setAvatarStorage,
  removeAvatarStorage,
] = useSyncStorage<string>(AvatarKey)

export function useAvatar() {
  const hasAvatar = ref(!isStorageEmpty(AvatarKey))
  const avatarUrl = ref(hasAvatar.value
    ? getAvatarStorage()
    : assetsUrl.avatar)

  const onAvatarClick = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      success(res) {
        const url = res.tempFilePaths[0]
        hasAvatar.value = true
        avatarUrl.value = url
        setAvatarStorage(url)
      },
    })
  }

  return {
    avatarUrl,
    hasAvatar,
    onAvatarClick,
  }
}
