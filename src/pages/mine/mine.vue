<script lang='ts' setup>
import { ref, watchEffect } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import Toast from '@vant/weapp/lib/toast/toast'
import Header from '@/pages/mine/header.vue'
import CommonServices from '@/pages/mine/common-services.vue'
import AccountSettings from '@/pages/mine/account-settings.vue'
import { getUserInfo } from '@/server/api/user'
import { useGetUserInfo } from '@/pages/mine/use-getUserInfo'
import { useMineStore } from '@/store/mine.store'
import BounceBall from '@/components/BounceBall/BounceBall.vue'
import { useAvatar } from '@/pages/mine/use-avatar'
type TActive = 'commonServices' | 'settings'
const active = ref<TActive>('commonServices')

const { state } = useGetUserInfo()

const mineStore = useMineStore()
const { cardInfo } = storeToRefs(mineStore)

mineStore.getCardInfo()

const { hasAvatar, onAvatarClick, avatarUrl } = useAvatar()

onPullDownRefresh(() => {
  mineStore.getCardInfo()
  const { state: userInfo } = useGetUserInfo()
  watchEffect(() => {
    state.value = userInfo.value
    if (userInfo.value && cardInfo.value) {
      uni.stopPullDownRefresh()
      Toast.clear()
      Toast.success({
        message: '更新个人数据成功',
        duration: 1000,
      })
    }
  })
})

function onActiveChange(event: any) {
  active.value = event.target.name
}

getUserInfo()
</script>

<template>
  <van-toast id="van-toast" />
  <div class="relative w-[95vw] mx-[2.5vw] pb-5">
    <van-dialog id="van-dialog" />
    <Header />

    <div class="mt-10 flex flex-col gap-5">
      <div class="border-box overflow-hidden rounded-xl card-shadow">
        <div class="relative flex justify-center items-center h-[200px] overflow-hidden">
          <img mode="aspectFill" class="w-full bg" src="../../assets/imgs/mine-bg.png">
          <div class="flex absolute flex-col items-center gap-2">
            <div class="w-[75px] h-[75px] border-2 border-white/50 rounded-full">
              <div class="relative" @click="onAvatarClick">
                <BounceBall v-if="!hasAvatar" class="right-3" />
                <img mode="aspectFill" class="w-[75px] rounded-full h-[75px]" :src="avatarUrl">
              </div>
            </div>
            <template v-if="state">
              <p class="text-white text-md font-bold">
                {{ state?.department }}
              </p>
              <p class="text-gray-400 text-xs">
                {{ state?.adminClass }}
              </p>
            </template>
          </div>
        </div>
        <div class="bg-white w-full flex pt-1">
          <van-tabs class="w-full" :active="active" @change="onActiveChange">
            <van-tab title="常用服务" name="commonServices" />
            <van-tab title="账号设置" name="settings" />
          </van-tabs>
        </div>
      </div>

      <div v-show="active === 'commonServices'">
        <CommonServices />
      </div>
      <div v-show="active !== 'commonServices'">
        <AccountSettings />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.bg::before {
  content: '';
  @apply absolute top-0 left-0 right-0 bottom-0 bg-[#2D5A8B] bg-opacity-50;
}

</style>
