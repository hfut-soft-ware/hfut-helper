<!-- eslint-disable no-unused-vars -->
<script setup lang='ts'>
import { ref } from 'vue'
import { AuthStatus, checkIsLogin } from '@/store/auth.store'
import { useLoginRedirect } from '@/shared/hooks/use-loginRedirect'
import { useSyncStorage } from '@/shared/hooks/use-syncStorage'
import { ADVERTISE } from '@/shared/constant'

const [getStorage] = useSyncStorage(ADVERTISE)

enum CampusCode {
  TunXiLun = '01', // 屯溪路
  FeiCuiHu= '02', // 翡翠湖
  XuanCheng = '03', // 宣城
}

/**
 * 宣城 appid wx42f9784a84e731b4
 */
const advertiseData = ref<{
  advertiseUrl: string
  redirectUri: string
  backgroundColor: string
  campusCode: CampusCode
}>(getStorage())

const isLogin = checkIsLogin() === AuthStatus.LOGIN_IN

const { redirect } = useLoginRedirect()

// 如果未登陆就不注册setTimeout，防止再次跳转到登录页
if (isLogin) {
  setTimeout(redirect, 3000)
}

const handleClick = () => {
  uni.navigateToMiniProgram({
    appId: advertiseData.value.redirectUri,
  })
}

</script>

<template>
  <div class="w-screen h-screen relative flex items-center justify-center" :style="{backgroundColor: advertiseData.backgroundColor}">
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
    <template v-if="advertiseData.campusCode === CampusCode.XuanCheng">
      <img class="w-full h-full" src="./advertise-xc.jpg" mode="aspectFit">
    </template>
    <template v-else-if="advertiseData.campusCode === CampusCode.FeiCuiHu">
      <img class="w-full h-full" src="./advertise-fch.png" mode="aspectFit">
    </template>
    <!-- <img class="w-full h-full" :src="advertiseData.advertiseUrl" mode="aspectFit"> -->
  </div>
</template>
