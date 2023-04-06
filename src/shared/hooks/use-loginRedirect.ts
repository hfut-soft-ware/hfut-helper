import { AuthStatus, checkIsLogin } from '@/store/auth.store'

export const useLoginRedirect = () => {
  const isLogin = checkIsLogin() === AuthStatus.LOGIN_IN

  const redirect = () => {
    if (isLogin) {
      uni.switchTab({
        url: '/pages/day-schedule/index',
      })
    } else {
      uni.redirectTo({
        url: '/pages/login/login',
      })
    }
  }
  return {
    redirect,
  }
}
