<script lang='ts' setup>
import Dialog from '@vant/weapp/lib/dialog/dialog'
import { useAuthStore } from '@/store/auth.store'

const store = useAuthStore()

function onLogout() {
  Dialog.confirm({
    title: '退出登录',
    message: '确定要退出登录吗？',
  })
    .then(() => {
      store.logout()
      uni.reLaunch({
        url: '/pages/login/login',
      })
    })
}
</script>

<template>
  <div>
    <button class="logout" @click="onLogout">
      注销
    </button>
  </div>
</template>

<style lang='scss' scoped>
.logout {
  box-shadow: rgb(255 48 48 / 24%) 0px 8px 16px 0px;
  @apply bg-[#FF3030] rounded-lg shadow-lg text-white text-sm shadow-red-500/50 p-3 flex justify-center items-center;
}
</style>
