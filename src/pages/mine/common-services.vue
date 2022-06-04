<script lang='ts' setup>
import { computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { getUserCardBaseInfo } from '@/server/api/user'
import { cardDefaultValue } from '@/shared/types/response/card'
import { servicesList, setCardBaseInfo } from '@/pages/mine/constant'
import { useCourseListStore } from '@/store/courseList.store'

const { state: cardState } = useAsyncState(getUserCardBaseInfo, cardDefaultValue)

const courseStore = useCourseListStore()
const { exam } = storeToRefs(courseStore)

const cardInfo = computed(() => {
  const card = cardState.value.data.data

  const res = {
    title: '一卡通余额',
    content: card?.balance,
  }

  if (card.cardStatus) {
    res.content = `¥${card.balance}`
  } else if (card.freeze) {
    res.title = '一卡通账户已被冻结'
    res.content = '请去学校相关部门进行解冻'
  } else if (card.loss) {
    res.title = '一卡通账户已被挂失'
    res.content = '请去学校相关部门进行解挂'
  }

  setCardBaseInfo(res)

  return res
})

function onServiceClick(url: string) {
  uni.navigateTo({
    url: `/pages/mine/${url}`,
  })
}
</script>

<template>
  <div class="w-full rounded-xl card-shadow flex py-5">
    <div class="base-info-card border-r-[1px] border-r-[#E5E8EB]">
      <p class="font-semibold text-md" @click="onServiceClick('card/card')">
        {{ cardInfo?.title }}
      </p>
      <p class="text-sm text-[#637381]">
        {{ cardInfo?.content }}
      </p>
    </div>
    <div class="base-info-card">
      <p class="font-semibold text-md">
        {{ exam.length }}门
      </p>
      <p class="text-sm text-[#637381]">
        最近考试安排
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-3 mt-5">
    <div
      v-for="service in servicesList"
      :key="service.icon"
      class="card-shadow rounded-xl w-full p-5 items-center box-border flex justify-between"
      @click="onServiceClick(service.url)"
    >
      <img
        class="w-[30px] h-[30px]"
        :src="`../../assets/icons/${service.icon}.png`"
      >
      <p class="font-semibold text-sm">
        {{ service.title }}
      </p>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.base-info-card {
  @apply flex flex-col items-center gap-1 flex-1;
}

</style>
