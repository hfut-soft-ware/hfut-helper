<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { getRandomQAQ } from 'qaq-font'
import { useLoginRedirect } from '@/shared/hooks/use-loginRedirect'
// import { useAdvertise } from '@/shared/hooks/useAdvertise'
// import { isStorageEmpty } from '@/shared/hooks/use-syncStorage'
// import { ADVERTISE } from '@/shared/constant'

// useAdvertise()

const { redirect } = useLoginRedirect()

// if (isStorageEmpty(ADVERTISE)) {
//   redirect()
// } else {
//   uni.redirectTo({
//     url: '/sub1/pages/start-ad/index',
//   })
// }

redirect()

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
