<script lang='ts' setup>
import CreateCustomPage from '@/components/CreateCustomPage/CreateCustomPage.vue'

const props = withDefaults(defineProps<{
  currentWeek: number
  currentDay: number
  startIndex: number
  closePopup: () => void
}>(), {
  startIndex: 1,
  currentDay: 1,
  currentWeek: 1,
  closePopup: () => {},
})

</script>

<template>
  <CreateCustomPage
    :current-week="props.currentWeek"
    :current-day="props.currentDay"
    :is-custom="true"
    :start-index="props.startIndex"
    :title="'自定义课程'"
    :type="'add'"
    @updated="closePopup"
  />
</template>
