<script setup lang='ts'>
import { AuthStatus, checkIsLogin } from '@/store/auth.store'
import { useLoginRedirect } from '@/shared/hooks/use-loginRedirect'

const isLogin = checkIsLogin() === AuthStatus.LOGIN_IN

const { redirect } = useLoginRedirect()

// 如果未登陆就不注册setTimeout，防止再次跳转到登录页
if (isLogin) {
  setTimeout(redirect, 3000)
}

const handleClick = () => {
  uni.navigateToMiniProgram({
    appId: 'wx42f9784a84e731b4',
  })
}

</script>

<template>
  <div class="w-screen h-screen relative flex items-center justify-center bg-[#8dd1fe]">
    <view class="absolute top-20 right-4 py-1 px-3 bg-black/50 rounded-full">
      <van-loading size="16px" text-size="12px" type="spinner">
        加载中
      </van-loading>
    </view>
    <div class="absolute bottom-20 right-4 py-2 px-4 bg-black/50 rounded-full" @click="handleClick">
      <p class="text-white opacity-70">
        点我跳转 >>
      </p>
    </div>
    <!-- <img class="w-full h-full" src="https://hfut-space.top/static/images/imgs/advertise.jpg" mode="aspectFit"> -->
    <img class="w-full h-full" src="../../assets/imgs/advertise.jpg" mode="aspectFit">
  </div>
</template>
