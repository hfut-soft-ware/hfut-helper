<script setup lang='ts'>
import { ref } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'

type Props = {
  title: string
  message?: {
    text: string
    link?: string
  }
}
const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
const show = ref(true)

const handleClick = () => {
  emits('close')
  show.value = false
}

const handleClipboard = () => {
  uni.setClipboardData({
    data: props.message!.link!,
    success() {
      Toast(`已复制到剪切板${getRandomQAQ('happy')[0]}`)
    },
    fail() {
      Toast('粘贴到剪切失败了，试试手动输入吧')
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
]

</script>

<template>
  <div
    v-if="show && message"
    class="fixed w-full h-full left-0 top-0 z-[1100] bg-black/70 flex items-center justify-center"
  >
    <van-toast id="van-toast" />
    <div class="box-border relative w-5/6 px-8 pb-5 rounded-xl bg-white">
      <swiper class="h-[300px]" circular indicatorDots :interval="3000" :duration="500" :autoplay="false">
        <swiper-item v-for="item in imgList" :key="item" class="flex justify-center ">
          <img :src="item" mode="aspectFit" class="h-[300px]">
        </swiper-item>
      </swiper>
      <div class="absolute p-1 top-2 right-2" @click="handleClick">
        <van-icon name="cross" size="20px" color="#c8c9cc" />
      </div>
      <h3 class="text-center text-lg mb-3">
        {{ title }}
      </h3>
      <p class="text-sm text-slate-500/80">
        {{ message.text }}
      </p>
      <div class="text-sm text-blue-400/80" @click="handleClipboard">
        <text>
          https://xq261aa61x.feishu.cn/file/
        </text>
        <text>
          IK5fbSt2uoleq2xS5NOc1UKunIh
        </text>
      </div>
    </div>
  </div>
</template>
