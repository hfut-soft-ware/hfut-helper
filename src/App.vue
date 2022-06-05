<script setup lang="ts">
// import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { AuthStatus, useAuthStore } from '@/store/auth.store'

const authStore = useAuthStore()

const { auth } = authStore

if (auth.status === AuthStatus.LOGIN_IN) {
  uni.switchTab({
    url: 'pages/day-schedule/index',
  })
} else {
  uni.switchTab({
    url: '/pages/login/login',
  })
}

// onLaunch(() => {
//
// })
// onShow(() => {
//
// })
// onHide(() => {
//
// })

</script>

<style lang="scss">
@import "./components/wxcomponents/vant/common/index.wxss";
</style>
