<script setup lang='ts'>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getHelp } from '@/server/api/help'
import type { HelpType } from '@/shared/types/utils'
import type { QA } from '@/shared/types/response/help'

interface TypeMessage {
  message: QA[]
  title: string
}

const helpTitle: Record<HelpType, string> = {
  common: '公共',
  course: '课程表',
  login: '登录',
  score: '成绩',
  grammar: '成绩换算',
}

const helpMessage = ref<TypeMessage[]>([])

onLoad((query) => {
  const helpType = query.type as HelpType & undefined
  if (helpType) {
    getHelp(helpType).then(({ data }) => {
      helpMessage.value.push({
        message: data.data,
        title: helpTitle[helpType],
      })
    })
  } else {
    const helpTypes: HelpType[] = ['common', 'course']
    Promise.all(helpTypes.map(type => getHelp(type))).then((results) => {
      results.forEach((res, i) => {
        helpMessage.value.push({
          message: res.data.data,
          title: helpTitle[helpTypes[i]],
        })
      })
    })
  }
})
</script>

<template>
  <div class="w-screen min-h-screen py-8 flex flex-col gap-8">
    <div v-for="message in helpMessage" :key="message.title" class="w-[90vw] mx-auto card-shadow p-3 box-border rounded-lg">
      <h3 class="font-semibold mb-3">
        {{ message.title }}
      </h3>
      <div v-for="qa in message.message" :key="qa.question">
        <p class="text-slate-700/80 text-sm my-3">
          {{ qa.question }}
        </p>
        <p class="text-slate-500/80 text-xs leading-5">
          {{ qa.answer }}
        </p>
      </div>
    </div>
  </div>
</template>
