<script lang='ts' setup>
import { computed } from 'vue'
import { getRandomQAQ } from 'qaq-font'
import StatusBar from '@/components/status-bar/status-bar.vue'

const greetingWords = computed(() => {
  const currentDate = new Date()

  // 凌晨 早上 中午 晚上
  const dayPeriod = currentDate.getHours()

  const qaq = getRandomQAQ('happy')[0]

  return dayPeriod < 6
    ? ['凌晨了,', `同学记得要休息噢，${qaq}`]
    : dayPeriod > 6
      ? ['早上好呀,', `今天又是充满希望的一天${qaq}`]
      : dayPeriod < 18
        ? ['下午好', `快来喝一杯下午茶吧${qaq}`]
        : ['晚上好', '不要熬夜到太晚哦٩(ˊ〇ˋ*)و']
})
</script>

<template>
  <StatusBar />
  <div class="flex flex-col gap-2">
    <p class="text-xs text-2xl">
      {{ greetingWords[0] }},
    </p>
    <p class="text-sm">
      {{ greetingWords[1] }}
    </p>
  </div>
</template>

<style lang='scss' scoped>

</style>
