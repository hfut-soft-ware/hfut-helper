<script setup lang='ts'>
import { shallowRef } from 'vue'
import Toast from '@vant/weapp/lib/toast/toast'
import { getRandomQAQ } from 'qaq-font'
import { useClassmatesStore } from '@/store/classmates.store'
import { getClassmatesAll } from '@/server/api/others'
import type { Classmate } from '@/shared/types/response/classmate-all'

const classmatesStore = useClassmatesStore()

const classmatesList = shallowRef<Classmate[]>([])

getClassmatesAll(classmatesStore.couresId).then(({ data }) => {
  classmatesList.value = data.data
}).catch((err) => {
  classmatesList.value = []
  Toast.fail({
    message: `加载失败\n${err.data.msg}\n${getRandomQAQ('sadness')[0]}`,
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
      <div class="h-10 flex w-full border-b border-slate-300 px-3">
        <p class="flex-1 leading-10">
          学号
        </p>
        <p class="flex-1 leading-10">
          姓名
        </p>
        <p class="flex-1 leading-10">
          班级
        </p>
      </div>
      <div class="flex-1 w-full pb-4 overflow-y-scroll">
        <div v-for="classmate in classmatesList" :key="classmate.id" class="flex h-10 border-b border-slate-100 px-3 text-slate-500 ">
          <p class="flex-1 leading-10">
            {{ classmate.id }}
          </p>
          <p class="flex-1 leading-10">
            {{ classmate.name }}
          </p>
          <p class="flex-1 leading-10">
            {{ classmate.adminClass }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>
