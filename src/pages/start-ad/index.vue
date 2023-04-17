<script setup lang='ts'>
import { useLoginRedirect } from '@/shared/hooks/use-loginRedirect'

const { redirect } = useLoginRedirect()

setTimeout(redirect, 3000)

const handleClick = () => {
  uni.navigateToMiniProgram({
    appId: 'wx996c3ddcd3a607c4',
  })
}
</script>

<template>
  <div class="w-screen h-screen relative flex items-center justify-center bg-[#F8DE57]">
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
    <img class="w-full h-full" src="https://hfut-space.top/static/images/imgs/advertise.jpg" mode="aspectFit">
  </div>
</template>
