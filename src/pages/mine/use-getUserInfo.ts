import { useAsyncState } from '@vueuse/core'
import type { IUserInfo } from '@/shared/types/response/userInfo'
import { useAuthStore } from '@/store/auth.store'

export function useGetUserInfo() {
  const authStore = useAuthStore()

  const { state, isLoading, error } = useAsyncState(authStore.getUserData(), {} as IUserInfo)

  return {
    state,
    isLoading,
    error,
  }
}
