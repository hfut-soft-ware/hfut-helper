<script lang='ts' setup>
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'

const list = [
  {
    leftIcon: 'guide-o',
    title: '加入交流群',
    cb: () => {
      uni.setClipboardData({
        data: '656140321',
        success() {
          Toast(`群号已复制到剪切板${getRandomQAQ('happy')[0]}`)
        },
        fail() {
          Toast('群号粘贴到剪切失败了，试试手动输入吧')
        },
        showToast: false,
      })
    },
  },
  // {
  //   leftIcon: 'balance-pay',
  //   title: '请我们喝咖啡',
  //   cb: () => {
  //     uni.navigateTo({
  //       url: '/pages/mine/about/donate/donate',
  //     })
  //   },
  // },
  {
    leftIcon: 'description',
    title: '用户协议',
    cb: () => {
      uni.navigateTo({
        url: '/pages/mine/about/disclaimers/disclaimers',
      })
    },
  },
]
</script>

<template>
  <van-toast id="van-toast" />
  <div class="flex flex-col gap-5 w-screen h-screen bg-[#F5F6F8]">
    <div class="flex justify-center">
      <img src="./img.png" class="w-[150px] h-[150px]">
    </div>

    <div class="w-[90vw] mx-auto flex flex-col gap-8">
      <div class="list-card card-shadow flex flex-col gap-3">
        <h3 class="font-semibold">
          关于小程序
        </h3>
        <div class="text-slate-500/80 text-xs">
          HfutSpace是一个便利工大学子查询教务信息的小程序平台，灵感来自于
          <p class="inline font-semibold text-black">
            合工大课程表无敌版小程序
          </p>
          <p class="mt-3">
            我们不代表任何组织或架构的利益，只是源自于对编程的热爱，以及锻炼自身能力的一种表现
          </p>
          <p class="mt-3">
            希望这个小程序能够方便大家获取学校事务讯息的基本需求~
          </p>
          <p class="mt-3">
            附上小程序QQ交流群群号: 656140321
          </p>
        </div>
      </div>

      <div class="list-card card-shadow text-lg flex-col gap-3">
        <div
          v-for="item in list"
          :key="item.title"
          class="flex justify-between"
          @click="item.cb"
        >
          <div class="flex gap-2">
            <van-icon :name="item.leftIcon" />
            <div>{{ item.title }}</div>
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.list-card {
  @apply p-3 box-border rounded-lg flex flex-col gap-5;
}
</style>
