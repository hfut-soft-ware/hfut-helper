<script setup lang='ts'>
import { shallowRef } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { onLoad } from '@dcloudio/uni-app'
import { getRandomQAQ } from 'qaq-font'
import { getClassmatesAll } from '@/server/api/others'
import type { Classmate } from '@/shared/types/response/classmate-all'

const classmatesList = shallowRef<Classmate[]>([])

onLoad((query) => {
  getClassmatesAll(query.couresId!).then(({ data }) => {
    classmatesList.value = data.data
  }).catch((err) => {
    classmatesList.value = []
    Toast.fail({
      message: `加载失败\n${err.data.msg}\n${getRandomQAQ('sadness')[0]}`,
    })
  })
})

</script>

<template>
  <van-toast id="van-toast" />
  <template v-if="classmatesList.length === 0">
    <van-empty description="没有同班同学" />
  </template>
  <template v-else>
    <div class="h-screen w-screen flex flex-col">
      <div class="h-10 box-border flex w-full border-b border-slate-300 px-3">
        <p class="flex-[2_2_0%] leading-10">
          学号
        </p>
        <p class="flex-[2_2_0%] leading-10">
          姓名
        </p>
        <p class="flex-[3_3_0%] leading-10">
          班级
        </p>
      </div>
      <div class="flex-1 w-full pb-4 overflow-y-scroll">
        <div v-for="classmate in classmatesList" :key="classmate.id" class="flex box-border h-10 border-b border-slate-100 px-3 text-slate-500 ">
          <p class="flex-[2_2_0%] truncate leading-10 text-xs">
            {{ classmate.id }}
          </p>
          <p class="flex-[2_2_0%] truncate leading-10 text-xs">
            {{ classmate.name }}
          </p>
          <p class="flex-[3_3_0%] truncate leading-10 text-xs">
            {{ classmate.adminClass }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>
