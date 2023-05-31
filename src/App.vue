<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onLaunch } from '@dcloudio/uni-app'
import { getRandomQAQ } from 'qaq-font'
import { watchEffect } from 'vue'
import { AuthStatus, useAuthStore } from '@/store/auth.store'

const authStore = useAuthStore()

const { auth } = storeToRefs(authStore)

watchEffect(() => {
  if (auth.value.status === AuthStatus.LOGIN_IN) {
    uni.switchTab({
      url: '/pages/day-schedule/index',
    })
  } else {
    uni.switchTab({
      url: '/pages/login/login',
    })
  }
})

console.log(auth.value)

onLaunch(() => {
  const updateManager = uni.getUpdateManager()

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: `HfutSpace更新啦~${getRandomQAQ('happy')[0]}`,
      content: '是否重启加载最新版本的HfutSpace?',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })

  updateManager.onUpdateFailed(() => {
    uni.showModal({
      content: `HfutSpace更新失败了${getRandomQAQ('sadness')[0]}`,
    })
  })
})

</script>

<style lang="scss">
@import "./components/wxcomponents/vant/common/index.wxss";
</style>
