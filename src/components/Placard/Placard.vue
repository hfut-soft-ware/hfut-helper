<script setup lang='ts'>
import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'

type Props = {
  title: string
}

const platform = ref(uni.getSystemInfoSync().platform)

const emits = defineEmits<{
  (e: 'close'): void
}>()
const show = ref(true)

const handleClick = () => {
  emits('close')
  show.value = false
}

const setClipboard = (data: string) => {
  uni.setClipboardData({
    data,
    success() {
      uni.showToast({
        title: `已成功复制到剪切板${getRandomQAQ('happy')[0]}`,
        duration: 3000
      })

    },
    fail(result) {
      uni.showToast({
        title: `粘贴到剪切失败了，试试手动输入吧`,
        duration: 3000
      })
    },
    showToast: false,
  })
}

const imgList = [
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F1.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F2.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F3.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F4.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F5.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F6.jpg',
  'https://xiaofeishu-1308266324.cos.ap-shanghai.myqcloud.com/xuanchuan%2F7.jpg',
]

const handleDownloadClick = () => {
  if (platform.value === "ios") {
    setClipboard("https://testflight.apple.com/join/qTFiYMCl")
  } else {
    setClipboard("https://xq261aa61x.feishu.cn/file/IK5fbSt2uoleq2xS5NOc1UKunIh?from=from_copylink")
  }
}

</script>

<template>
  <div v-if="show" class="fixed w-full h-full left-0 top-0 z-[1100] bg-black/70 flex items-center justify-center">
    <div class="box-border relative w-5/6 px-8 rounded-xl bg-white">

      <swiper class="h-[400px]" circular indicatorDots :interval="3000" :duration="500" :autoplay="false">
        <swiper-item v-for="item in imgList" :key="item" class="flex justify-center ">
          <img :src="item" mode="aspectFit" class="h-[400px]">
        </swiper-item>
      </swiper>
      <div class="absolute top-2 left-2" @click="handleClick">
        <div class="p-2 rounded-full bg-black/50 flex justify-center items-center">
          <van-icon name="cross" size="18px" color="#fff" />
        </div>
      </div>
      <div class="mt-3 py-2 space-y-2">
        <h3 class="text-center text-md font-bold">
          Space新作：小肥书 （{{ platform }})
        </h3>
        <p class="text-sm text-black/70">
          小肥书App是space团队推出的新一代应用。\n它不仅继承了space的课表功能（数据一致且同步），\n可以发帖交流，也有校内二手交易模块（无任何费用），\n相比space，使用体验更佳，功能更加丰富。强烈推荐同学们来试试小肥书吧！
        </p>
      </div>
      <div class="mt-2 px-2 py-4 space-x-2 border-t-[1px] border-t-black/10  w-full flex justify-center items-center">
        <van-toast id="van-toast" />

        <div class="flex-1 text-center text-black text-sm font-bold" @click="() => setClipboard('813152217')">复制群号</div>
        <div class="flex-1 text-center text-black text-sm font-bold"
          @click="() => setClipboard('https://xfs.lnyynet.com/')">复制下载链接</div>
      </div>
    </div>



  </div>
</template>
